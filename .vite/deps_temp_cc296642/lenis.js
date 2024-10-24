import "./chunk-G3PMV62Z.js";

// node_modules/lenis/dist/lenis.mjs
function clamp(t2, i2, e) {
  return Math.max(t2, Math.min(i2, e));
}
var Animate = class {
  constructor() {
    this.isRunning = false, this.value = 0, this.from = 0, this.to = 0, this.currentTime = 0;
  }
  advance(t2) {
    var i2;
    if (!this.isRunning) return;
    let e = false;
    if (this.duration && this.easing) {
      this.currentTime += t2;
      const i3 = clamp(0, this.currentTime / this.duration, 1);
      e = i3 >= 1;
      const s = e ? 1 : this.easing(i3);
      this.value = this.from + (this.to - this.from) * s;
    } else this.lerp ? (this.value = function damp(t3, i3, e2, s) {
      return function lerp(t4, i4, e3) {
        return (1 - e3) * t4 + e3 * i4;
      }(t3, i3, 1 - Math.exp(-e2 * s));
    }(this.value, this.to, 60 * this.lerp, t2), Math.round(this.value) === this.to && (this.value = this.to, e = true)) : (this.value = this.to, e = true);
    e && this.stop(), null === (i2 = this.onUpdate) || void 0 === i2 || i2.call(this, this.value, e);
  }
  stop() {
    this.isRunning = false;
  }
  fromTo(t2, i2, { lerp: e, duration: s, easing: o, onStart: n, onUpdate: l }) {
    this.from = this.value = t2, this.to = i2, this.lerp = e, this.duration = s, this.easing = o, this.currentTime = 0, this.isRunning = true, null == n || n(), this.onUpdate = l;
  }
};
var Dimensions = class {
  constructor(t2, i2, { autoResize: e = true, debounce: s = 250 } = {}) {
    this.wrapper = t2, this.content = i2, this.width = 0, this.height = 0, this.scrollHeight = 0, this.scrollWidth = 0, this.resize = () => {
      this.onWrapperResize(), this.onContentResize();
    }, this.onWrapperResize = () => {
      this.wrapper instanceof Window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight);
    }, this.onContentResize = () => {
      this.wrapper instanceof Window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth);
    }, e && (this.debouncedResize = /* @__PURE__ */ function debounce(t3, i3) {
      let e2;
      return function(...s2) {
        let o = this;
        clearTimeout(e2), e2 = setTimeout(() => {
          e2 = void 0, t3.apply(o, s2);
        }, i3);
      };
    }(this.resize, s), this.wrapper instanceof Window ? window.addEventListener("resize", this.debouncedResize, false) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize();
  }
  destroy() {
    var t2, i2;
    null === (t2 = this.wrapperResizeObserver) || void 0 === t2 || t2.disconnect(), null === (i2 = this.contentResizeObserver) || void 0 === i2 || i2.disconnect(), this.wrapper === window && this.debouncedResize && window.removeEventListener("resize", this.debouncedResize, false);
  }
  get limit() {
    return { x: this.scrollWidth - this.width, y: this.scrollHeight - this.height };
  }
};
var Emitter = class {
  constructor() {
    this.events = {};
  }
  emit(t2, ...i2) {
    var e;
    let s = this.events[t2] || [];
    for (let t3 = 0, o = s.length; t3 < o; t3++) null === (e = s[t3]) || void 0 === e || e.call(s, ...i2);
  }
  on(t2, i2) {
    var e;
    return (null === (e = this.events[t2]) || void 0 === e ? void 0 : e.push(i2)) || (this.events[t2] = [i2]), () => {
      var e2;
      this.events[t2] = null === (e2 = this.events[t2]) || void 0 === e2 ? void 0 : e2.filter((t3) => i2 !== t3);
    };
  }
  off(t2, i2) {
    var e;
    this.events[t2] = null === (e = this.events[t2]) || void 0 === e ? void 0 : e.filter((t3) => i2 !== t3);
  }
  destroy() {
    this.events = {};
  }
};
var t = 100 / 6;
var i = { passive: false };
var VirtualScroll = class {
  constructor(e, s = { wheelMultiplier: 1, touchMultiplier: 1 }) {
    this.element = e, this.options = s, this.touchStart = { x: 0, y: 0 }, this.lastDelta = { x: 0, y: 0 }, this.window = { width: 0, height: 0 }, this.emitter = new Emitter(), this.onTouchStart = (t2) => {
      const { clientX: i2, clientY: e2 } = t2.targetTouches ? t2.targetTouches[0] : t2;
      this.touchStart.x = i2, this.touchStart.y = e2, this.lastDelta = { x: 0, y: 0 }, this.emitter.emit("scroll", { deltaX: 0, deltaY: 0, event: t2 });
    }, this.onTouchMove = (t2) => {
      const { clientX: i2, clientY: e2 } = t2.targetTouches ? t2.targetTouches[0] : t2, s2 = -(i2 - this.touchStart.x) * this.options.touchMultiplier, o = -(e2 - this.touchStart.y) * this.options.touchMultiplier;
      this.touchStart.x = i2, this.touchStart.y = e2, this.lastDelta = { x: s2, y: o }, this.emitter.emit("scroll", { deltaX: s2, deltaY: o, event: t2 });
    }, this.onTouchEnd = (t2) => {
      this.emitter.emit("scroll", { deltaX: this.lastDelta.x, deltaY: this.lastDelta.y, event: t2 });
    }, this.onWheel = (i2) => {
      let { deltaX: e2, deltaY: s2, deltaMode: o } = i2;
      e2 *= 1 === o ? t : 2 === o ? this.window.width : 1, s2 *= 1 === o ? t : 2 === o ? this.window.height : 1, e2 *= this.options.wheelMultiplier, s2 *= this.options.wheelMultiplier, this.emitter.emit("scroll", { deltaX: e2, deltaY: s2, event: i2 });
    }, this.onWindowResize = () => {
      this.window = { width: window.innerWidth, height: window.innerHeight };
    }, window.addEventListener("resize", this.onWindowResize, false), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, i), this.element.addEventListener("touchstart", this.onTouchStart, i), this.element.addEventListener("touchmove", this.onTouchMove, i), this.element.addEventListener("touchend", this.onTouchEnd, i);
  }
  on(t2, i2) {
    return this.emitter.on(t2, i2);
  }
  destroy() {
    this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize, false), this.element.removeEventListener("wheel", this.onWheel, i), this.element.removeEventListener("touchstart", this.onTouchStart, i), this.element.removeEventListener("touchmove", this.onTouchMove, i), this.element.removeEventListener("touchend", this.onTouchEnd, i);
  }
};
var Lenis = class {
  constructor({ wrapper: t2 = window, content: i2 = document.documentElement, eventsTarget: e = t2, smoothWheel: s = true, syncTouch: o = false, syncTouchLerp: n = 0.075, touchInertiaMultiplier: l = 35, duration: r, easing: h = (t3) => Math.min(1, 1.001 - Math.pow(2, -10 * t3)), lerp: a = 0.1, infinite: c = false, orientation: u = "vertical", gestureOrientation: d = "vertical", touchMultiplier: p = 1, wheelMultiplier: m = 1, autoResize: v = true, prevent: g, virtualScroll: S, __experimental__naiveDimensions: w = false } = {}) {
    this._isScrolling = false, this._isStopped = false, this._isLocked = false, this._preventNextNativeScrollEvent = false, this._resetVelocityTimeout = null, this.time = 0, this.userData = {}, this.lastVelocity = 0, this.velocity = 0, this.direction = 0, this.animate = new Animate(), this.emitter = new Emitter(), this.onPointerDown = (t3) => {
      1 === t3.button && this.reset();
    }, this.onVirtualScroll = (t3) => {
      if ("function" == typeof this.options.virtualScroll && false === this.options.virtualScroll(t3)) return;
      const { deltaX: i3, deltaY: e2, event: s2 } = t3;
      if (this.emitter.emit("virtual-scroll", { deltaX: i3, deltaY: e2, event: s2 }), s2.ctrlKey) return;
      const o2 = s2.type.includes("touch"), n2 = s2.type.includes("wheel");
      this.isTouching = "touchstart" === s2.type || "touchmove" === s2.type;
      if (this.options.syncTouch && o2 && "touchstart" === s2.type && !this.isStopped && !this.isLocked) return void this.reset();
      const l2 = 0 === i3 && 0 === e2, r2 = "vertical" === this.options.gestureOrientation && 0 === e2 || "horizontal" === this.options.gestureOrientation && 0 === i3;
      if (l2 || r2) return;
      let h2 = s2.composedPath();
      h2 = h2.slice(0, h2.indexOf(this.rootElement));
      const a2 = this.options.prevent;
      if (h2.find((t4) => {
        var i4, e3, s3, l3, r3;
        return t4 instanceof HTMLElement && ("function" == typeof a2 && (null == a2 ? void 0 : a2(t4)) || (null === (i4 = t4.hasAttribute) || void 0 === i4 ? void 0 : i4.call(t4, "data-lenis-prevent")) || o2 && (null === (e3 = t4.hasAttribute) || void 0 === e3 ? void 0 : e3.call(t4, "data-lenis-prevent-touch")) || n2 && (null === (s3 = t4.hasAttribute) || void 0 === s3 ? void 0 : s3.call(t4, "data-lenis-prevent-wheel")) || (null === (l3 = t4.classList) || void 0 === l3 ? void 0 : l3.contains("lenis")) && !(null === (r3 = t4.classList) || void 0 === r3 ? void 0 : r3.contains("lenis-stopped")));
      })) return;
      if (this.isStopped || this.isLocked) return void s2.preventDefault();
      if (!(this.options.syncTouch && o2 || this.options.smoothWheel && n2)) return this.isScrolling = "native", void this.animate.stop();
      s2.preventDefault();
      let c2 = e2;
      "both" === this.options.gestureOrientation ? c2 = Math.abs(e2) > Math.abs(i3) ? e2 : i3 : "horizontal" === this.options.gestureOrientation && (c2 = i3);
      const u2 = o2 && this.options.syncTouch, d2 = o2 && "touchend" === s2.type && Math.abs(c2) > 5;
      d2 && (c2 = this.velocity * this.options.touchInertiaMultiplier), this.scrollTo(this.targetScroll + c2, Object.assign({ programmatic: false }, u2 ? { lerp: d2 ? this.options.syncTouchLerp : 1 } : { lerp: this.options.lerp, duration: this.options.duration, easing: this.options.easing }));
    }, this.onNativeScroll = () => {
      if (null !== this._resetVelocityTimeout && (clearTimeout(this._resetVelocityTimeout), this._resetVelocityTimeout = null), this._preventNextNativeScrollEvent) this._preventNextNativeScrollEvent = false;
      else if (false === this.isScrolling || "native" === this.isScrolling) {
        const t3 = this.animatedScroll;
        this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity, this.velocity = this.animatedScroll - t3, this.direction = Math.sign(this.animatedScroll - t3), this.isScrolling = "native", this.emit(), 0 !== this.velocity && (this._resetVelocityTimeout = setTimeout(() => {
          this.lastVelocity = this.velocity, this.velocity = 0, this.isScrolling = false, this.emit();
        }, 400));
      }
    }, window.lenisVersion = "1.1.13", t2 && t2 !== document.documentElement && t2 !== document.body || (t2 = window), this.options = { wrapper: t2, content: i2, eventsTarget: e, smoothWheel: s, syncTouch: o, syncTouchLerp: n, touchInertiaMultiplier: l, duration: r, easing: h, lerp: a, infinite: c, gestureOrientation: d, orientation: u, touchMultiplier: p, wheelMultiplier: m, autoResize: v, prevent: g, virtualScroll: S, __experimental__naiveDimensions: w }, this.dimensions = new Dimensions(t2, i2, { autoResize: v }), this.updateClassName(), this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll, false), this.options.wrapper.addEventListener("pointerdown", this.onPointerDown, false), this.virtualScroll = new VirtualScroll(e, { touchMultiplier: p, wheelMultiplier: m }), this.virtualScroll.on("scroll", this.onVirtualScroll);
  }
  destroy() {
    this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll, false), this.options.wrapper.removeEventListener("pointerdown", this.onPointerDown, false), this.virtualScroll.destroy(), this.dimensions.destroy(), this.cleanUpClassName();
  }
  on(t2, i2) {
    return this.emitter.on(t2, i2);
  }
  off(t2, i2) {
    return this.emitter.off(t2, i2);
  }
  setScroll(t2) {
    this.isHorizontal ? this.rootElement.scrollLeft = t2 : this.rootElement.scrollTop = t2;
  }
  resize() {
    this.dimensions.resize(), this.animatedScroll = this.targetScroll = this.actualScroll, this.emit();
  }
  emit() {
    this.emitter.emit("scroll", this);
  }
  reset() {
    this.isLocked = false, this.isScrolling = false, this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity = 0, this.animate.stop();
  }
  start() {
    this.isStopped && (this.isStopped = false, this.reset());
  }
  stop() {
    this.isStopped || (this.isStopped = true, this.animate.stop(), this.reset());
  }
  raf(t2) {
    const i2 = t2 - (this.time || t2);
    this.time = t2, this.animate.advance(1e-3 * i2);
  }
  scrollTo(t2, { offset: i2 = 0, immediate: e = false, lock: s = false, duration: o = this.options.duration, easing: n = this.options.easing, lerp: l = this.options.lerp, onStart: r, onComplete: h, force: a = false, programmatic: c = true, userData: u } = {}) {
    if (!this.isStopped && !this.isLocked || a) {
      if ("string" == typeof t2 && ["top", "left", "start"].includes(t2)) t2 = 0;
      else if ("string" == typeof t2 && ["bottom", "right", "end"].includes(t2)) t2 = this.limit;
      else {
        let e2;
        if ("string" == typeof t2 ? e2 = document.querySelector(t2) : t2 instanceof HTMLElement && (null == t2 ? void 0 : t2.nodeType) && (e2 = t2), e2) {
          if (this.options.wrapper !== window) {
            const t3 = this.rootElement.getBoundingClientRect();
            i2 -= this.isHorizontal ? t3.left : t3.top;
          }
          const s2 = e2.getBoundingClientRect();
          t2 = (this.isHorizontal ? s2.left : s2.top) + this.animatedScroll;
        }
      }
      if ("number" == typeof t2) {
        if (t2 += i2, t2 = Math.round(t2), this.options.infinite ? c && (this.targetScroll = this.animatedScroll = this.scroll) : t2 = clamp(0, t2, this.limit), t2 === this.targetScroll) return null == r || r(this), void (null == h || h(this));
        if (this.userData = null != u ? u : {}, e) return this.animatedScroll = this.targetScroll = t2, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), null == h || h(this), void (this.userData = {});
        c || (this.targetScroll = t2), this.animate.fromTo(this.animatedScroll, t2, { duration: o, easing: n, lerp: l, onStart: () => {
          s && (this.isLocked = true), this.isScrolling = "smooth", null == r || r(this);
        }, onUpdate: (t3, i3) => {
          this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = t3 - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = t3, this.setScroll(this.scroll), c && (this.targetScroll = t3), i3 || this.emit(), i3 && (this.reset(), this.emit(), null == h || h(this), this.userData = {}, this.preventNextNativeScrollEvent());
        } });
      }
    }
  }
  preventNextNativeScrollEvent() {
    this._preventNextNativeScrollEvent = true, requestAnimationFrame(() => {
      this._preventNextNativeScrollEvent = false;
    });
  }
  get rootElement() {
    return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
  }
  get limit() {
    return this.options.__experimental__naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"];
  }
  get isHorizontal() {
    return "horizontal" === this.options.orientation;
  }
  get actualScroll() {
    return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop;
  }
  get scroll() {
    return this.options.infinite ? function modulo(t2, i2) {
      return (t2 % i2 + i2) % i2;
    }(this.animatedScroll, this.limit) : this.animatedScroll;
  }
  get progress() {
    return 0 === this.limit ? 1 : this.scroll / this.limit;
  }
  get isScrolling() {
    return this._isScrolling;
  }
  set isScrolling(t2) {
    this._isScrolling !== t2 && (this._isScrolling = t2, this.updateClassName());
  }
  get isStopped() {
    return this._isStopped;
  }
  set isStopped(t2) {
    this._isStopped !== t2 && (this._isStopped = t2, this.updateClassName());
  }
  get isLocked() {
    return this._isLocked;
  }
  set isLocked(t2) {
    this._isLocked !== t2 && (this._isLocked = t2, this.updateClassName());
  }
  get isSmooth() {
    return "smooth" === this.isScrolling;
  }
  get className() {
    let t2 = "lenis";
    return this.isStopped && (t2 += " lenis-stopped"), this.isLocked && (t2 += " lenis-locked"), this.isScrolling && (t2 += " lenis-scrolling"), "smooth" === this.isScrolling && (t2 += " lenis-smooth"), t2;
  }
  updateClassName() {
    this.cleanUpClassName(), this.rootElement.className = `${this.rootElement.className} ${this.className}`.trim();
  }
  cleanUpClassName() {
    this.rootElement.className = this.rootElement.className.replace(/lenis(-\w+)?/g, "").trim();
  }
};
export {
  Lenis as default
};
//# sourceMappingURL=lenis.js.map
