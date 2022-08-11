var Particles = function(t, e) {
    "use strict";
    var n, i = {};

    function o(t, e) {
        return t.x < e.x ? -1 : t.x > e.x ? 1 : t.y < e.y ? -1 : t.y > e.y ? 1 : 0
    }
    return (n = function() {
        return function() {
            var t = this;
            t.defaults = {
                responsive: null,
                selector: null,
                maxParticles: 100,
                sizeVariations: 3,
                showParticles: !0,
                speed: .5,
                color: "#000000",
                minDistance: 120,
                connectParticles: !1
            }, t.element = null, t.context = null, t.ratio = null, t.breakpoints = [], t.activeBreakpoint = null, t.breakpointSettings = [], t.originalSettings = null, t.storage = [], t.usingPolyfill = !1
        }
    }()).prototype.init = function(t) {
        var e = this;
        return e.options = e._extend(e.defaults, t), e.originalSettings = JSON.parse(JSON.stringify(e.options)), e._animate = e._animate.bind(e), e._initializeCanvas(), e._initializeEvents(), e._registerBreakpoints(), e._checkResponsive(), e._initializeStorage(), e._animate(), e
    }, n.prototype.destroy = function() {
        var e = this;
        e.storage = [], e.element.remove(), t.removeEventListener("resize", e.listener, !1), t.clearTimeout(e._animation), cancelAnimationFrame(e._animation)
    }, n.prototype._initializeCanvas = function() {
        var n, i, o = this;
        if (!o.options.selector) return console.warn("particles.js: No selector specified! Check https://github.com/marcbruederlin/particles.js#options"), !1;
        o.element = e.querySelector(o.options.selector), o.context = o.element.getContext("2d"), n = t.devicePixelRatio || 1, i = o.context.webkitBackingStorePixelRatio || o.context.mozBackingStorePixelRatio || o.context.msBackingStorePixelRatio || o.context.oBackingStorePixelRatio || o.context.backingStorePixelRatio || 1, o.ratio = n / i, o.element.width = o.element.offsetParent.clientWidth * o.ratio, "BODY" === o.element.offsetParent.nodeName ? o.element.height = t.innerHeight * o.ratio : o.element.height = o.element.offsetParent.clientHeight * o.ratio, o.element.style.width = "100%", o.element.style.height = "100%", o.context.scale(o.ratio, o.ratio)
    }, n.prototype._initializeEvents = function() {
        var e = this;
        e.listener = function() {
            e._resize()
        }.bind(this), t.addEventListener("resize", e.listener, !1)
    }, n.prototype._initializeStorage = function() {
        var t = this;
        t.storage = [];
        for (var e = t.options.maxParticles; e--;) t.storage.push(new i(t.context, t.options))
    }, n.prototype._registerBreakpoints = function() {
        var t, e, n, i = this,
            o = i.options.responsive || null;
        if ("object" == typeof o && null !== o && o.length) {
            for (t in o)
                if (n = i.breakpoints.length - 1, e = o[t].breakpoint, o.hasOwnProperty(t)) {
                    for (; n >= 0;) i.breakpoints[n] && i.breakpoints[n] === e && i.breakpoints.splice(n, 1), n--;
                    i.breakpoints.push(e), i.breakpointSettings[e] = o[t].options
                } i.breakpoints.sort(function(t, e) {
                return e - t
            })
        }
    }, n.prototype._checkResponsive = function() {
        var e, n = this,
            i = !1,
            o = t.innerWidth;
        if (n.options.responsive && n.options.responsive.length && null !== n.options.responsive) {
            for (e in i = null, n.breakpoints) n.breakpoints.hasOwnProperty(e) && o <= n.breakpoints[e] && (i = n.breakpoints[e]);
            null !== i ? (n.activeBreakpoint = i, n.options = n._extend(n.options, n.breakpointSettings[i])) : null !== n.activeBreakpoint && (n.activeBreakpoint = null, i = null, n.options = n._extend(n.options, n.originalSettings))
        }
    }, n.prototype._refresh = function() {
        this._initializeStorage(), this._draw()
    }, n.prototype._resize = function() {
        var e = this;
        e.element.width = e.element.offsetParent.clientWidth * e.ratio, "BODY" === e.element.offsetParent.nodeName ? e.element.height = t.innerHeight * e.ratio : e.element.height = e.element.offsetParent.clientHeight * e.ratio, e.context.scale(e.ratio, e.ratio), clearTimeout(e.windowDelay), e.windowDelay = t.setTimeout(function() {
            e._checkResponsive(), e._refresh()
        }, 50)
    }, n.prototype._animate = function() {
        var e = this;
        e._draw(), e._animation = t.requestAnimFrame(e._animate)
    }, n.prototype.resumeAnimation = function() {
        this._animation || this._animate()
    }, n.prototype.pauseAnimation = function() {
        var e = this;
        if (e._animation) {
            if (e.usingPolyfill) t.clearTimeout(e._animation);
            else(t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame)(e._animation);
            e._animation = null
        }
    }, n.prototype._draw = function() {
        var e = this,
            n = e.element,
            i = n.offsetParent.clientWidth,
            r = n.offsetParent.clientHeight,
            a = e.options.showParticles,
            s = e.storage;
        "BODY" === n.offsetParent.nodeName && (r = t.innerHeight), e.context.clearRect(0, 0, n.width, n.height), e.context.beginPath();
        for (var l = s.length; l--;) {
            var c = s[l];
            a && c._draw(), c._updateCoordinates(i, r)
        }
        e.options.connectParticles && (s.sort(o), e._updateEdges())
    }, n.prototype._updateEdges = function() {
        for (var t = this, e = t.options.minDistance, n = Math.sqrt, i = Math.abs, o = t.storage, r = o.length, a = 0; a < r; a++)
            for (var s = o[a], l = a + 1; l < r; l++) {
                var c, p = o[l],
                    u = s.x - p.x,
                    f = s.y - p.y;
                if (c = n(u * u + f * f), i(u) > e) break;
                c <= e && t._drawEdge(s, p, 1.2 - c / e)
            }
    }, n.prototype._drawEdge = function(t, e, n) {
        var i = this,
            o = i.context.createLinearGradient(t.x, t.y, e.x, e.y),
            r = this._hex2rgb(t.color),
            a = this._hex2rgb(e.color);
        o.addColorStop(0, "rgba(" + r.r + "," + r.g + "," + r.b + "," + n + ")"), o.addColorStop(1, "rgba(" + a.r + "," + a.g + "," + a.b + "," + n + ")"), i.context.beginPath(), i.context.strokeStyle = o, i.context.moveTo(t.x, t.y), i.context.lineTo(e.x, e.y), i.context.stroke(), i.context.fill(), i.context.closePath()
    }, n.prototype._extend = function(t, e) {
        return Object.keys(e).forEach(function(n) {
            t[n] = e[n]
        }), t
    }, n.prototype._hex2rgb = function(t) {
        var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
        return e ? {
            r: parseInt(e[1], 16),
            g: parseInt(e[2], 16),
            b: parseInt(e[3], 16)
        } : null
    }, (i = function(n, i) {
        var o = this,
            r = Math.random,
            a = i.speed,
            s = i.color instanceof Array ? i.color[Math.floor(Math.random() * i.color.length)] : i.color;
        o.context = n, o.options = i;
        var l = e.querySelector(i.selector);
        o.x = r() * l.offsetParent.clientWidth, "BODY" === l.offsetParent.nodeName ? o.y = r() * t.innerHeight : o.y = r() * l.offsetParent.clientHeight, o.vx = r() * a * 2 - a, o.vy = r() * a * 2 - a, o.radius = r() * r() * i.sizeVariations, o.color = s, o._draw()
    }).prototype._draw = function() {
        var t = this;
        t.context.save(), t.context.translate(t.x, t.y), t.context.moveTo(0, 0), t.context.beginPath(), t.context.arc(0, 0, t.radius, 0, 2 * Math.PI, !1), t.context.fillStyle = t.color, t.context.fill(), t.context.restore()
    }, i.prototype._updateCoordinates = function(t, e) {
        var n = this,
            i = n.x + this.vx,
            o = n.y + this.vy,
            r = n.radius;
        i + r > t ? i = r : i - r < 0 && (i = t - r), o + r > e ? o = r : o - r < 0 && (o = e - r), n.x = i, n.y = o
    }, t.requestAnimFrame = function() {
        var e = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame;
        return e || (this._usingPolyfill = !0, function(e) {
            return t.setTimeout(e, 1e3 / 60)
        })
    }(), new n
}(window, document);
! function() {
    "use strict";
    "function" == typeof define && define.amd ? define("Particles", function() {
        return Particles
    }) : "undefined" != typeof module && module.exports ? module.exports = Particles : window.Particles = Particles
}();