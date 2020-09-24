!function(e) {
    e(document).ready(function() {
        e("#page-wrapper ul").hasClass("floatNav") && e("body").pageScroller({
            navigation: ".floatNav"
        })
    })
}(jQuery),
function(e, t) {
    function n(t) {
        e.fn.cycle.debug && i(t)
    }
    function i() {
        window.console && console.log && console.log("[cycle] " + Array.prototype.join.call(arguments, " "))
    }
    function s(t, n, i) {
        var s = e(t).data("cycle.opts");
        if (s) {
            var a = !!t.cyclePause;
            a && s.paused ? s.paused(t, s, n, i) : !a && s.resumed && s.resumed(t, s, n, i)
        }
    }
    function a(n, a, o) {
        function l(t, n, s) {
            if (!t && !0 === n) {
                var a = e(s).data("cycle.opts");
                if (!a)
                    return i("options not found, can not resume"),
                    !1;
                s.cycleTimeout && (clearTimeout(s.cycleTimeout),
                s.cycleTimeout = 0),
                p(a.elements, a, 1, !a.backwards)
            }
        }
        if (n.cycleStop === t && (n.cycleStop = 0),
        a !== t && null !== a || (a = {}),
        a.constructor == String) {
            switch (a) {
            case "destroy":
            case "stop":
                var c = e(n).data("cycle.opts");
                return !!c && (n.cycleStop++,
                n.cycleTimeout && clearTimeout(n.cycleTimeout),
                n.cycleTimeout = 0,
                c.elements && e(c.elements).stop(),
                e(n).removeData("cycle.opts"),
                "destroy" == a && r(n, c),
                !1);
            case "toggle":
                return n.cyclePause = 1 === n.cyclePause ? 0 : 1,
                l(n.cyclePause, o, n),
                s(n),
                !1;
            case "pause":
                return n.cyclePause = 1,
                s(n),
                !1;
            case "resume":
                return n.cyclePause = 0,
                l(!1, o, n),
                s(n),
                !1;
            case "prev":
            case "next":
                return (c = e(n).data("cycle.opts")) ? ("string" == typeof o && (c.oneTimeFx = o),
                e.fn.cycle[a](c),
                !1) : (i('options not found, "prev/next" ignored'),
                !1);
            default:
                a = {
                    fx: a
                }
            }
            return a
        }
        if (a.constructor == Number) {
            var d = a;
            return (a = e(n).data("cycle.opts")) ? d < 0 || d >= a.elements.length ? (i("invalid slide index: " + d),
            !1) : (a.nextSlide = d,
            n.cycleTimeout && (clearTimeout(n.cycleTimeout),
            n.cycleTimeout = 0),
            "string" == typeof o && (a.oneTimeFx = o),
            p(a.elements, a, 1, d >= a.currSlide),
            !1) : (i("options not found, can not advance slide"),
            !1)
        }
        return a
    }
    function o(t, n) {
        if (!e.support.opacity && n.cleartype && t.style.filter)
            try {
                t.style.removeAttribute("filter")
            } catch (e) {}
    }
    function r(t, n) {
        n.next && e(n.next).unbind(n.prevNextEvent),
        n.prev && e(n.prev).unbind(n.prevNextEvent),
        (n.pager || n.pagerAnchorBuilder) && e.each(n.pagerAnchors || [], function() {
            this.unbind().remove()
        }),
        n.pagerAnchors = null,
        e(t).unbind("mouseenter.cycle mouseleave.cycle"),
        n.destroy && n.destroy(n)
    }
    function l(n, a, r, l, f) {
        var v, x = e.extend({}, e.fn.cycle.defaults, l || {}, e.metadata ? n.metadata() : e.meta ? n.data() : {}), y = e.isFunction(n.data) ? n.data(x.metaAttr) : null;
        y && (x = e.extend(x, y)),
        x.autostop && (x.countdown = x.autostopCount || r.length);
        var w = n[0];
        if (n.data("cycle.opts", x),
        x.$cont = n,
        x.stopCount = w.cycleStop,
        x.elements = r,
        x.before = x.before ? [x.before] : [],
        x.after = x.after ? [x.after] : [],
        !e.support.opacity && x.cleartype && x.after.push(function() {
            o(this, x)
        }),
        x.continuous && x.after.push(function() {
            p(r, x, 0, !x.backwards)
        }),
        c(x),
        e.support.opacity || !x.cleartype || x.cleartypeNoBg || g(a),
        "static" == n.css("position") && n.css("position", "relative"),
        x.width && n.width(x.width),
        x.height && "auto" != x.height && n.height(x.height),
        x.startingSlide !== t ? (x.startingSlide = parseInt(x.startingSlide, 10),
        x.startingSlide >= r.length || x.startSlide < 0 ? x.startingSlide = 0 : v = !0) : x.backwards ? x.startingSlide = r.length - 1 : x.startingSlide = 0,
        x.random) {
            x.randomMap = [];
            for (var S = 0; S < r.length; S++)
                x.randomMap.push(S);
            if (x.randomMap.sort(function(e, t) {
                return Math.random() - .5
            }),
            v)
                for (var b = 0; b < r.length; b++)
                    x.startingSlide == x.randomMap[b] && (x.randomIndex = b);
            else
                x.randomIndex = 1,
                x.startingSlide = x.randomMap[1]
        } else
            x.startingSlide >= r.length && (x.startingSlide = 0);
        x.currSlide = x.startingSlide || 0;
        var C = x.startingSlide;
        if (a.css({
            position: "absolute",
            top: 0,
            left: 0
        }).hide().each(function(t) {
            var n;
            n = x.backwards ? C ? t <= C ? r.length + (t - C) : C - t : r.length - t : C ? t >= C ? r.length - (t - C) : C - t : r.length - t,
            e(this).css("z-index", n)
        }),
        e(r[C]).css("opacity", 1).show(),
        o(r[C], x),
        x.fit && (x.aspect ? a.each(function() {
            var t = e(this)
              , n = !0 === x.aspect ? t.width() / t.height() : x.aspect;
            x.width && t.width() != x.width && (t.width(x.width),
            t.height(x.width / n)),
            x.height && t.height() < x.height && (t.height(x.height),
            t.width(x.height * n))
        }) : (x.width && a.width(x.width),
        x.height && "auto" != x.height && a.height(x.height))),
        !x.center || x.fit && !x.aspect || a.each(function() {
            var t = e(this);
            t.css({
                "margin-left": x.width ? (x.width - t.width()) / 2 + "px" : 0,
                "margin-top": x.height ? (x.height - t.height()) / 2 + "px" : 0
            })
        }),
        !x.center || x.fit || x.slideResize || a.each(function() {
            var t = e(this);
            t.css({
                "margin-left": x.width ? (x.width - t.width()) / 2 + "px" : 0,
                "margin-top": x.height ? (x.height - t.height()) / 2 + "px" : 0
            })
        }),
        (x.containerResize || x.containerResizeHeight) && n.innerHeight() < 1) {
            for (var T = 0, I = 0, k = 0; k < r.length; k++) {
                var P = e(r[k])
                  , A = P[0]
                  , E = P.outerWidth()
                  , O = P.outerHeight();
                E || (E = A.offsetWidth || A.width || P.attr("width")),
                O || (O = A.offsetHeight || A.height || P.attr("height")),
                T = E > T ? E : T,
                I = O > I ? O : I
            }
            x.containerResize && T > 0 && I > 0 && n.css({
                width: T + "px",
                height: I + "px"
            }),
            x.containerResizeHeight && I > 0 && n.css({
                height: I + "px"
            })
        }
        var N = !1;
        if (x.pause && n.bind("mouseenter.cycle", function() {
            N = !0,
            this.cyclePause++,
            s(w, !0)
        }).bind("mouseleave.cycle", function() {
            N && this.cyclePause--,
            s(w, !0)
        }),
        !1 === d(x))
            return !1;
        var B = !1;
        if (l.requeueAttempts = l.requeueAttempts || 0,
        a.each(function() {
            var t = e(this);
            if (this.cycleH = x.fit && x.height ? x.height : t.height() || this.offsetHeight || this.height || t.attr("height") || 0,
            this.cycleW = x.fit && x.width ? x.width : t.width() || this.offsetWidth || this.width || t.attr("width") || 0,
            t.is("img") && 0 === this.cycleH && 0 === this.cycleW && !this.complete) {
                if (f.s && x.requeueOnImageNotLoaded && ++l.requeueAttempts < 100)
                    return i(l.requeueAttempts, " - img slide not loaded, requeuing slideshow: ", this.src, this.cycleW, this.cycleH),
                    setTimeout(function() {
                        e(f.s, f.c).cycle(l)
                    }, x.requeueTimeout),
                    B = !0,
                    !1;
                i("could not determine size of image: " + this.src, this.cycleW, this.cycleH)
            }
            return !0
        }),
        B)
            return !1;
        if (x.cssBefore = x.cssBefore || {},
        x.cssAfter = x.cssAfter || {},
        x.cssFirst = x.cssFirst || {},
        x.animIn = x.animIn || {},
        x.animOut = x.animOut || {},
        a.not(":eq(" + C + ")").css(x.cssBefore),
        e(a[C]).css(x.cssFirst),
        x.timeout) {
            x.timeout = parseInt(x.timeout, 10),
            x.speed.constructor == String && (x.speed = e.fx.speeds[x.speed] || parseInt(x.speed, 10)),
            x.sync || (x.speed = x.speed / 2);
            for (var M = "none" == x.fx ? 0 : "shuffle" == x.fx ? 500 : 250; x.timeout - x.speed < M; )
                x.timeout += x.speed
        }
        if (x.easing && (x.easeIn = x.easeOut = x.easing),
        x.speedIn || (x.speedIn = x.speed),
        x.speedOut || (x.speedOut = x.speed),
        x.slideCount = r.length,
        x.currSlide = x.lastSlide = C,
        x.random ? (++x.randomIndex == r.length && (x.randomIndex = 0),
        x.nextSlide = x.randomMap[x.randomIndex]) : x.backwards ? x.nextSlide = 0 === x.startingSlide ? r.length - 1 : x.startingSlide - 1 : x.nextSlide = x.startingSlide >= r.length - 1 ? 0 : x.startingSlide + 1,
        !x.multiFx) {
            var W = e.fn.cycle.transitions[x.fx];
            if (e.isFunction(W))
                W(n, a, x);
            else if ("custom" != x.fx && !x.multiFx)
                return i("unknown transition: " + x.fx, "; slideshow terminating"),
                !1
        }
        var H = a[C];
        return x.skipInitializationCallbacks || (x.before.length && x.before[0].apply(H, [H, H, x, !0]),
        x.after.length && x.after[0].apply(H, [H, H, x, !0])),
        x.next && e(x.next).bind(x.prevNextEvent, function() {
            return h(x, 1)
        }),
        x.prev && e(x.prev).bind(x.prevNextEvent, function() {
            return h(x, 0)
        }),
        (x.pager || x.pagerAnchorBuilder) && m(r, x),
        u(x, r),
        x
    }
    function c(t) {
        t.original = {
            before: [],
            after: []
        },
        t.original.cssBefore = e.extend({}, t.cssBefore),
        t.original.cssAfter = e.extend({}, t.cssAfter),
        t.original.animIn = e.extend({}, t.animIn),
        t.original.animOut = e.extend({}, t.animOut),
        e.each(t.before, function() {
            t.original.before.push(this)
        }),
        e.each(t.after, function() {
            t.original.after.push(this)
        })
    }
    function d(t) {
        var s, a, o = e.fn.cycle.transitions;
        if (t.fx.indexOf(",") > 0) {
            for (t.multiFx = !0,
            t.fxs = t.fx.replace(/\s*/g, "").split(","),
            s = 0; s < t.fxs.length; s++) {
                var r = t.fxs[s];
                (a = o[r]) && o.hasOwnProperty(r) && e.isFunction(a) || (i("discarding unknown transition: ", r),
                t.fxs.splice(s, 1),
                s--)
            }
            if (!t.fxs.length)
                return i("No valid transitions named; slideshow terminating."),
                !1
        } else if ("all" == t.fx) {
            t.multiFx = !0,
            t.fxs = [];
            for (var l in o)
                o.hasOwnProperty(l) && (a = o[l],
                o.hasOwnProperty(l) && e.isFunction(a) && t.fxs.push(l))
        }
        if (t.multiFx && t.randomizeEffects) {
            var c = Math.floor(20 * Math.random()) + 30;
            for (s = 0; s < c; s++) {
                var d = Math.floor(Math.random() * t.fxs.length);
                t.fxs.push(t.fxs.splice(d, 1)[0])
            }
            n("randomized fx sequence: ", t.fxs)
        }
        return !0
    }
    function u(t, n) {
        t.addSlide = function(i, s) {
            var a = e(i)
              , o = a[0];
            t.autostopCount || t.countdown++,
            n[s ? "unshift" : "push"](o),
            t.els && t.els[s ? "unshift" : "push"](o),
            t.slideCount = n.length,
            t.random && (t.randomMap.push(t.slideCount - 1),
            t.randomMap.sort(function(e, t) {
                return Math.random() - .5
            })),
            a.css("position", "absolute"),
            a[s ? "prependTo" : "appendTo"](t.$cont),
            s && (t.currSlide++,
            t.nextSlide++),
            e.support.opacity || !t.cleartype || t.cleartypeNoBg || g(a),
            t.fit && t.width && a.width(t.width),
            t.fit && t.height && "auto" != t.height && a.height(t.height),
            o.cycleH = t.fit && t.height ? t.height : a.height(),
            o.cycleW = t.fit && t.width ? t.width : a.width(),
            a.css(t.cssBefore),
            (t.pager || t.pagerAnchorBuilder) && e.fn.cycle.createPagerAnchor(n.length - 1, o, e(t.pager), n, t),
            e.isFunction(t.onAddSlide) ? t.onAddSlide(a) : a.hide()
        }
    }
    function p(i, s, a, o) {
        function r() {
            var e = 0;
            s.timeout,
            s.timeout && !s.continuous ? (e = f(i[s.currSlide], i[s.nextSlide], s, o),
            "shuffle" == s.fx && (e -= s.speedOut)) : s.continuous && l.cyclePause && (e = 10),
            e > 0 && (l.cycleTimeout = setTimeout(function() {
                p(i, s, 0, !s.backwards)
            }, e))
        }
        var l = s.$cont[0]
          , c = i[s.currSlide]
          , d = i[s.nextSlide];
        if (a && s.busy && s.manualTrump && (n("manualTrump in go(), stopping active transition"),
        e(i).stop(!0, !0),
        s.busy = 0,
        clearTimeout(l.cycleTimeout)),
        s.busy)
            return void n("transition active, ignoring new tx request");
        if (l.cycleStop == s.stopCount && (0 !== l.cycleTimeout || a)) {
            if (!a && !l.cyclePause && !s.bounce && (s.autostop && --s.countdown <= 0 || s.nowrap && !s.random && s.nextSlide < s.currSlide))
                return void (s.end && s.end(s));
            var u = !1;
            if (!a && l.cyclePause || s.nextSlide == s.currSlide)
                r();
            else {
                u = !0;
                var h = s.fx;
                c.cycleH = c.cycleH || e(c).height(),
                c.cycleW = c.cycleW || e(c).width(),
                d.cycleH = d.cycleH || e(d).height(),
                d.cycleW = d.cycleW || e(d).width(),
                s.multiFx && (o && (s.lastFx === t || ++s.lastFx >= s.fxs.length) ? s.lastFx = 0 : !o && (s.lastFx === t || --s.lastFx < 0) && (s.lastFx = s.fxs.length - 1),
                h = s.fxs[s.lastFx]),
                s.oneTimeFx && (h = s.oneTimeFx,
                s.oneTimeFx = null),
                e.fn.cycle.resetState(s, h),
                s.before.length && e.each(s.before, function(e, t) {
                    l.cycleStop == s.stopCount && t.apply(d, [c, d, s, o])
                });
                var m = function() {
                    s.busy = 0,
                    e.each(s.after, function(e, t) {
                        l.cycleStop == s.stopCount && t.apply(d, [c, d, s, o])
                    }),
                    l.cycleStop || r()
                };
                n("tx firing(" + h + "); currSlide: " + s.currSlide + "; nextSlide: " + s.nextSlide),
                s.busy = 1,
                s.fxFn ? s.fxFn(c, d, s, m, o, a && s.fastOnEvent) : e.isFunction(e.fn.cycle[s.fx]) ? e.fn.cycle[s.fx](c, d, s, m, o, a && s.fastOnEvent) : e.fn.cycle.custom(c, d, s, m, o, a && s.fastOnEvent)
            }
            if (u || s.nextSlide == s.currSlide) {
                var g;
                s.lastSlide = s.currSlide,
                s.random ? (s.currSlide = s.nextSlide,
                ++s.randomIndex == i.length && (s.randomIndex = 0,
                s.randomMap.sort(function(e, t) {
                    return Math.random() - .5
                })),
                s.nextSlide = s.randomMap[s.randomIndex],
                s.nextSlide == s.currSlide && (s.nextSlide = s.currSlide == s.slideCount - 1 ? 0 : s.currSlide + 1)) : s.backwards ? (g = s.nextSlide - 1 < 0,
                g && s.bounce ? (s.backwards = !s.backwards,
                s.nextSlide = 1,
                s.currSlide = 0) : (s.nextSlide = g ? i.length - 1 : s.nextSlide - 1,
                s.currSlide = g ? 0 : s.nextSlide + 1)) : (g = s.nextSlide + 1 == i.length,
                g && s.bounce ? (s.backwards = !s.backwards,
                s.nextSlide = i.length - 2,
                s.currSlide = i.length - 1) : (s.nextSlide = g ? 0 : s.nextSlide + 1,
                s.currSlide = g ? i.length - 1 : s.nextSlide - 1))
            }
            u && s.pager && s.updateActivePagerLink(s.pager, s.currSlide, s.activePagerClass)
        }
    }
    function f(e, t, i, s) {
        if (i.timeoutFn) {
            for (var a = i.timeoutFn.call(e, e, t, i, s); "none" != i.fx && a - i.speed < 250; )
                a += i.speed;
            if (n("calculated timeout: " + a + "; speed: " + i.speed),
            !1 !== a)
                return a
        }
        return i.timeout
    }
    function h(t, n) {
        var i = n ? 1 : -1
          , s = t.elements
          , a = t.$cont[0]
          , o = a.cycleTimeout;
        if (o && (clearTimeout(o),
        a.cycleTimeout = 0),
        t.random && i < 0)
            t.randomIndex--,
            -2 == --t.randomIndex ? t.randomIndex = s.length - 2 : -1 == t.randomIndex && (t.randomIndex = s.length - 1),
            t.nextSlide = t.randomMap[t.randomIndex];
        else if (t.random)
            t.nextSlide = t.randomMap[t.randomIndex];
        else if (t.nextSlide = t.currSlide + i,
        t.nextSlide < 0) {
            if (t.nowrap)
                return !1;
            t.nextSlide = s.length - 1
        } else if (t.nextSlide >= s.length) {
            if (t.nowrap)
                return !1;
            t.nextSlide = 0
        }
        var r = t.onPrevNextEvent || t.prevNextClick;
        return e.isFunction(r) && r(i > 0, t.nextSlide, s[t.nextSlide]),
        p(s, t, 1, n),
        !1
    }
    function m(t, n) {
        var i = e(n.pager);
        e.each(t, function(s, a) {
            e.fn.cycle.createPagerAnchor(s, a, i, t, n)
        }),
        n.updateActivePagerLink(n.pager, n.startingSlide, n.activePagerClass)
    }
    function g(t) {
        function i(e) {
            return e = parseInt(e, 10).toString(16),
            e.length < 2 ? "0" + e : e
        }
        function s(t) {
            for (; t && "html" != t.nodeName.toLowerCase(); t = t.parentNode) {
                var n = e.css(t, "background-color");
                if (n && n.indexOf("rgb") >= 0) {
                    var s = n.match(/\d+/g);
                    return "#" + i(s[0]) + i(s[1]) + i(s[2])
                }
                if (n && "transparent" != n)
                    return n
            }
            return "#ffffff"
        }
        n("applying clearType background-color hack"),
        t.each(function() {
            e(this).css("background-color", s(this))
        })
    }
    e.expr[":"].paused = function(e) {
        return e.cyclePause
    }
    ,
    e.fn.cycle = function(t, s) {
        var o = {
            s: this.selector,
            c: this.context
        };
        return 0 === this.length && "stop" != t ? !e.isReady && o.s ? (i("DOM not ready, queuing slideshow"),
        e(function() {
            e(o.s, o.c).cycle(t, s)
        }),
        this) : (i("terminating; zero elements found by selector" + (e.isReady ? "" : " (DOM not ready)")),
        this) : this.each(function() {
            var r = a(this, t, s);
            if (!1 !== r) {
                r.updateActivePagerLink = r.updateActivePagerLink || e.fn.cycle.updateActivePagerLink,
                this.cycleTimeout && clearTimeout(this.cycleTimeout),
                this.cycleTimeout = this.cyclePause = 0,
                this.cycleStop = 0;
                var c = e(this)
                  , d = r.slideExpr ? e(r.slideExpr, this) : c.children()
                  , u = d.get();
                if (u.length < 2)
                    return void i("terminating; too few slides: " + u.length);
                var h = l(c, d, u, r, o);
                if (!1 !== h) {
                    var m = h.continuous ? 10 : f(u[h.currSlide], u[h.nextSlide], h, !h.backwards);
                    m && (m += h.delay || 0,
                    m < 10 && (m = 10),
                    n("first timeout: " + m),
                    this.cycleTimeout = setTimeout(function() {
                        p(u, h, 0, !r.backwards)
                    }, m))
                }
            }
        })
    }
    ,
    e.fn.cycle.resetState = function(t, n) {
        n = n || t.fx,
        t.before = [],
        t.after = [],
        t.cssBefore = e.extend({}, t.original.cssBefore),
        t.cssAfter = e.extend({}, t.original.cssAfter),
        t.animIn = e.extend({}, t.original.animIn),
        t.animOut = e.extend({}, t.original.animOut),
        t.fxFn = null,
        e.each(t.original.before, function() {
            t.before.push(this)
        }),
        e.each(t.original.after, function() {
            t.after.push(this)
        });
        var i = e.fn.cycle.transitions[n];
        e.isFunction(i) && i(t.$cont, e(t.elements), t)
    }
    ,
    e.fn.cycle.updateActivePagerLink = function(t, n, i) {
        e(t).each(function() {
            e(this).children().removeClass(i).eq(n).addClass(i)
        })
    }
    ,
    e.fn.cycle.next = function(e) {
        h(e, 1)
    }
    ,
    e.fn.cycle.prev = function(e) {
        h(e, 0)
    }
    ,
    e.fn.cycle.createPagerAnchor = function(t, i, a, o, r) {
        var l;
        if (e.isFunction(r.pagerAnchorBuilder) ? (l = r.pagerAnchorBuilder(t, i),
        n("pagerAnchorBuilder(" + t + ", el) returned: " + l)) : l = '<a href="#">' + (t + 1) + "</a>",
        l) {
            var c = e(l);
            if (0 === c.parents("body").length) {
                var d = [];
                a.length > 1 ? (a.each(function() {
                    var t = c.clone(!0);
                    e(this).append(t),
                    d.push(t[0])
                }),
                c = e(d)) : c.appendTo(a)
            }
            r.pagerAnchors = r.pagerAnchors || [],
            r.pagerAnchors.push(c);
            var u = function(n) {
                n.preventDefault(),
                r.nextSlide = t;
                var i = r.$cont[0]
                  , s = i.cycleTimeout;
                s && (clearTimeout(s),
                i.cycleTimeout = 0);
                var a = r.onPagerEvent || r.pagerClick;
                e.isFunction(a) && a(r.nextSlide, o[r.nextSlide]),
                p(o, r, 1, r.currSlide < t)
            };
            /mouseenter|mouseover/i.test(r.pagerEvent) ? c.hover(u, function() {}) : c.bind(r.pagerEvent, u),
            /^click/.test(r.pagerEvent) || r.allowPagerClickBubble || c.bind("click.cycle", function() {
                return !1
            });
            var f = r.$cont[0]
              , h = !1;
            r.pauseOnPagerHover && c.hover(function() {
                h = !0,
                f.cyclePause++,
                s(f, !0, !0)
            }, function() {
                h && f.cyclePause--,
                s(f, !0, !0)
            })
        }
    }
    ,
    e.fn.cycle.hopsFromLast = function(e, t) {
        var n = e.lastSlide
          , i = e.currSlide;
        return t ? i > n ? i - n : e.slideCount - n : i < n ? n - i : n + e.slideCount - i
    }
    ,
    e.fn.cycle.commonReset = function(t, n, i, s, a, o) {
        e(i.elements).not(t).hide(),
        void 0 === i.cssBefore.opacity && (i.cssBefore.opacity = 1),
        i.cssBefore.display = "block",
        i.slideResize && !1 !== s && n.cycleW > 0 && (i.cssBefore.width = n.cycleW),
        i.slideResize && !1 !== a && n.cycleH > 0 && (i.cssBefore.height = n.cycleH),
        i.cssAfter = i.cssAfter || {},
        i.cssAfter.display = "none",
        e(t).css("zIndex", i.slideCount + (!0 === o ? 1 : 0)),
        e(n).css("zIndex", i.slideCount + (!0 === o ? 0 : 1))
    }
    ,
    e.fn.cycle.custom = function(t, n, i, s, a, o) {
        var r = e(t)
          , l = e(n)
          , c = i.speedIn
          , d = i.speedOut
          , u = i.easeIn
          , p = i.easeOut
          , f = i.animInDelay
          , h = i.animOutDelay;
        l.css(i.cssBefore),
        o && (c = d = "number" == typeof o ? o : 1,
        u = p = null);
        var m = function() {
            l.delay(f).animate(i.animIn, c, u, function() {
                s()
            })
        };
        r.delay(h).animate(i.animOut, d, p, function() {
            r.css(i.cssAfter),
            i.sync || m()
        }),
        i.sync && m()
    }
    ,
    e.fn.cycle.transitions = {
        fade: function(t, n, i) {
            n.not(":eq(" + i.currSlide + ")").css("opacity", 0),
            i.before.push(function(t, n, i) {
                e.fn.cycle.commonReset(t, n, i),
                i.cssBefore.opacity = 0
            }),
            i.animIn = {
                opacity: 1
            },
            i.animOut = {
                opacity: 0
            },
            i.cssBefore = {
                top: 0,
                left: 0
            }
        }
    },
    e.fn.cycle.ver = function() {
        return "3.0.3"
    }
    ,
    e.fn.cycle.defaults = {
        activePagerClass: "activeSlide",
        after: null,
        allowPagerClickBubble: !1,
        animIn: null,
        animInDelay: 0,
        animOut: null,
        animOutDelay: 0,
        aspect: !1,
        autostop: 0,
        autostopCount: 0,
        backwards: !1,
        before: null,
        center: null,
        cleartype: !e.support.opacity,
        cleartypeNoBg: !1,
        containerResize: 1,
        containerResizeHeight: 0,
        continuous: 0,
        cssAfter: null,
        cssBefore: null,
        delay: 0,
        easeIn: null,
        easeOut: null,
        easing: null,
        end: null,
        fastOnEvent: 0,
        fit: 0,
        fx: "fade",
        fxFn: null,
        height: "auto",
        manualTrump: !0,
        metaAttr: "cycle",
        next: null,
        nowrap: 0,
        onPagerEvent: null,
        onPrevNextEvent: null,
        pager: null,
        pagerAnchorBuilder: null,
        pagerEvent: "click.cycle",
        pause: 0,
        pauseOnPagerHover: 0,
        prev: null,
        prevNextEvent: "click.cycle",
        random: 0,
        randomizeEffects: 1,
        requeueOnImageNotLoaded: !0,
        requeueTimeout: 250,
        rev: 0,
        shuffle: null,
        skipInitializationCallbacks: !1,
        slideExpr: null,
        slideResize: 1,
        speed: 1e3,
        speedIn: null,
        speedOut: null,
        startingSlide: t,
        sync: 1,
        timeout: 4e3,
        timeoutFn: null,
        updateActivePagerLink: null,
        width: null
    }
}(jQuery),
function(e) {
    e.fn.cycle.transitions.none = function(t, n, i) {
        i.fxFn = function(t, n, i, s) {
            e(n).show(),
            e(t).hide(),
            s()
        }
    }
    ,
    e.fn.cycle.transitions.fadeout = function(t, n, i) {
        n.not(":eq(" + i.currSlide + ")").css({
            display: "block",
            opacity: 1
        }),
        i.before.push(function(t, n, i, s, a, o) {
            e(t).css("zIndex", i.slideCount + (!0 !== o ? 1 : 0)),
            e(n).css("zIndex", i.slideCount + (!0 !== o ? 0 : 1))
        }),
        i.animIn.opacity = 1,
        i.animOut.opacity = 0,
        i.cssBefore.opacity = 1,
        i.cssBefore.display = "block",
        i.cssAfter.zIndex = 0
    }
    ,
    e.fn.cycle.transitions.scrollUp = function(t, n, i) {
        t.css("overflow", "hidden"),
        i.before.push(e.fn.cycle.commonReset);
        var s = t.height();
        i.cssBefore.top = s,
        i.cssBefore.left = 0,
        i.cssFirst.top = 0,
        i.animIn.top = 0,
        i.animOut.top = -s
    }
    ,
    e.fn.cycle.transitions.scrollDown = function(t, n, i) {
        t.css("overflow", "hidden"),
        i.before.push(e.fn.cycle.commonReset);
        var s = t.height();
        i.cssFirst.top = 0,
        i.cssBefore.top = -s,
        i.cssBefore.left = 0,
        i.animIn.top = 0,
        i.animOut.top = s
    }
    ,
    e.fn.cycle.transitions.scrollLeft = function(t, n, i) {
        t.css("overflow", "hidden"),
        i.before.push(e.fn.cycle.commonReset);
        var s = t.width();
        i.cssFirst.left = 0,
        i.cssBefore.left = s,
        i.cssBefore.top = 0,
        i.animIn.left = 0,
        i.animOut.left = 0 - s
    }
    ,
    e.fn.cycle.transitions.scrollRight = function(t, n, i) {
        t.css("overflow", "hidden"),
        i.before.push(e.fn.cycle.commonReset);
        var s = t.width();
        i.cssFirst.left = 0,
        i.cssBefore.left = -s,
        i.cssBefore.top = 0,
        i.animIn.left = 0,
        i.animOut.left = s
    }
    ,
    e.fn.cycle.transitions.scrollHorz = function(t, n, i) {
        t.css("overflow", "hidden").width(),
        i.before.push(function(t, n, i, s) {
            i.rev && (s = !s),
            e.fn.cycle.commonReset(t, n, i),
            i.cssBefore.left = s ? n.cycleW - 1 : 1 - n.cycleW,
            i.animOut.left = s ? -t.cycleW : t.cycleW
        }),
        i.cssFirst.left = 0,
        i.cssBefore.top = 0,
        i.animIn.left = 0,
        i.animOut.top = 0
    }
    ,
    e.fn.cycle.transitions.scrollVert = function(t, n, i) {
        t.css("overflow", "hidden"),
        i.before.push(function(t, n, i, s) {
            i.rev && (s = !s),
            e.fn.cycle.commonReset(t, n, i),
            i.cssBefore.top = s ? 1 - n.cycleH : n.cycleH - 1,
            i.animOut.top = s ? t.cycleH : -t.cycleH
        }),
        i.cssFirst.top = 0,
        i.cssBefore.left = 0,
        i.animIn.top = 0,
        i.animOut.left = 0
    }
    ,
    e.fn.cycle.transitions.slideX = function(t, n, i) {
        i.before.push(function(t, n, i) {
            e(i.elements).not(t).hide(),
            e.fn.cycle.commonReset(t, n, i, !1, !0),
            i.animIn.width = n.cycleW
        }),
        i.cssBefore.left = 0,
        i.cssBefore.top = 0,
        i.cssBefore.width = 0,
        i.animIn.width = "show",
        i.animOut.width = 0
    }
    ,
    e.fn.cycle.transitions.slideY = function(t, n, i) {
        i.before.push(function(t, n, i) {
            e(i.elements).not(t).hide(),
            e.fn.cycle.commonReset(t, n, i, !0, !1),
            i.animIn.height = n.cycleH
        }),
        i.cssBefore.left = 0,
        i.cssBefore.top = 0,
        i.cssBefore.height = 0,
        i.animIn.height = "show",
        i.animOut.height = 0
    }
    ,
    e.fn.cycle.transitions.shuffle = function(t, n, i) {
        var s, a = t.css("overflow", "visible").width();
        for (n.css({
            left: 0,
            top: 0
        }),
        i.before.push(function(t, n, i) {
            e.fn.cycle.commonReset(t, n, i, !0, !0, !0)
        }),
        i.speedAdjusted || (i.speed = i.speed / 2,
        i.speedAdjusted = !0),
        i.random = 0,
        i.shuffle = i.shuffle || {
            left: -a,
            top: 15
        },
        i.els = [],
        s = 0; s < n.length; s++)
            i.els.push(n[s]);
        for (s = 0; s < i.currSlide; s++)
            i.els.push(i.els.shift());
        i.fxFn = function(t, n, i, s, a) {
            i.rev && (a = !a);
            var o = e(a ? t : n);
            e(n).css(i.cssBefore);
            var r = i.slideCount;
            o.animate(i.shuffle, i.speedIn, i.easeIn, function() {
                for (var n = e.fn.cycle.hopsFromLast(i, a), l = 0; l < n; l++)
                    a ? i.els.push(i.els.shift()) : i.els.unshift(i.els.pop());
                if (a)
                    for (var c = 0, d = i.els.length; c < d; c++)
                        e(i.els[c]).css("z-index", d - c + r);
                else {
                    var u = e(t).css("z-index");
                    o.css("z-index", parseInt(u, 10) + 1 + r)
                }
                o.animate({
                    left: 0,
                    top: 0
                }, i.speedOut, i.easeOut, function() {
                    e(a ? this : t).hide(),
                    s && s()
                })
            })
        }
        ,
        e.extend(i.cssBefore, {
            display: "block",
            opacity: 1,
            top: 0,
            left: 0
        })
    }
    ,
    e.fn.cycle.transitions.turnUp = function(t, n, i) {
        i.before.push(function(t, n, i) {
            e.fn.cycle.commonReset(t, n, i, !0, !1),
            i.cssBefore.top = n.cycleH,
            i.animIn.height = n.cycleH,
            i.animOut.width = n.cycleW
        }),
        i.cssFirst.top = 0,
        i.cssBefore.left = 0,
        i.cssBefore.height = 0,
        i.animIn.top = 0,
        i.animOut.height = 0
    }
    ,
    e.fn.cycle.transitions.turnDown = function(t, n, i) {
        i.before.push(function(t, n, i) {
            e.fn.cycle.commonReset(t, n, i, !0, !1),
            i.animIn.height = n.cycleH,
            i.animOut.top = t.cycleH
        }),
        i.cssFirst.top = 0,
        i.cssBefore.left = 0,
        i.cssBefore.top = 0,
        i.cssBefore.height = 0,
        i.animOut.height = 0
    }
    ,
    e.fn.cycle.transitions.turnLeft = function(t, n, i) {
        i.before.push(function(t, n, i) {
            e.fn.cycle.commonReset(t, n, i, !1, !0),
            i.cssBefore.left = n.cycleW,
            i.animIn.width = n.cycleW
        }),
        i.cssBefore.top = 0,
        i.cssBefore.width = 0,
        i.animIn.left = 0,
        i.animOut.width = 0
    }
    ,
    e.fn.cycle.transitions.turnRight = function(t, n, i) {
        i.before.push(function(t, n, i) {
            e.fn.cycle.commonReset(t, n, i, !1, !0),
            i.animIn.width = n.cycleW,
            i.animOut.left = t.cycleW
        }),
        e.extend(i.cssBefore, {
            top: 0,
            left: 0,
            width: 0
        }),
        i.animIn.left = 0,
        i.animOut.width = 0
    }
    ,
    e.fn.cycle.transitions.zoom = function(t, n, i) {
        i.before.push(function(t, n, i) {
            e.fn.cycle.commonReset(t, n, i, !1, !1, !0),
            i.cssBefore.top = n.cycleH / 2,
            i.cssBefore.left = n.cycleW / 2,
            e.extend(i.animIn, {
                top: 0,
                left: 0,
                width: n.cycleW,
                height: n.cycleH
            }),
            e.extend(i.animOut, {
                width: 0,
                height: 0,
                top: t.cycleH / 2,
                left: t.cycleW / 2
            })
        }),
        i.cssFirst.top = 0,
        i.cssFirst.left = 0,
        i.cssBefore.width = 0,
        i.cssBefore.height = 0
    }
    ,
    e.fn.cycle.transitions.fadeZoom = function(t, n, i) {
        i.before.push(function(t, n, i) {
            e.fn.cycle.commonReset(t, n, i, !1, !1),
            i.cssBefore.left = n.cycleW / 2,
            i.cssBefore.top = n.cycleH / 2,
            e.extend(i.animIn, {
                top: 0,
                left: 0,
                width: n.cycleW,
                height: n.cycleH
            })
        }),
        i.cssBefore.width = 0,
        i.cssBefore.height = 0,
        i.animOut.opacity = 0
    }
    ,
    e.fn.cycle.transitions.blindX = function(t, n, i) {
        var s = t.css("overflow", "hidden").width();
        i.before.push(function(t, n, i) {
            e.fn.cycle.commonReset(t, n, i),
            i.animIn.width = n.cycleW,
            i.animOut.left = t.cycleW
        }),
        i.cssBefore.left = s,
        i.cssBefore.top = 0,
        i.animIn.left = 0,
        i.animOut.left = s
    }
    ,
    e.fn.cycle.transitions.blindY = function(t, n, i) {
        var s = t.css("overflow", "hidden").height();
        i.before.push(function(t, n, i) {
            e.fn.cycle.commonReset(t, n, i),
            i.animIn.height = n.cycleH,
            i.animOut.top = t.cycleH
        }),
        i.cssBefore.top = s,
        i.cssBefore.left = 0,
        i.animIn.top = 0,
        i.animOut.top = s
    }
    ,
    e.fn.cycle.transitions.blindZ = function(t, n, i) {
        var s = t.css("overflow", "hidden").height()
          , a = t.width();
        i.before.push(function(t, n, i) {
            e.fn.cycle.commonReset(t, n, i),
            i.animIn.height = n.cycleH,
            i.animOut.top = t.cycleH
        }),
        i.cssBefore.top = s,
        i.cssBefore.left = a,
        i.animIn.top = 0,
        i.animIn.left = 0,
        i.animOut.top = s,
        i.animOut.left = a
    }
    ,
    e.fn.cycle.transitions.growX = function(t, n, i) {
        i.before.push(function(t, n, i) {
            e.fn.cycle.commonReset(t, n, i, !1, !0),
            i.cssBefore.left = this.cycleW / 2,
            i.animIn.left = 0,
            i.animIn.width = this.cycleW,
            i.animOut.left = 0
        }),
        i.cssBefore.top = 0,
        i.cssBefore.width = 0
    }
    ,
    e.fn.cycle.transitions.growY = function(t, n, i) {
        i.before.push(function(t, n, i) {
            e.fn.cycle.commonReset(t, n, i, !0, !1),
            i.cssBefore.top = this.cycleH / 2,
            i.animIn.top = 0,
            i.animIn.height = this.cycleH,
            i.animOut.top = 0
        }),
        i.cssBefore.height = 0,
        i.cssBefore.left = 0
    }
    ,
    e.fn.cycle.transitions.curtainX = function(t, n, i) {
        i.before.push(function(t, n, i) {
            e.fn.cycle.commonReset(t, n, i, !1, !0, !0),
            i.cssBefore.left = n.cycleW / 2,
            i.animIn.left = 0,
            i.animIn.width = this.cycleW,
            i.animOut.left = t.cycleW / 2,
            i.animOut.width = 0
        }),
        i.cssBefore.top = 0,
        i.cssBefore.width = 0
    }
    ,
    e.fn.cycle.transitions.curtainY = function(t, n, i) {
        i.before.push(function(t, n, i) {
            e.fn.cycle.commonReset(t, n, i, !0, !1, !0),
            i.cssBefore.top = n.cycleH / 2,
            i.animIn.top = 0,
            i.animIn.height = n.cycleH,
            i.animOut.top = t.cycleH / 2,
            i.animOut.height = 0
        }),
        i.cssBefore.height = 0,
        i.cssBefore.left = 0
    }
    ,
    e.fn.cycle.transitions.cover = function(t, n, i) {
        var s = i.direction || "left"
          , a = t.css("overflow", "hidden").width()
          , o = t.height();
        i.before.push(function(t, n, i) {
            e.fn.cycle.commonReset(t, n, i),
            i.cssAfter.display = "",
            "right" == s ? i.cssBefore.left = -a : "up" == s ? i.cssBefore.top = o : "down" == s ? i.cssBefore.top = -o : i.cssBefore.left = a
        }),
        i.animIn.left = 0,
        i.animIn.top = 0,
        i.cssBefore.top = 0,
        i.cssBefore.left = 0
    }
    ,
    e.fn.cycle.transitions.uncover = function(t, n, i) {
        var s = i.direction || "left"
          , a = t.css("overflow", "hidden").width()
          , o = t.height();
        i.before.push(function(t, n, i) {
            e.fn.cycle.commonReset(t, n, i, !0, !0, !0),
            "right" == s ? i.animOut.left = a : "up" == s ? i.animOut.top = -o : "down" == s ? i.animOut.top = o : i.animOut.left = -a
        }),
        i.animIn.left = 0,
        i.animIn.top = 0,
        i.cssBefore.top = 0,
        i.cssBefore.left = 0
    }
    ,
    e.fn.cycle.transitions.toss = function(t, n, i) {
        var s = t.css("overflow", "visible").width()
          , a = t.height();
        i.before.push(function(t, n, i) {
            e.fn.cycle.commonReset(t, n, i, !0, !0, !0),
            i.animOut.left || i.animOut.top ? i.animOut.opacity = 0 : e.extend(i.animOut, {
                left: 2 * s,
                top: -a / 2,
                opacity: 0
            })
        }),
        i.cssBefore.left = 0,
        i.cssBefore.top = 0,
        i.animIn.left = 0
    }
    ,
    e.fn.cycle.transitions.wipe = function(t, n, i) {
        var s = t.css("overflow", "hidden").width()
          , a = t.height();
        i.cssBefore = i.cssBefore || {};
        var o;
        if (i.clip)
            if (/l2r/.test(i.clip))
                o = "rect(0px 0px " + a + "px 0px)";
            else if (/r2l/.test(i.clip))
                o = "rect(0px " + s + "px " + a + "px " + s + "px)";
            else if (/t2b/.test(i.clip))
                o = "rect(0px " + s + "px 0px 0px)";
            else if (/b2t/.test(i.clip))
                o = "rect(" + a + "px " + s + "px " + a + "px 0px)";
            else if (/zoom/.test(i.clip)) {
                var r = parseInt(a / 2, 10)
                  , l = parseInt(s / 2, 10);
                o = "rect(" + r + "px " + l + "px " + r + "px " + l + "px)"
            }
        i.cssBefore.clip = i.cssBefore.clip || o || "rect(0px 0px 0px 0px)";
        var c = i.cssBefore.clip.match(/(\d+)/g)
          , d = parseInt(c[0], 10)
          , u = parseInt(c[1], 10)
          , p = parseInt(c[2], 10)
          , f = parseInt(c[3], 10);
        i.before.push(function(t, n, i) {
            if (t != n) {
                var o = e(t)
                  , r = e(n);
                e.fn.cycle.commonReset(t, n, i, !0, !0, !1),
                i.cssAfter.display = "block";
                var l = 1
                  , c = parseInt(i.speedIn / 13, 10) - 1;
                !function e() {
                    var t = d ? d - parseInt(l * (d / c), 10) : 0
                      , n = f ? f - parseInt(l * (f / c), 10) : 0
                      , i = p < a ? p + parseInt(l * ((a - p) / c || 1), 10) : a
                      , h = u < s ? u + parseInt(l * ((s - u) / c || 1), 10) : s;
                    r.css({
                        clip: "rect(" + t + "px " + h + "px " + i + "px " + n + "px)"
                    }),
                    l++ <= c ? setTimeout(e, 13) : o.css("display", "none")
                }()
            }
        }),
        e.extend(i.cssBefore, {
            display: "block",
            opacity: 1,
            top: 0,
            left: 0
        }),
        i.animIn = {
            left: 0
        },
        i.animOut = {
            left: 0
        }
    }
}(jQuery),
function(e) {
    function t() {
        if (e(window).width() < 560) {
            var t = e(".featureImages .field-items .field-item").height();
            e(".featureImages .field-items").css("height", t)
        }
    }
    e(window).load(function() {
        t()
    }),
    e(window).resize(function() {
        t()
    }),
    e(document).ready(function() {
        var t = ["Social", "Mobile ", "Personalised", "blended", "flipped", "Online", "Collaborative", "Virtual", "just-in-time", "micro"]
          , n = 0;
        setInterval(function() {
            e(".big-text").html(t[n]),
            n === t.length - 1 ? n = 0 : n++
        }, 800),
        e(".client-testimonial .views-field-field-client-testimonial .field-content").expander({
            slicePoint: 690,
            expandText: "Read More",
            userCollapseText: "Close"
        }),
        e(".testimonial-thumbnail-images img").click(function() {
            e(".client-testimonial .views-field-field-client-testimonial .field-content .summary ").show(),
            e(".client-testimonial .views-field-field-client-testimonial .field-content .summary span").show(),
            e(".client-testimonial .views-field-field-client-testimonial .field-content .details ").hide()
        }),
        e(".whats-new .views-row #node_announcements_news_full_group_announcement_content").hide(),
        e(".whats-new .views-row .field-type-image").hide(),
        e(".whats-new .views-row-first #node_announcements_news_full_group_announcement_content").show(),
        e(".whats-new .views-row-first .field-type-image").show(),
        e(".whats-new .field-name-field-announcement-title a").attr("target", "_blank"),
        e(".whats-new .field-name-field-announcement-link a").attr("target", "_blank"),
        e("#collapse_all").click(function() {
            e(".collapse-view .col_link").each(function() {
                e(this).hasClass("collapsed") || (e(".collapse-view .col_link").addClass("collapsed"),
                e(".collapse-view .panel-collapse").removeClass("in"),
                e(".collapse-view .panel-collapse").addClass("collapse"),
                e(".floatNavPage #expand_all").removeClass("collapseFloatActive"),
                e(".floatNavPage #collapse_all").addClass("collapseFloatActive"))
            })
        }),
        e("#expand_all").click(function() {
            e(".collapse-view .col_link").each(function() {
                e(this).hasClass("collapsed") && (e(".collapse-view .col_link").removeClass("collapsed"),
                e(".collapse-view .panel-collapse").removeClass("collapse"),
                e(".collapse-view .panel-collapse").addClass("in"),
                e(".floatNavPage #collapse_all").removeClass("collapseFloatActive"),
                e(".floatNavPage #expand_all").addClass("collapseFloatActive"))
            })
        }),
        e('[data-toggle="tooltip"]').tooltip({
            placement: "bottom"
        });
        var i = ".featureScroll .field-name-field-feature-image > .field-items"
          , s = e(i + " img").width();
        e(i).each(function() {
            var t = '<div id="featureNav" style="width:' + s + 'px">';
            e(this).after(t).cycle({
                fx: "scrollLeft",
                timeout: 0,
                pager: e(this).next("#featureNav"),
                activePagerClass: "activeCustomer"
            })
        }),
        e(".teamiePlan .plan-Yes span").empty(),
        e(".teamiePlan .plan- span").empty(),
        e(".teamiePlan .plan-Yes span").append("<i class='icon-fixed-width'></i>"),
        e(".teamiePlan .plan- span").append('<i class="icon-fixed-width"></i>'),
        e(".helpCenterBoxDiv h3").each(function() {
            e(this).click(function() {
                e(this).next(".helpCenterQbody").toggle()
            })
        }),
        e(window).load(function() {
            e("#carousel").flexslider({
                animation: "slide",
                controlNav: !1,
                animationLoop: !1,
                slideshow: !1,
                itemWidth: 150,
                itemMargin: 50,
                asNavFor: "#slider",
                directionNav: !1
            }),
            e("#slider").flexslider({
                animation: "slide",
                controlNav: !1,
                animationLoop: !1,
                slideshow: !1,
                sync: "#carousel",
                directionNav: !1
            })
        }),
        e(".col_link").click(function() {
            e(".floatNavPage #expand_all").removeClass("collapseFloatActive"),
            e(".floatNavPage #collapse_all").removeClass("collapseFloatActive")
        }),
        e(window).width() >= 760 && e(".teamieHelpFeature a").hover(function() {
            var t = e(this).find(".featureImg")
              , n = t.attr("data-toggle-src")
              , i = t.attr("src");
            t.attr("src", n),
            t.attr("data-toggle-src", i)
        }, function() {
            var t = e(this).find(".featureImg")
              , n = t.attr("data-toggle-src")
              , i = t.attr("src");
            t.attr("src", n),
            t.attr("data-toggle-src", i)
        }),
        e(".teamieVideo a").hover(function() {
            e(this).find("p").css("display", "block")
        }, function() {
            e(this).find("p").css("display", "none")
        }),
        e(".dropdown-toggle").dropdown(),
        e(window).scroll(function() {
            0 == e(window).scrollTop() ? e("#header").stop().fadeTo("slow", 1) : 0 != e(window).scrollTop() && e("#header").stop().fadeTo("slow", .95)
        }),
        e("#header").hover(function() {
            0 != e(window).scrollTop() && e("#header").stop().fadeTo("slow", 1)
        }, function() {
            0 != e(window).scrollTop() && e("#header").stop().fadeTo("slow", .95)
        }),
        e("#myModal").on("hidden.bs.modal", function(e) {
            var t = jQuery("iframe").attr("src");
            jQuery("iframe").attr("src", ""),
            jQuery("iframe").attr("src", t)
        })
    }),
    e(window).load(function() {
        e(".md-bullet").each(function(t) {
            switch (e(this).attr("rel")) {
            case "0":
                icon = "<i class='icon-comments '></i> <a class='bannerTab'>Share</a>";
                break;
            case "1":
                icon = "<i class='icon-book '></i> <a class='bannerTab'>Create</a>";
                break;
            case "2":
                icon = "<i class='icon-bar-chart '></i> <a class='bannerTab'>Track</a>";
                break;
            case "3":
                icon = "<i class='icon-puzzle-piece'></i> <a class='bannerTab'>Integrate</a>";
                break;
            case "4":
                icon = "<i class='icon-lightbulb'></i> <a class='bannerTab'>Learn</a>"
            }
            e(this).append(icon)
        })
    }),
    e(window).load(function() {
        e(".slider1").bxSlider({
            slideWidth: 219,
            minSlides: 1,
            maxSlides: 5,
            slideMargin: 10,
            pager: !1
        })
    })
}(jQuery),
function(e) {
    e.flexslider = function(t, n) {
        var i = e(t);
        i.vars = e.extend({}, e.flexslider.defaults, n);
        var s, a = i.vars.namespace, o = window.navigator && window.navigator.msPointerEnabled && window.MSGesture, r = ("ontouchstart"in window || o || window.DocumentTouch && document instanceof DocumentTouch) && i.vars.touch, l = "click touchend MSPointerUp", c = "", d = "vertical" === i.vars.direction, u = i.vars.reverse, p = i.vars.itemWidth > 0, f = "fade" === i.vars.animation, h = "" !== i.vars.asNavFor, m = {};
        e.data(t, "flexslider", i),
        m = {
            init: function() {
                i.animating = !1,
                i.currentSlide = parseInt(i.vars.startAt ? i.vars.startAt : 0, 10),
                isNaN(i.currentSlide) && (i.currentSlide = 0),
                i.animatingTo = i.currentSlide,
                i.atEnd = 0 === i.currentSlide || i.currentSlide === i.last,
                i.containerSelector = i.vars.selector.substr(0, i.vars.selector.search(" ")),
                i.slides = e(i.vars.selector, i),
                i.container = e(i.containerSelector, i),
                i.count = i.slides.length,
                i.syncExists = e(i.vars.sync).length > 0,
                "slide" === i.vars.animation && (i.vars.animation = "swing"),
                i.prop = d ? "top" : "marginLeft",
                i.args = {},
                i.manualPause = !1,
                i.stopped = !1,
                i.started = !1,
                i.startTimeout = null,
                i.transitions = !i.vars.video && !f && i.vars.useCSS && function() {
                    var e = document.createElement("div")
                      , t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var n in t)
                        if (void 0 !== e.style[t[n]])
                            return i.pfx = t[n].replace("Perspective", "").toLowerCase(),
                            i.prop = "-" + i.pfx + "-transform",
                            !0;
                    return !1
                }(),
                i.ensureAnimationEnd = "",
                "" !== i.vars.controlsContainer && (i.controlsContainer = e(i.vars.controlsContainer).length > 0 && e(i.vars.controlsContainer)),
                "" !== i.vars.manualControls && (i.manualControls = e(i.vars.manualControls).length > 0 && e(i.vars.manualControls)),
                i.vars.randomize && (i.slides.sort(function() {
                    return Math.round(Math.random()) - .5
                }),
                i.container.empty().append(i.slides)),
                i.doMath(),
                i.setup("init"),
                i.vars.controlNav && m.controlNav.setup(),
                i.vars.directionNav && m.directionNav.setup(),
                i.vars.keyboard && (1 === e(i.containerSelector).length || i.vars.multipleKeyboard) && e(document).bind("keyup", function(e) {
                    var t = e.keyCode;
                    if (!i.animating && (39 === t || 37 === t)) {
                        var n = 39 === t ? i.getTarget("next") : 37 === t && i.getTarget("prev");
                        i.flexAnimate(n, i.vars.pauseOnAction)
                    }
                }),
                i.vars.mousewheel && i.bind("mousewheel", function(e, t, n, s) {
                    e.preventDefault();
                    var a = t < 0 ? i.getTarget("next") : i.getTarget("prev");
                    i.flexAnimate(a, i.vars.pauseOnAction)
                }),
                i.vars.pausePlay && m.pausePlay.setup(),
                i.vars.slideshow && i.vars.pauseInvisible && m.pauseInvisible.init(),
                i.vars.slideshow && (i.vars.pauseOnHover && i.hover(function() {
                    i.manualPlay || i.manualPause || i.pause()
                }, function() {
                    i.manualPause || i.manualPlay || i.stopped || i.play()
                }),
                i.vars.pauseInvisible && m.pauseInvisible.isHidden() || (i.vars.initDelay > 0 ? i.startTimeout = setTimeout(i.play, i.vars.initDelay) : i.play())),
                h && m.asNav.setup(),
                r && i.vars.touch && m.touch(),
                (!f || f && i.vars.smoothHeight) && e(window).bind("resize orientationchange focus", m.resize),
                i.find("img").attr("draggable", "false"),
                setTimeout(function() {
                    i.vars.start(i)
                }, 200)
            },
            asNav: {
                setup: function() {
                    i.asNav = !0,
                    i.animatingTo = Math.floor(i.currentSlide / i.move),
                    i.currentItem = i.currentSlide,
                    i.slides.removeClass(a + "active-slide").eq(i.currentItem).addClass(a + "active-slide"),
                    o ? (t._slider = i,
                    i.slides.each(function() {
                        var t = this;
                        t._gesture = new MSGesture,
                        t._gesture.target = t,
                        t.addEventListener("MSPointerDown", function(e) {
                            e.preventDefault(),
                            e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId)
                        }, !1),
                        t.addEventListener("MSGestureTap", function(t) {
                            t.preventDefault();
                            var n = e(this)
                              , s = n.index();
                            e(i.vars.asNavFor).data("flexslider").animating || n.hasClass("active") || (i.direction = i.currentItem < s ? "next" : "prev",
                            i.flexAnimate(s, i.vars.pauseOnAction, !1, !0, !0))
                        })
                    })) : i.slides.on(l, function(t) {
                        t.preventDefault();
                        var n = e(this)
                          , s = n.index();
                        n.offset().left - e(i).scrollLeft() <= 0 && n.hasClass(a + "active-slide") ? i.flexAnimate(i.getTarget("prev"), !0) : e(i.vars.asNavFor).data("flexslider").animating || n.hasClass(a + "active-slide") || (i.direction = i.currentItem < s ? "next" : "prev",
                        i.flexAnimate(s, i.vars.pauseOnAction, !1, !0, !0))
                    })
                }
            },
            controlNav: {
                setup: function() {
                    i.manualControls ? m.controlNav.setupManual() : m.controlNav.setupPaging()
                },
                setupPaging: function() {
                    var t, n, s = "thumbnails" === i.vars.controlNav ? "control-thumbs" : "control-paging", o = 1;
                    if (i.controlNavScaffold = e('<ol class="' + a + "control-nav " + a + s + '"></ol>'),
                    i.pagingCount > 1)
                        for (var r = 0; r < i.pagingCount; r++) {
                            if (n = i.slides.eq(r),
                            t = "thumbnails" === i.vars.controlNav ? '<img src="' + n.attr("data-thumb") + '"/>' : "<a>" + o + "</a>",
                            "thumbnails" === i.vars.controlNav && !0 === i.vars.thumbCaptions) {
                                var d = n.attr("data-thumbcaption");
                                "" != d && void 0 != d && (t += '<span class="' + a + 'caption">' + d + "</span>")
                            }
                            i.controlNavScaffold.append("<li>" + t + "</li>"),
                            o++
                        }
                    i.controlsContainer ? e(i.controlsContainer).append(i.controlNavScaffold) : i.append(i.controlNavScaffold),
                    m.controlNav.set(),
                    m.controlNav.active(),
                    i.controlNavScaffold.delegate("a, img", l, function(t) {
                        if (t.preventDefault(),
                        "" === c || c === t.type) {
                            var n = e(this)
                              , s = i.controlNav.index(n);
                            n.hasClass(a + "active") || (i.direction = s > i.currentSlide ? "next" : "prev",
                            i.flexAnimate(s, i.vars.pauseOnAction))
                        }
                        "" === c && (c = t.type),
                        m.setToClearWatchedEvent()
                    })
                },
                setupManual: function() {
                    i.controlNav = i.manualControls,
                    m.controlNav.active(),
                    i.controlNav.bind(l, function(t) {
                        if (t.preventDefault(),
                        "" === c || c === t.type) {
                            var n = e(this)
                              , s = i.controlNav.index(n);
                            n.hasClass(a + "active") || (s > i.currentSlide ? i.direction = "next" : i.direction = "prev",
                            i.flexAnimate(s, i.vars.pauseOnAction))
                        }
                        "" === c && (c = t.type),
                        m.setToClearWatchedEvent()
                    })
                },
                set: function() {
                    var t = "thumbnails" === i.vars.controlNav ? "img" : "a";
                    i.controlNav = e("." + a + "control-nav li " + t, i.controlsContainer ? i.controlsContainer : i)
                },
                active: function() {
                    i.controlNav.removeClass(a + "active").eq(i.animatingTo).addClass(a + "active")
                },
                update: function(t, n) {
                    i.pagingCount > 1 && "add" === t ? i.controlNavScaffold.append(e("<li><a>" + i.count + "</a></li>")) : 1 === i.pagingCount ? i.controlNavScaffold.find("li").remove() : i.controlNav.eq(n).closest("li").remove(),
                    m.controlNav.set(),
                    i.pagingCount > 1 && i.pagingCount !== i.controlNav.length ? i.update(n, t) : m.controlNav.active()
                }
            },
            directionNav: {
                setup: function() {
                    var t = e('<ul class="' + a + 'direction-nav"><li><a class="' + a + 'prev" href="#">' + i.vars.prevText + '</a></li><li><a class="' + a + 'next" href="#">' + i.vars.nextText + "</a></li></ul>");
                    i.controlsContainer ? (e(i.controlsContainer).append(t),
                    i.directionNav = e("." + a + "direction-nav li a", i.controlsContainer)) : (i.append(t),
                    i.directionNav = e("." + a + "direction-nav li a", i)),
                    m.directionNav.update(),
                    i.directionNav.bind(l, function(t) {
                        t.preventDefault();
                        var n;
                        "" !== c && c !== t.type || (n = e(this).hasClass(a + "next") ? i.getTarget("next") : i.getTarget("prev"),
                        i.flexAnimate(n, i.vars.pauseOnAction)),
                        "" === c && (c = t.type),
                        m.setToClearWatchedEvent()
                    })
                },
                update: function() {
                    var e = a + "disabled";
                    1 === i.pagingCount ? i.directionNav.addClass(e).attr("tabindex", "-1") : i.vars.animationLoop ? i.directionNav.removeClass(e).removeAttr("tabindex") : 0 === i.animatingTo ? i.directionNav.removeClass(e).filter("." + a + "prev").addClass(e).attr("tabindex", "-1") : i.animatingTo === i.last ? i.directionNav.removeClass(e).filter("." + a + "next").addClass(e).attr("tabindex", "-1") : i.directionNav.removeClass(e).removeAttr("tabindex")
                }
            },
            pausePlay: {
                setup: function() {
                    var t = e('<div class="' + a + 'pauseplay"><a></a></div>');
                    i.controlsContainer ? (i.controlsContainer.append(t),
                    i.pausePlay = e("." + a + "pauseplay a", i.controlsContainer)) : (i.append(t),
                    i.pausePlay = e("." + a + "pauseplay a", i)),
                    m.pausePlay.update(i.vars.slideshow ? a + "pause" : a + "play"),
                    i.pausePlay.bind(l, function(t) {
                        t.preventDefault(),
                        "" !== c && c !== t.type || (e(this).hasClass(a + "pause") ? (i.manualPause = !0,
                        i.manualPlay = !1,
                        i.pause()) : (i.manualPause = !1,
                        i.manualPlay = !0,
                        i.play())),
                        "" === c && (c = t.type),
                        m.setToClearWatchedEvent()
                    })
                },
                update: function(e) {
                    "play" === e ? i.pausePlay.removeClass(a + "pause").addClass(a + "play").html(i.vars.playText) : i.pausePlay.removeClass(a + "play").addClass(a + "pause").html(i.vars.pauseText)
                }
            },
            touch: function() {
                function e(e) {
                    i.animating ? e.preventDefault() : (window.navigator.msPointerEnabled || 1 === e.touches.length) && (i.pause(),
                    g = d ? i.h : i.w,
                    x = Number(new Date),
                    w = e.touches[0].pageX,
                    S = e.touches[0].pageY,
                    m = p && u && i.animatingTo === i.last ? 0 : p && u ? i.limit - (i.itemW + i.vars.itemMargin) * i.move * i.animatingTo : p && i.currentSlide === i.last ? i.limit : p ? (i.itemW + i.vars.itemMargin) * i.move * i.currentSlide : u ? (i.last - i.currentSlide + i.cloneOffset) * g : (i.currentSlide + i.cloneOffset) * g,
                    c = d ? S : w,
                    h = d ? w : S,
                    t.addEventListener("touchmove", n, !1),
                    t.addEventListener("touchend", s, !1))
                }
                function n(e) {
                    w = e.touches[0].pageX,
                    S = e.touches[0].pageY,
                    v = d ? c - S : c - w,
                    (!(y = d ? Math.abs(v) < Math.abs(w - h) : Math.abs(v) < Math.abs(S - h)) || Number(new Date) - x > 500) && (e.preventDefault(),
                    !f && i.transitions && (i.vars.animationLoop || (v /= 0 === i.currentSlide && v < 0 || i.currentSlide === i.last && v > 0 ? Math.abs(v) / g + 2 : 1),
                    i.setProps(m + v, "setTouch")))
                }
                function s(e) {
                    if (t.removeEventListener("touchmove", n, !1),
                    i.animatingTo === i.currentSlide && !y && null !== v) {
                        var a = u ? -v : v
                          , o = a > 0 ? i.getTarget("next") : i.getTarget("prev");
                        i.canAdvance(o) && (Number(new Date) - x < 550 && Math.abs(a) > 50 || Math.abs(a) > g / 2) ? i.flexAnimate(o, i.vars.pauseOnAction) : f || i.flexAnimate(i.currentSlide, i.vars.pauseOnAction, !0)
                    }
                    t.removeEventListener("touchend", s, !1),
                    c = null,
                    h = null,
                    v = null,
                    m = null
                }
                function a(e) {
                    e.stopPropagation(),
                    i.animating ? e.preventDefault() : (i.pause(),
                    t._gesture.addPointer(e.pointerId),
                    b = 0,
                    g = d ? i.h : i.w,
                    x = Number(new Date),
                    m = p && u && i.animatingTo === i.last ? 0 : p && u ? i.limit - (i.itemW + i.vars.itemMargin) * i.move * i.animatingTo : p && i.currentSlide === i.last ? i.limit : p ? (i.itemW + i.vars.itemMargin) * i.move * i.currentSlide : u ? (i.last - i.currentSlide + i.cloneOffset) * g : (i.currentSlide + i.cloneOffset) * g)
                }
                function r(e) {
                    e.stopPropagation();
                    var n = e.target._slider;
                    if (n) {
                        var i = -e.translationX
                          , s = -e.translationY;
                        if (b += d ? s : i,
                        v = b,
                        y = d ? Math.abs(b) < Math.abs(-i) : Math.abs(b) < Math.abs(-s),
                        e.detail === e.MSGESTURE_FLAG_INERTIA)
                            return void setImmediate(function() {
                                t._gesture.stop()
                            });
                        (!y || Number(new Date) - x > 500) && (e.preventDefault(),
                        !f && n.transitions && (n.vars.animationLoop || (v = b / (0 === n.currentSlide && b < 0 || n.currentSlide === n.last && b > 0 ? Math.abs(b) / g + 2 : 1)),
                        n.setProps(m + v, "setTouch")))
                    }
                }
                function l(e) {
                    e.stopPropagation();
                    var t = e.target._slider;
                    if (t) {
                        if (t.animatingTo === t.currentSlide && !y && null !== v) {
                            var n = u ? -v : v
                              , i = n > 0 ? t.getTarget("next") : t.getTarget("prev");
                            t.canAdvance(i) && (Number(new Date) - x < 550 && Math.abs(n) > 50 || Math.abs(n) > g / 2) ? t.flexAnimate(i, t.vars.pauseOnAction) : f || t.flexAnimate(t.currentSlide, t.vars.pauseOnAction, !0)
                        }
                        c = null,
                        h = null,
                        v = null,
                        m = null,
                        b = 0
                    }
                }
                var c, h, m, g, v, x, y = !1, w = 0, S = 0, b = 0;
                o ? (t.style.msTouchAction = "none",
                t._gesture = new MSGesture,
                t._gesture.target = t,
                t.addEventListener("MSPointerDown", a, !1),
                t._slider = i,
                t.addEventListener("MSGestureChange", r, !1),
                t.addEventListener("MSGestureEnd", l, !1)) : t.addEventListener("touchstart", e, !1)
            },
            resize: function() {
                !i.animating && i.is(":visible") && (p || i.doMath(),
                f ? m.smoothHeight() : p ? (i.slides.width(i.computedW),
                i.update(i.pagingCount),
                i.setProps()) : d ? (i.viewport.height(i.h),
                i.setProps(i.h, "setTotal")) : (i.vars.smoothHeight && m.smoothHeight(),
                i.newSlides.width(i.computedW),
                i.setProps(i.computedW, "setTotal")))
            },
            smoothHeight: function(e) {
                if (!d || f) {
                    var t = f ? i : i.viewport;
                    e ? t.animate({
                        height: i.slides.eq(i.animatingTo).height()
                    }, e) : t.height(i.slides.eq(i.animatingTo).height())
                }
            },
            sync: function(t) {
                var n = e(i.vars.sync).data("flexslider")
                  , s = i.animatingTo;
                switch (t) {
                case "animate":
                    n.flexAnimate(s, i.vars.pauseOnAction, !1, !0);
                    break;
                case "play":
                    n.playing || n.asNav || n.play();
                    break;
                case "pause":
                    n.pause()
                }
            },
            uniqueID: function(t) {
                return t.find("[id]").each(function() {
                    var t = e(this);
                    t.attr("id", t.attr("id") + "_clone")
                }),
                t
            },
            pauseInvisible: {
                visProp: null,
                init: function() {
                    var e = ["webkit", "moz", "ms", "o"];
                    if ("hidden"in document)
                        return "hidden";
                    for (var t = 0; t < e.length; t++)
                        e[t] + "Hidden"in document && (m.pauseInvisible.visProp = e[t] + "Hidden");
                    if (m.pauseInvisible.visProp) {
                        var n = m.pauseInvisible.visProp.replace(/[H|h]idden/, "") + "visibilitychange";
                        document.addEventListener(n, function() {
                            m.pauseInvisible.isHidden() ? i.startTimeout ? clearTimeout(i.startTimeout) : i.pause() : i.started ? i.play() : i.vars.initDelay > 0 ? setTimeout(i.play, i.vars.initDelay) : i.play()
                        })
                    }
                },
                isHidden: function() {
                    return document[m.pauseInvisible.visProp] || !1
                }
            },
            setToClearWatchedEvent: function() {
                clearTimeout(s),
                s = setTimeout(function() {
                    c = ""
                }, 3e3)
            }
        },
        i.flexAnimate = function(t, n, s, o, l) {
            if (i.vars.animationLoop || t === i.currentSlide || (i.direction = t > i.currentSlide ? "next" : "prev"),
            h && 1 === i.pagingCount && (i.direction = i.currentItem < t ? "next" : "prev"),
            !i.animating && (i.canAdvance(t, l) || s) && i.is(":visible")) {
                if (h && o) {
                    var c = e(i.vars.asNavFor).data("flexslider");
                    if (i.atEnd = 0 === t || t === i.count - 1,
                    c.flexAnimate(t, !0, !1, !0, l),
                    i.direction = i.currentItem < t ? "next" : "prev",
                    c.direction = i.direction,
                    Math.ceil((t + 1) / i.visible) - 1 === i.currentSlide || 0 === t)
                        return i.currentItem = t,
                        i.slides.removeClass(a + "active-slide").eq(t).addClass(a + "active-slide"),
                        !1;
                    i.currentItem = t,
                    i.slides.removeClass(a + "active-slide").eq(t).addClass(a + "active-slide"),
                    t = Math.floor(t / i.visible)
                }
                if (i.animating = !0,
                i.animatingTo = t,
                n && i.pause(),
                i.vars.before(i),
                i.syncExists && !l && m.sync("animate"),
                i.vars.controlNav && m.controlNav.active(),
                p || i.slides.removeClass(a + "active-slide").eq(t).addClass(a + "active-slide"),
                i.atEnd = 0 === t || t === i.last,
                i.vars.directionNav && m.directionNav.update(),
                t === i.last && (i.vars.end(i),
                i.vars.animationLoop || i.pause()),
                f)
                    r ? (i.slides.eq(i.currentSlide).css({
                        opacity: 0,
                        zIndex: 1
                    }),
                    i.slides.eq(t).css({
                        opacity: 1,
                        zIndex: 2
                    }),
                    i.wrapup(y)) : (i.slides.eq(i.currentSlide).css({
                        zIndex: 1
                    }).animate({
                        opacity: 0
                    }, i.vars.animationSpeed, i.vars.easing),
                    i.slides.eq(t).css({
                        zIndex: 2
                    }).animate({
                        opacity: 1
                    }, i.vars.animationSpeed, i.vars.easing, i.wrapup));
                else {
                    var g, v, x, y = d ? i.slides.filter(":first").height() : i.computedW;
                    p ? (g = i.vars.itemMargin,
                    x = (i.itemW + g) * i.move * i.animatingTo,
                    v = x > i.limit && 1 !== i.visible ? i.limit : x) : v = 0 === i.currentSlide && t === i.count - 1 && i.vars.animationLoop && "next" !== i.direction ? u ? (i.count + i.cloneOffset) * y : 0 : i.currentSlide === i.last && 0 === t && i.vars.animationLoop && "prev" !== i.direction ? u ? 0 : (i.count + 1) * y : u ? (i.count - 1 - t + i.cloneOffset) * y : (t + i.cloneOffset) * y,
                    i.setProps(v, "", i.vars.animationSpeed),
                    i.transitions ? (i.vars.animationLoop && i.atEnd || (i.animating = !1,
                    i.currentSlide = i.animatingTo),
                    i.container.unbind("webkitTransitionEnd transitionend"),
                    i.container.bind("webkitTransitionEnd transitionend", function() {
                        clearTimeout(i.ensureAnimationEnd),
                        i.wrapup(y)
                    }),
                    clearTimeout(i.ensureAnimationEnd),
                    i.ensureAnimationEnd = setTimeout(function() {
                        i.wrapup(y)
                    }, i.vars.animationSpeed + 100)) : i.container.animate(i.args, i.vars.animationSpeed, i.vars.easing, function() {
                        i.wrapup(y)
                    })
                }
                i.vars.smoothHeight && m.smoothHeight(i.vars.animationSpeed)
            }
        }
        ,
        i.wrapup = function(e) {
            f || p || (0 === i.currentSlide && i.animatingTo === i.last && i.vars.animationLoop ? i.setProps(e, "jumpEnd") : i.currentSlide === i.last && 0 === i.animatingTo && i.vars.animationLoop && i.setProps(e, "jumpStart")),
            i.animating = !1,
            i.currentSlide = i.animatingTo,
            i.vars.after(i)
        }
        ,
        i.animateSlides = function() {
            i.animating || i.flexAnimate(i.getTarget("next"))
        }
        ,
        i.pause = function() {
            clearInterval(i.animatedSlides),
            i.animatedSlides = null,
            i.playing = !1,
            i.vars.pausePlay && m.pausePlay.update("play"),
            i.syncExists && m.sync("pause")
        }
        ,
        i.play = function() {
            i.playing && clearInterval(i.animatedSlides),
            i.animatedSlides = i.animatedSlides || setInterval(i.animateSlides, i.vars.slideshowSpeed),
            i.started = i.playing = !0,
            i.vars.pausePlay && m.pausePlay.update("pause"),
            i.syncExists && m.sync("play")
        }
        ,
        i.stop = function() {
            i.pause(),
            i.stopped = !0
        }
        ,
        i.canAdvance = function(e, t) {
            var n = h ? i.pagingCount - 1 : i.last;
            return !(!t && (!h || i.currentItem !== i.count - 1 || 0 !== e || "prev" !== i.direction) && (h && 0 === i.currentItem && e === i.pagingCount - 1 && "next" !== i.direction || e === i.currentSlide && !h || !i.vars.animationLoop && (i.atEnd && 0 === i.currentSlide && e === n && "next" !== i.direction || i.atEnd && i.currentSlide === n && 0 === e && "next" === i.direction)))
        }
        ,
        i.getTarget = function(e) {
            return i.direction = e,
            "next" === e ? i.currentSlide === i.last ? 0 : i.currentSlide + 1 : 0 === i.currentSlide ? i.last : i.currentSlide - 1
        }
        ,
        i.setProps = function(e, t, n) {
            var s = function() {
                var n = e || (i.itemW + i.vars.itemMargin) * i.move * i.animatingTo;
                return -1 * function() {
                    if (p)
                        return "setTouch" === t ? e : u && i.animatingTo === i.last ? 0 : u ? i.limit - (i.itemW + i.vars.itemMargin) * i.move * i.animatingTo : i.animatingTo === i.last ? i.limit : n;
                    switch (t) {
                    case "setTotal":
                        return u ? (i.count - 1 - i.currentSlide + i.cloneOffset) * e : (i.currentSlide + i.cloneOffset) * e;
                    case "setTouch":
                        return e;
                    case "jumpEnd":
                        return u ? e : i.count * e;
                    case "jumpStart":
                        return u ? i.count * e : e;
                    default:
                        return e
                    }
                }() + "px"
            }();
            i.transitions && (s = d ? "translate3d(0," + s + ",0)" : "translate3d(" + s + ",0,0)",
            n = void 0 !== n ? n / 1e3 + "s" : "0s",
            i.container.css("-" + i.pfx + "-transition-duration", n),
            i.container.css("transition-duration", n)),
            i.args[i.prop] = s,
            (i.transitions || void 0 === n) && i.container.css(i.args),
            i.container.css("transform", s)
        }
        ,
        i.setup = function(t) {
            if (f)
                i.slides.css({
                    width: "100%",
                    float: "left",
                    marginRight: "-100%",
                    position: "relative"
                }),
                "init" === t && (r ? i.slides.css({
                    opacity: 0,
                    display: "block",
                    webkitTransition: "opacity " + i.vars.animationSpeed / 1e3 + "s ease",
                    zIndex: 1
                }).eq(i.currentSlide).css({
                    opacity: 1,
                    zIndex: 2
                }) : 0 == i.vars.fadeFirstSlide ? i.slides.css({
                    opacity: 0,
                    display: "block",
                    zIndex: 1
                }).eq(i.currentSlide).css({
                    zIndex: 2
                }).css({
                    opacity: 1
                }) : i.slides.css({
                    opacity: 0,
                    display: "block",
                    zIndex: 1
                }).eq(i.currentSlide).css({
                    zIndex: 2
                }).animate({
                    opacity: 1
                }, i.vars.animationSpeed, i.vars.easing)),
                i.vars.smoothHeight && m.smoothHeight();
            else {
                var n, s;
                "init" === t && (i.viewport = e('<div class="' + a + 'viewport"></div>').css({
                    overflow: "hidden",
                    position: "relative"
                }).appendTo(i).append(i.container),
                i.cloneCount = 0,
                i.cloneOffset = 0,
                u && (s = e.makeArray(i.slides).reverse(),
                i.slides = e(s),
                i.container.empty().append(i.slides))),
                i.vars.animationLoop && !p && (i.cloneCount = 2,
                i.cloneOffset = 1,
                "init" !== t && i.container.find(".clone").remove(),
                m.uniqueID(i.slides.first().clone().addClass("clone").attr("aria-hidden", "true")).appendTo(i.container),
                m.uniqueID(i.slides.last().clone().addClass("clone").attr("aria-hidden", "true")).prependTo(i.container)),
                i.newSlides = e(i.vars.selector, i),
                n = u ? i.count - 1 - i.currentSlide + i.cloneOffset : i.currentSlide + i.cloneOffset,
                d && !p ? (i.container.height(200 * (i.count + i.cloneCount) + "%").css("position", "absolute").width("100%"),
                setTimeout(function() {
                    i.newSlides.css({
                        display: "block"
                    }),
                    i.doMath(),
                    i.viewport.height(i.h),
                    i.setProps(n * i.h, "init")
                }, "init" === t ? 100 : 0)) : (i.container.width(200 * (i.count + i.cloneCount) + "%"),
                i.setProps(n * i.computedW, "init"),
                setTimeout(function() {
                    i.doMath(),
                    i.newSlides.css({
                        width: i.computedW,
                        float: "left",
                        display: "block"
                    }),
                    i.vars.smoothHeight && m.smoothHeight()
                }, "init" === t ? 100 : 0))
            }
            p || i.slides.removeClass(a + "active-slide").eq(i.currentSlide).addClass(a + "active-slide"),
            i.vars.init(i)
        }
        ,
        i.doMath = function() {
            var e = i.slides.first()
              , t = i.vars.itemMargin
              , n = i.vars.minItems
              , s = i.vars.maxItems;
            i.w = void 0 === i.viewport ? i.width() : i.viewport.width(),
            i.h = e.height(),
            i.boxPadding = e.outerWidth() - e.width(),
            p ? (i.itemT = i.vars.itemWidth + t,
            i.minW = n ? n * i.itemT : i.w,
            i.maxW = s ? s * i.itemT - t : i.w,
            i.itemW = i.minW > i.w ? (i.w - t * (n - 1)) / n : i.maxW < i.w ? (i.w - t * (s - 1)) / s : i.vars.itemWidth > i.w ? i.w : i.vars.itemWidth,
            i.visible = Math.floor(i.w / i.itemW),
            i.move = i.vars.move > 0 && i.vars.move < i.visible ? i.vars.move : i.visible,
            i.pagingCount = Math.ceil((i.count - i.visible) / i.move + 1),
            i.last = i.pagingCount - 1,
            i.limit = 1 === i.pagingCount ? 0 : i.vars.itemWidth > i.w ? i.itemW * (i.count - 1) + t * (i.count - 1) : (i.itemW + t) * i.count - i.w - t) : (i.itemW = i.w,
            i.pagingCount = i.count,
            i.last = i.count - 1),
            i.computedW = i.itemW - i.boxPadding
        }
        ,
        i.update = function(e, t) {
            i.doMath(),
            p || (e < i.currentSlide ? i.currentSlide += 1 : e <= i.currentSlide && 0 !== e && (i.currentSlide -= 1),
            i.animatingTo = i.currentSlide),
            i.vars.controlNav && !i.manualControls && ("add" === t && !p || i.pagingCount > i.controlNav.length ? m.controlNav.update("add") : ("remove" === t && !p || i.pagingCount < i.controlNav.length) && (p && i.currentSlide > i.last && (i.currentSlide -= 1,
            i.animatingTo -= 1),
            m.controlNav.update("remove", i.last))),
            i.vars.directionNav && m.directionNav.update()
        }
        ,
        i.addSlide = function(t, n) {
            var s = e(t);
            i.count += 1,
            i.last = i.count - 1,
            d && u ? void 0 !== n ? i.slides.eq(i.count - n).after(s) : i.container.prepend(s) : void 0 !== n ? i.slides.eq(n).before(s) : i.container.append(s),
            i.update(n, "add"),
            i.slides = e(i.vars.selector + ":not(.clone)", i),
            i.setup(),
            i.vars.added(i)
        }
        ,
        i.removeSlide = function(t) {
            var n = isNaN(t) ? i.slides.index(e(t)) : t;
            i.count -= 1,
            i.last = i.count - 1,
            isNaN(t) ? e(t, i.slides).remove() : d && u ? i.slides.eq(i.last).remove() : i.slides.eq(t).remove(),
            i.doMath(),
            i.update(n, "remove"),
            i.slides = e(i.vars.selector + ":not(.clone)", i),
            i.setup(),
            i.vars.removed(i)
        }
        ,
        m.init()
    }
    ,
    e(window).blur(function(e) {
        focused = !1
    }).focus(function(e) {
        focused = !0
    }),
    e.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7e3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        fadeFirstSlide: !0,
        thumbCaptions: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        pauseInvisible: !0,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "Previous",
        nextText: "Next",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: !0,
        start: function() {},
        before: function() {},
        after: function() {},
        end: function() {},
        added: function() {},
        removed: function() {},
        init: function() {}
    },
    e.fn.flexslider = function(t) {
        if (void 0 === t && (t = {}),
        "object" == typeof t)
            return this.each(function() {
                var n = e(this)
                  , i = t.selector ? t.selector : ".slides > li"
                  , s = n.find(i);
                1 === s.length && !0 === t.allowOneSlide || 0 === s.length ? (s.fadeIn(400),
                t.start && t.start(n)) : void 0 === n.data("flexslider") && new e.flexslider(this,t)
            });
        var n = e(this).data("flexslider");
        switch (t) {
        case "play":
            n.play();
            break;
        case "pause":
            n.pause();
            break;
        case "stop":
            n.stop();
            break;
        case "next":
            n.flexAnimate(n.getTarget("next"), !0);
            break;
        case "prev":
        case "previous":
            n.flexAnimate(n.getTarget("prev"), !0);
            break;
        default:
            "number" == typeof t && n.flexAnimate(t, !0)
        }
    }
}(jQuery),
function(e) {
    var t = {}
      , n = {
        mode: "horizontal",
        slideSelector: "",
        infiniteLoop: !0,
        hideControlOnEnd: !1,
        speed: 500,
        easing: null,
        slideMargin: 0,
        startSlide: 0,
        randomStart: !1,
        captions: !1,
        ticker: !1,
        tickerHover: !1,
        adaptiveHeight: !1,
        adaptiveHeightSpeed: 500,
        video: !1,
        useCSS: !0,
        preloadImages: "visible",
        responsive: !0,
        slideZIndex: 50,
        touchEnabled: !0,
        swipeThreshold: 50,
        oneToOneTouch: !0,
        preventDefaultSwipeX: !0,
        preventDefaultSwipeY: !1,
        pager: !0,
        pagerType: "full",
        pagerShortSeparator: " / ",
        pagerSelector: null,
        buildPager: null,
        pagerCustom: null,
        controls: !0,
        nextText: "Next",
        prevText: "Prev",
        nextSelector: null,
        prevSelector: null,
        autoControls: !1,
        startText: "Start",
        stopText: "Stop",
        autoControlsCombine: !1,
        autoControlsSelector: null,
        auto: !1,
        pause: 4e3,
        autoStart: !0,
        autoDirection: "next",
        autoHover: !1,
        autoDelay: 0,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 0,
        slideWidth: 0,
        onSliderLoad: function() {},
        onSlideBefore: function() {},
        onSlideAfter: function() {},
        onSlideNext: function() {},
        onSlidePrev: function() {},
        onSliderResize: function() {}
    };
    e.fn.bxSlider = function(s) {
        if (0 == this.length)
            return this;
        if (this.length > 1)
            return this.each(function() {
                e(this).bxSlider(s)
            }),
            this;
        var a = {}
          , o = this;
        t.el = this;
        var r = e(window).width()
          , l = e(window).height()
          , c = function() {
            a.settings = e.extend({}, n, s),
            a.settings.slideWidth = parseInt(a.settings.slideWidth),
            a.children = o.children(a.settings.slideSelector),
            a.children.length < a.settings.minSlides && (a.settings.minSlides = a.children.length),
            a.children.length < a.settings.maxSlides && (a.settings.maxSlides = a.children.length),
            a.settings.randomStart && (a.settings.startSlide = Math.floor(Math.random() * a.children.length)),
            a.active = {
                index: a.settings.startSlide
            },
            a.carousel = a.settings.minSlides > 1 || a.settings.maxSlides > 1,
            a.carousel && (a.settings.preloadImages = "all"),
            a.minThreshold = a.settings.minSlides * a.settings.slideWidth + (a.settings.minSlides - 1) * a.settings.slideMargin,
            a.maxThreshold = a.settings.maxSlides * a.settings.slideWidth + (a.settings.maxSlides - 1) * a.settings.slideMargin,
            a.working = !1,
            a.controls = {},
            a.interval = null,
            a.animProp = "vertical" == a.settings.mode ? "top" : "left",
            a.usingCSS = a.settings.useCSS && "fade" != a.settings.mode && function() {
                var e = document.createElement("div")
                  , t = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                for (var n in t)
                    if (void 0 !== e.style[t[n]])
                        return a.cssPrefix = t[n].replace("Perspective", "").toLowerCase(),
                        a.animProp = "-" + a.cssPrefix + "-transform",
                        !0;
                return !1
            }(),
            "vertical" == a.settings.mode && (a.settings.maxSlides = a.settings.minSlides),
            o.data("origStyle", o.attr("style")),
            o.children(a.settings.slideSelector).each(function() {
                e(this).data("origStyle", e(this).attr("style"))
            }),
            d()
        }
          , d = function() {
            o.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'),
            a.viewport = o.parent(),
            a.loader = e('<div class="bx-loading" />'),
            a.viewport.prepend(a.loader),
            o.css({
                width: "horizontal" == a.settings.mode ? 100 * a.children.length + 215 + "%" : "auto",
                position: "relative"
            }),
            a.usingCSS && a.settings.easing ? o.css("-" + a.cssPrefix + "-transition-timing-function", a.settings.easing) : a.settings.easing || (a.settings.easing = "swing"),
            g(),
            a.viewport.css({
                width: "100%",
                overflow: "hidden",
                position: "relative"
            }),
            a.viewport.parent().css({
                maxWidth: h()
            }),
            a.settings.pager || a.viewport.parent().css({
                margin: "0 auto 0px"
            }),
            a.children.css({
                float: "horizontal" == a.settings.mode ? "left" : "none",
                listStyle: "none",
                position: "relative"
            }),
            a.children.css("width", m()),
            "horizontal" == a.settings.mode && a.settings.slideMargin > 0 && a.children.css("marginRight", a.settings.slideMargin),
            "vertical" == a.settings.mode && a.settings.slideMargin > 0 && a.children.css("marginBottom", a.settings.slideMargin),
            "fade" == a.settings.mode && (a.children.css({
                position: "absolute",
                zIndex: 0,
                display: "none"
            }),
            a.children.eq(a.settings.startSlide).css({
                zIndex: a.settings.slideZIndex,
                display: "block"
            })),
            a.controls.el = e('<div class="bx-controls" />'),
            a.settings.captions && I(),
            a.active.last = a.settings.startSlide == v() - 1,
            a.settings.video && o.fitVids();
            var t = a.children.eq(a.settings.startSlide);
            "all" == a.settings.preloadImages && (t = a.children),
            a.settings.ticker ? a.settings.pager = !1 : (a.settings.pager && b(),
            a.settings.controls && C(),
            a.settings.auto && a.settings.autoControls && T(),
            (a.settings.controls || a.settings.autoControls || a.settings.pager) && a.viewport.after(a.controls.el)),
            u(t, p)
        }
          , u = function(t, n) {
            var i = t.find("img, iframe").length;
            if (0 == i)
                return void n();
            var s = 0;
            t.find("img, iframe").each(function() {
                e(this).one("load", function() {
                    ++s == i && n()
                }).each(function() {
                    this.complete && e(this).load()
                })
            })
        }
          , p = function() {
            if (a.settings.infiniteLoop && "fade" != a.settings.mode && !a.settings.ticker) {
                var t = "vertical" == a.settings.mode ? a.settings.minSlides : a.settings.maxSlides
                  , n = a.children.slice(0, t).clone().addClass("bx-clone")
                  , i = a.children.slice(-t).clone().addClass("bx-clone");
                o.append(n).prepend(i)
            }
            a.loader.remove(),
            y(),
            "vertical" == a.settings.mode && (a.settings.adaptiveHeight = !0),
            a.viewport.height(f()),
            o.redrawSlider(),
            a.settings.onSliderLoad(a.active.index),
            a.initialized = !0,
            a.settings.responsive && e(window).bind("resize", R),
            a.settings.auto && a.settings.autoStart && H(),
            a.settings.ticker && z(),
            a.settings.pager && N(a.settings.startSlide),
            a.settings.controls && W(),
            a.settings.touchEnabled && !a.settings.ticker && D()
        }
          , f = function() {
            var t = 0
              , n = e();
            if ("vertical" == a.settings.mode || a.settings.adaptiveHeight)
                if (a.carousel) {
                    var s = 1 == a.settings.moveSlides ? a.active.index : a.active.index * x();
                    for (n = a.children.eq(s),
                    i = 1; i <= a.settings.maxSlides - 1; i++)
                        n = s + i >= a.children.length ? n.add(a.children.eq(i - 1)) : n.add(a.children.eq(s + i))
                } else
                    n = a.children.eq(a.active.index);
            else
                n = a.children;
            return "vertical" == a.settings.mode ? (n.each(function() {
                t += e(this).outerHeight()
            }),
            a.settings.slideMargin > 0 && (t += a.settings.slideMargin * (a.settings.minSlides - 1))) : t = Math.max.apply(Math, n.map(function() {
                return e(this).outerHeight(!1)
            }).get()),
            t
        }
          , h = function() {
            var e = "100%";
            return a.settings.slideWidth > 0 && (e = "horizontal" == a.settings.mode ? a.settings.maxSlides * a.settings.slideWidth + (a.settings.maxSlides - 1) * a.settings.slideMargin : a.settings.slideWidth),
            e
        }
          , m = function() {
            var e = a.settings.slideWidth
              , t = a.viewport.width();
            return 0 == a.settings.slideWidth || a.settings.slideWidth > t && !a.carousel || "vertical" == a.settings.mode ? e = t : a.settings.maxSlides > 1 && "horizontal" == a.settings.mode && (t > a.maxThreshold || t < a.minThreshold && (e = (t - a.settings.slideMargin * (a.settings.minSlides - 1)) / a.settings.minSlides)),
            e
        }
          , g = function() {
            var e = 1;
            if ("horizontal" == a.settings.mode && a.settings.slideWidth > 0)
                if (a.viewport.width() < a.minThreshold)
                    e = a.settings.minSlides;
                else if (a.viewport.width() > a.maxThreshold)
                    e = a.settings.maxSlides;
                else {
                    var t = a.children.first().width();
                    e = Math.floor(a.viewport.width() / t)
                }
            else
                "vertical" == a.settings.mode && (e = a.settings.minSlides);
            return e
        }
          , v = function() {
            var e = 0;
            if (a.settings.moveSlides > 0)
                if (a.settings.infiniteLoop)
                    e = a.children.length / x();
                else
                    for (var t = 0, n = 0; t < a.children.length; )
                        ++e,
                        t = n + g(),
                        n += a.settings.moveSlides <= g() ? a.settings.moveSlides : g();
            else
                e = Math.ceil(a.children.length / g());
            return e
        }
          , x = function() {
            return a.settings.moveSlides > 0 && a.settings.moveSlides <= g() ? a.settings.moveSlides : g()
        }
          , y = function() {
            if (a.children.length > a.settings.maxSlides && a.active.last && !a.settings.infiniteLoop) {
                if ("horizontal" == a.settings.mode) {
                    var e = a.children.last()
                      , t = e.position();
                    w(-(t.left - (a.viewport.width() - e.width())), "reset", 0)
                } else if ("vertical" == a.settings.mode) {
                    var n = a.children.length - a.settings.minSlides
                      , t = a.children.eq(n).position();
                    w(-t.top, "reset", 0)
                }
            } else {
                var t = a.children.eq(a.active.index * x()).position();
                a.active.index == v() - 1 && (a.active.last = !0),
                void 0 != t && ("horizontal" == a.settings.mode ? w(-t.left, "reset", 0) : "vertical" == a.settings.mode && w(-t.top, "reset", 0))
            }
        }
          , w = function(e, t, n, i) {
            if (a.usingCSS) {
                var s = "vertical" == a.settings.mode ? "translate3d(0, " + e + "px, 0)" : "translate3d(" + e + "px, 0, 0)";
                o.css("-" + a.cssPrefix + "-transition-duration", n / 1e3 + "s"),
                "slide" == t ? (o.css(a.animProp, s),
                o.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                    o.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),
                    B()
                })) : "reset" == t ? o.css(a.animProp, s) : "ticker" == t && (o.css("-" + a.cssPrefix + "-transition-timing-function", "linear"),
                o.css(a.animProp, s),
                o.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                    o.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),
                    w(i.resetValue, "reset", 0),
                    L()
                }))
            } else {
                var r = {};
                r[a.animProp] = e,
                "slide" == t ? o.animate(r, n, a.settings.easing, function() {
                    B()
                }) : "reset" == t ? o.css(a.animProp, e) : "ticker" == t && o.animate(r, speed, "linear", function() {
                    w(i.resetValue, "reset", 0),
                    L()
                })
            }
        }
          , S = function() {
            for (var t = "", n = v(), i = 0; n > i; i++) {
                var s = "";
                a.settings.buildPager && e.isFunction(a.settings.buildPager) ? (s = a.settings.buildPager(i),
                a.pagerEl.addClass("bx-custom-pager")) : (s = i + 1,
                a.pagerEl.addClass("bx-default-pager")),
                t += '<div class="bx-pager-item"><a href="" data-slide-index="' + i + '" class="bx-pager-link">' + s + "</a></div>"
            }
            a.pagerEl.html(t)
        }
          , b = function() {
            a.settings.pagerCustom ? a.pagerEl = e(a.settings.pagerCustom) : (a.pagerEl = e('<div class="bx-pager" />'),
            a.settings.pagerSelector ? e(a.settings.pagerSelector).html(a.pagerEl) : a.controls.el.addClass("bx-has-pager").append(a.pagerEl),
            S()),
            a.pagerEl.on("click", "a", O)
        }
          , C = function() {
            a.controls.next = e('<a class="bx-next" href="">' + a.settings.nextText + "</a>"),
            a.controls.prev = e('<a class="bx-prev" href="">' + a.settings.prevText + "</a>"),
            a.controls.next.bind("click", k),
            a.controls.prev.bind("click", P),
            a.settings.nextSelector && e(a.settings.nextSelector).append(a.controls.next),
            a.settings.prevSelector && e(a.settings.prevSelector).append(a.controls.prev),
            a.settings.nextSelector || a.settings.prevSelector || (a.controls.directionEl = e('<div class="bx-controls-direction" />'),
            a.controls.directionEl.append(a.controls.prev).append(a.controls.next),
            a.controls.el.addClass("bx-has-controls-direction").append(a.controls.directionEl))
        }
          , T = function() {
            a.controls.start = e('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + a.settings.startText + "</a></div>"),
            a.controls.stop = e('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + a.settings.stopText + "</a></div>"),
            a.controls.autoEl = e('<div class="bx-controls-auto" />'),
            a.controls.autoEl.on("click", ".bx-start", A),
            a.controls.autoEl.on("click", ".bx-stop", E),
            a.settings.autoControlsCombine ? a.controls.autoEl.append(a.controls.start) : a.controls.autoEl.append(a.controls.start).append(a.controls.stop),
            a.settings.autoControlsSelector ? e(a.settings.autoControlsSelector).html(a.controls.autoEl) : a.controls.el.addClass("bx-has-controls-auto").append(a.controls.autoEl),
            M(a.settings.autoStart ? "stop" : "start")
        }
          , I = function() {
            a.children.each(function() {
                var t = e(this).find("img:first").attr("title");
                void 0 != t && ("" + t).length && e(this).append('<div class="bx-caption"><span>' + t + "</span></div>")
            })
        }
          , k = function(e) {
            a.settings.auto && o.stopAuto(),
            o.goToNextSlide(),
            e.preventDefault()
        }
          , P = function(e) {
            a.settings.auto && o.stopAuto(),
            o.goToPrevSlide(),
            e.preventDefault()
        }
          , A = function(e) {
            o.startAuto(),
            e.preventDefault()
        }
          , E = function(e) {
            o.stopAuto(),
            e.preventDefault()
        }
          , O = function(t) {
            a.settings.auto && o.stopAuto();
            var n = e(t.currentTarget)
              , i = parseInt(n.attr("data-slide-index"));
            i != a.active.index && o.goToSlide(i),
            t.preventDefault()
        }
          , N = function(t) {
            var n = a.children.length;
            return "short" == a.settings.pagerType ? (a.settings.maxSlides > 1 && (n = Math.ceil(a.children.length / a.settings.maxSlides)),
            void a.pagerEl.html(t + 1 + a.settings.pagerShortSeparator + n)) : (a.pagerEl.find("a").removeClass("active"),
            void a.pagerEl.each(function(n, i) {
                e(i).find("a").eq(t).addClass("active")
            }))
        }
          , B = function() {
            if (a.settings.infiniteLoop) {
                var e = "";
                0 == a.active.index ? e = a.children.eq(0).position() : a.active.index == v() - 1 && a.carousel ? e = a.children.eq((v() - 1) * x()).position() : a.active.index == a.children.length - 1 && (e = a.children.eq(a.children.length - 1).position()),
                e && ("horizontal" == a.settings.mode ? w(-e.left, "reset", 0) : "vertical" == a.settings.mode && w(-e.top, "reset", 0))
            }
            a.working = !1,
            a.settings.onSlideAfter(a.children.eq(a.active.index), a.oldIndex, a.active.index)
        }
          , M = function(e) {
            a.settings.autoControlsCombine ? a.controls.autoEl.html(a.controls[e]) : (a.controls.autoEl.find("a").removeClass("active"),
            a.controls.autoEl.find("a:not(.bx-" + e + ")").addClass("active"))
        }
          , W = function() {
            1 == v() ? (a.controls.prev.addClass("disabled"),
            a.controls.next.addClass("disabled")) : !a.settings.infiniteLoop && a.settings.hideControlOnEnd && (0 == a.active.index ? (a.controls.prev.addClass("disabled"),
            a.controls.next.removeClass("disabled")) : a.active.index == v() - 1 ? (a.controls.next.addClass("disabled"),
            a.controls.prev.removeClass("disabled")) : (a.controls.prev.removeClass("disabled"),
            a.controls.next.removeClass("disabled")))
        }
          , H = function() {
            a.settings.autoDelay > 0 ? setTimeout(o.startAuto, a.settings.autoDelay) : o.startAuto(),
            a.settings.autoHover && o.hover(function() {
                a.interval && (o.stopAuto(!0),
                a.autoPaused = !0)
            }, function() {
                a.autoPaused && (o.startAuto(!0),
                a.autoPaused = null)
            })
        }
          , z = function() {
            var t = 0;
            if ("next" == a.settings.autoDirection)
                o.append(a.children.clone().addClass("bx-clone"));
            else {
                o.prepend(a.children.clone().addClass("bx-clone"));
                var n = a.children.first().position();
                t = "horizontal" == a.settings.mode ? -n.left : -n.top
            }
            w(t, "reset", 0),
            a.settings.pager = !1,
            a.settings.controls = !1,
            a.settings.autoControls = !1,
            a.settings.tickerHover && !a.usingCSS && a.viewport.hover(function() {
                o.stop()
            }, function() {
                var t = 0;
                a.children.each(function() {
                    t += "horizontal" == a.settings.mode ? e(this).outerWidth(!0) : e(this).outerHeight(!0)
                });
                var n = a.settings.speed / t
                  , i = "horizontal" == a.settings.mode ? "left" : "top"
                  , s = n * (t - Math.abs(parseInt(o.css(i))));
                L(s)
            }),
            L()
        }
          , L = function(e) {
            speed = e || a.settings.speed;
            var t = {
                left: 0,
                top: 0
            }
              , n = {
                left: 0,
                top: 0
            };
            "next" == a.settings.autoDirection ? t = o.find(".bx-clone").first().position() : n = a.children.first().position();
            var i = "horizontal" == a.settings.mode ? -t.left : -t.top
              , s = "horizontal" == a.settings.mode ? -n.left : -n.top
              , r = {
                resetValue: s
            };
            w(i, "ticker", speed, r)
        }
          , D = function() {
            a.touch = {
                start: {
                    x: 0,
                    y: 0
                },
                end: {
                    x: 0,
                    y: 0
                }
            },
            a.viewport.bind("touchstart", F)
        }
          , F = function(e) {
            if (a.working)
                e.preventDefault();
            else {
                a.touch.originalPos = o.position();
                var t = e.originalEvent;
                a.touch.start.x = t.changedTouches[0].pageX,
                a.touch.start.y = t.changedTouches[0].pageY,
                a.viewport.bind("touchmove", _),
                a.viewport.bind("touchend", q)
            }
        }
          , _ = function(e) {
            var t = e.originalEvent
              , n = Math.abs(t.changedTouches[0].pageX - a.touch.start.x)
              , i = Math.abs(t.changedTouches[0].pageY - a.touch.start.y);
            if (3 * n > i && a.settings.preventDefaultSwipeX ? e.preventDefault() : 3 * i > n && a.settings.preventDefaultSwipeY && e.preventDefault(),
            "fade" != a.settings.mode && a.settings.oneToOneTouch) {
                var s = 0;
                if ("horizontal" == a.settings.mode) {
                    var o = t.changedTouches[0].pageX - a.touch.start.x;
                    s = a.touch.originalPos.left + o
                } else {
                    var o = t.changedTouches[0].pageY - a.touch.start.y;
                    s = a.touch.originalPos.top + o
                }
                w(s, "reset", 0)
            }
        }
          , q = function(e) {
            a.viewport.unbind("touchmove", _);
            var t = e.originalEvent
              , n = 0;
            if (a.touch.end.x = t.changedTouches[0].pageX,
            a.touch.end.y = t.changedTouches[0].pageY,
            "fade" == a.settings.mode) {
                var i = Math.abs(a.touch.start.x - a.touch.end.x);
                i >= a.settings.swipeThreshold && (a.touch.start.x > a.touch.end.x ? o.goToNextSlide() : o.goToPrevSlide(),
                o.stopAuto())
            } else {
                var i = 0;
                "horizontal" == a.settings.mode ? (i = a.touch.end.x - a.touch.start.x,
                n = a.touch.originalPos.left) : (i = a.touch.end.y - a.touch.start.y,
                n = a.touch.originalPos.top),
                !a.settings.infiniteLoop && (0 == a.active.index && i > 0 || a.active.last && 0 > i) ? w(n, "reset", 200) : Math.abs(i) >= a.settings.swipeThreshold ? (0 > i ? o.goToNextSlide() : o.goToPrevSlide(),
                o.stopAuto()) : w(n, "reset", 200)
            }
            a.viewport.unbind("touchend", q)
        }
          , R = function() {
            var t = e(window).width()
              , n = e(window).height();
            (r != t || l != n) && (r = t,
            l = n,
            o.redrawSlider(),
            a.settings.onSliderResize.call(o, a.active.index))
        };
        return o.goToSlide = function(t, n) {
            if (!a.working && a.active.index != t)
                if (a.working = !0,
                a.oldIndex = a.active.index,
                a.active.index = 0 > t ? v() - 1 : t >= v() ? 0 : t,
                a.settings.onSlideBefore(a.children.eq(a.active.index), a.oldIndex, a.active.index),
                "next" == n ? a.settings.onSlideNext(a.children.eq(a.active.index), a.oldIndex, a.active.index) : "prev" == n && a.settings.onSlidePrev(a.children.eq(a.active.index), a.oldIndex, a.active.index),
                a.active.last = a.active.index >= v() - 1,
                a.settings.pager && N(a.active.index),
                a.settings.controls && W(),
                "fade" == a.settings.mode)
                    a.settings.adaptiveHeight && a.viewport.height() != f() && a.viewport.animate({
                        height: f()
                    }, a.settings.adaptiveHeightSpeed),
                    a.children.filter(":visible").fadeOut(a.settings.speed).css({
                        zIndex: 0
                    }),
                    a.children.eq(a.active.index).css("zIndex", a.settings.slideZIndex + 1).fadeIn(a.settings.speed, function() {
                        e(this).css("zIndex", a.settings.slideZIndex),
                        B()
                    });
                else {
                    a.settings.adaptiveHeight && a.viewport.height() != f() && a.viewport.animate({
                        height: f()
                    }, a.settings.adaptiveHeightSpeed);
                    var i = 0
                      , s = {
                        left: 0,
                        top: 0
                    };
                    if (!a.settings.infiniteLoop && a.carousel && a.active.last)
                        if ("horizontal" == a.settings.mode) {
                            var r = a.children.eq(a.children.length - 1);
                            s = r.position(),
                            i = a.viewport.width() - r.outerWidth()
                        } else {
                            var l = a.children.length - a.settings.minSlides;
                            s = a.children.eq(l).position()
                        }
                    else if (a.carousel && a.active.last && "prev" == n) {
                        var c = 1 == a.settings.moveSlides ? a.settings.maxSlides - x() : (v() - 1) * x() - (a.children.length - a.settings.maxSlides)
                          , r = o.children(".bx-clone").eq(c);
                        s = r.position()
                    } else if ("next" == n && 0 == a.active.index)
                        s = o.find("> .bx-clone").eq(a.settings.maxSlides).position(),
                        a.active.last = !1;
                    else if (t >= 0) {
                        var d = t * x();
                        s = a.children.eq(d).position()
                    }
                    if (void 0 !== s) {
                        var u = "horizontal" == a.settings.mode ? -(s.left - i) : -s.top;
                        w(u, "slide", a.settings.speed)
                    }
                }
        }
        ,
        o.goToNextSlide = function() {
            if (a.settings.infiniteLoop || !a.active.last) {
                var e = parseInt(a.active.index) + 1;
                o.goToSlide(e, "next")
            }
        }
        ,
        o.goToPrevSlide = function() {
            if (a.settings.infiniteLoop || 0 != a.active.index) {
                var e = parseInt(a.active.index) - 1;
                o.goToSlide(e, "prev")
            }
        }
        ,
        o.startAuto = function(e) {
            a.interval || (a.interval = setInterval(function() {
                "next" == a.settings.autoDirection ? o.goToNextSlide() : o.goToPrevSlide()
            }, a.settings.pause),
            a.settings.autoControls && 1 != e && M("stop"))
        }
        ,
        o.stopAuto = function(e) {
            a.interval && (clearInterval(a.interval),
            a.interval = null,
            a.settings.autoControls && 1 != e && M("start"))
        }
        ,
        o.getCurrentSlide = function() {
            return a.active.index
        }
        ,
        o.getCurrentSlideElement = function() {
            return a.children.eq(a.active.index)
        }
        ,
        o.getSlideCount = function() {
            return a.children.length
        }
        ,
        o.redrawSlider = function() {
            a.children.add(o.find(".bx-clone")).outerWidth(m()),
            a.viewport.css("height", f()),
            a.settings.ticker || y(),
            a.active.last && (a.active.index = v() - 1),
            a.active.index >= v() && (a.active.last = !0),
            a.settings.pager && !a.settings.pagerCustom && (S(),
            N(a.active.index))
        }
        ,
        o.destroySlider = function() {
            a.initialized && (a.initialized = !1,
            e(".bx-clone", this).remove(),
            a.children.each(function() {
                void 0 != e(this).data("origStyle") ? e(this).attr("style", e(this).data("origStyle")) : e(this).removeAttr("style")
            }),
            void 0 != e(this).data("origStyle") ? this.attr("style", e(this).data("origStyle")) : e(this).removeAttr("style"),
            e(this).unwrap().unwrap(),
            a.controls.el && a.controls.el.remove(),
            a.controls.next && a.controls.next.remove(),
            a.controls.prev && a.controls.prev.remove(),
            a.pagerEl && a.settings.controls && a.pagerEl.remove(),
            e(".bx-caption", this).remove(),
            a.controls.autoEl && a.controls.autoEl.remove(),
            clearInterval(a.interval),
            a.settings.responsive && e(window).unbind("resize", R))
        }
        ,
        o.reloadSlider = function(e) {
            void 0 != e && (s = e),
            o.destroySlider(),
            c()
        }
        ,
        c(),
        this
    }
}(jQuery),
function(e) {
    function t(t, a) {
        if (this.element = t,
        this.options = e.extend({}, i, a),
        e(this.element).data("max-height", this.options.maxHeight),
        e(this.element).data("height-margin", this.options.heightMargin),
        delete this.options.maxHeight,
        this.options.embedCSS && !s) {
            var o = ".readmore-js-toggle, .readmore-js-section { " + this.options.sectionCSS + " } .readmore-js-section { overflow: hidden; }"
              , r = document.createElement("style");
            r.type = "text/css",
            r.styleSheet ? r.styleSheet.cssText = o : r.appendChild(document.createTextNode(o)),
            document.getElementsByTagName("head")[0].appendChild(r),
            s = !0
        }
        this._defaults = i,
        this._name = n,
        this.init()
    }
    var n = "readmore"
      , i = {
        speed: 100,
        maxHeight: 200,
        heightMargin: 16,
        moreLink: '<a href="#">Read More</a>',
        lessLink: '<a href="#">Close</a>',
        embedCSS: !0,
        sectionCSS: "display: block; width: 100%;",
        startOpen: !1,
        expandedClass: "readmore-js-expanded",
        collapsedClass: "readmore-js-collapsed",
        beforeToggle: function() {},
        afterToggle: function() {}
    }
      , s = !1;
    t.prototype = {
        init: function() {
            var t = this;
            e(this.element).each(function() {
                var n = e(this)
                  , i = n.css("max-height").replace(/[^-\d\.]/g, "") > n.data("max-height") ? n.css("max-height").replace(/[^-\d\.]/g, "") : n.data("max-height")
                  , s = n.data("height-margin");
                if ("none" != n.css("max-height") && n.css("max-height", "none"),
                t.setBoxHeight(n),
                n.outerHeight(!0) <= i + s)
                    return !0;
                n.addClass("readmore-js-section " + t.options.collapsedClass).data("collapsedHeight", i),
                n.after(e(t.options.startOpen ? t.options.lessLink : t.options.moreLink).on("click", function(e) {
                    t.toggleSlider(this, n, e)
                }).addClass("readmore-js-toggle")),
                t.options.startOpen || n.css({
                    height: i
                })
            }),
            e(window).on("resize", function(e) {
                t.resizeBoxes()
            })
        },
        toggleSlider: function(t, n, i) {
            i.preventDefault();
            var s = this;
            i = newLink = sectionClass = "";
            var a = !1;
            i = e(n).data("collapsedHeight"),
            e(n).height() <= i ? (i = e(n).data("expandedHeight") + "px",
            newLink = "lessLink",
            a = !0,
            sectionClass = s.options.expandedClass) : (newLink = "moreLink",
            sectionClass = s.options.collapsedClass),
            s.options.beforeToggle(t, n, a),
            e(n).animate({
                height: i
            }, {
                duration: s.options.speed,
                complete: function() {
                    s.options.afterToggle(t, n, a),
                    e(t).replaceWith(e(s.options[newLink]).on("click", function(e) {
                        s.toggleSlider(this, n, e)
                    }).addClass("readmore-js-toggle")),
                    e(this).removeClass(s.options.collapsedClass + " " + s.options.expandedClass).addClass(sectionClass)
                }
            })
        },
        setBoxHeight: function(e) {
            var t = e.clone().css({
                height: "auto",
                width: e.width(),
                overflow: "hidden"
            }).insertAfter(e)
              , n = t.outerHeight(!0);
            t.remove(),
            e.data("expandedHeight", n)
        },
        resizeBoxes: function() {
            var t = this;
            e(".readmore-js-section").each(function() {
                var n = e(this);
                t.setBoxHeight(n),
                (n.height() > n.data("expandedHeight") || n.hasClass(t.options.expandedClass) && n.height() < n.data("expandedHeight")) && n.css("height", n.data("expandedHeight"))
            })
        },
        destroy: function() {
            var t = this;
            e(this.element).each(function() {
                var n = e(this);
                n.removeClass("readmore-js-section " + t.options.collapsedClass + " " + t.options.expandedClass).css({
                    "max-height": "",
                    height: "auto"
                }).next(".readmore-js-toggle").remove(),
                n.removeData()
            })
        }
    },
    e.fn[n] = function(i) {
        var s = arguments;
        return void 0 === i || "object" == typeof i ? this.each(function() {
            if (e.data(this, "plugin_" + n)) {
                var s = e.data(this, "plugin_" + n);
                s.destroy.apply(s)
            }
            e.data(this, "plugin_" + n, new t(this,i))
        }) : "string" == typeof i && "_" !== i[0] && "init" !== i ? this.each(function() {
            var a = e.data(this, "plugin_" + n);
            a instanceof t && "function" == typeof a[i] && a[i].apply(a, Array.prototype.slice.call(s, 1))
        }) : void 0
    }
}(jQuery),
function(e) {
    e.expander = {
        version: "1.4.13",
        defaults: {
            slicePoint: 100,
            sliceOn: null,
            preserveWords: !0,
            showWordCount: !1,
            wordCountText: " ({{count}} words)",
            widow: 4,
            expandText: "read more",
            expandPrefix: "&hellip; ",
            expandAfterSummary: !1,
            wordEnd: /(&(?:[^;]+;)?|[a-zA-Z\u00C0-\u0100]+|[^\u0000-\u007F]+)$/,
            summaryClass: "summary",
            detailClass: "details",
            moreClass: "read-more",
            lessClass: "read-less",
            moreLinkClass: "more-link",
            lessLinkClass: "less-link",
            collapseTimer: 0,
            expandEffect: "slideDown",
            expandSpeed: 250,
            collapseEffect: "slideUp",
            collapseSpeed: 200,
            userCollapse: !0,
            userCollapseText: "read less",
            userCollapsePrefix: " ",
            onSlice: null,
            beforeExpand: null,
            afterExpand: null,
            onCollapse: null,
            afterCollapse: null
        }
    },
    e.fn.expander = function(t) {
        function n(e, t) {
            var n = "span"
              , i = e.summary
              , s = g.exec(i)
              , a = s ? s[2].toLowerCase() : "";
            return t ? (n = "div",
            s && "a" !== a && !e.expandAfterSummary ? i = i.replace(g, e.moreLabel + "$1") : i += e.moreLabel,
            i = '<div class="' + e.summaryClass + '">' + i + "</div>") : i += e.moreLabel,
            [i, " <", n + ' class="' + e.detailClass + '"', ">", e.details, "</" + n + ">"].join("")
        }
        function i(e, t) {
            var n = '<span class="' + e.moreClass + '">' + e.expandPrefix;
            return e.wordCountText = e.showWordCount ? e.wordCountText.replace(/\{\{count\}\}/, t.replace(f, "").replace(/\&(?:amp|nbsp);/g, "").replace(/(?:^\s+|\s+$)/, "").match(/\w+/g).length) : "",
            n += '<a href="#" class="' + e.moreLinkClass + '">' + e.expandText + e.wordCountText + "</a></span>"
        }
        function s(t, n) {
            return t.lastIndexOf("<") > t.lastIndexOf(">") && (t = t.slice(0, t.lastIndexOf("<"))),
            n && (t = t.replace(p, "")),
            e.trim(t)
        }
        function a(e, t) {
            t.stop(!0, !0)[e.collapseEffect](e.collapseSpeed, function() {
                t.prev("span." + e.moreClass).show().length || t.parent().children("div." + e.summaryClass).show().find("span." + e.moreClass).show(),
                e.afterCollapse && e.afterCollapse.call(t)
            })
        }
        function o(t, n, i) {
            t.collapseTimer && (c = setTimeout(function() {
                a(t, n),
                e.isFunction(t.onCollapse) && t.onCollapse.call(i, !1)
            }, t.collapseTimer))
        }
        function r(t) {
            var n = "ExpandMoreHere374216623"
              , i = t.summaryText.replace(t.sliceOn, n);
            i = e("<div>" + i + "</div>").text();
            var s = i.indexOf(n)
              , a = t.summaryText.indexOf(t.sliceOn);
            return -1 !== s && t.slicePoint > s && (t.summaryText = t.allHtml.slice(0, a)),
            t
        }
        var l = "init";
        "string" == typeof t && (l = t,
        t = {});
        var c, d = e.extend({}, e.expander.defaults, t), u = /^<(?:area|br|col|embed|hr|img|input|link|meta|param).*>$/i, p = d.wordEnd, f = /<\/?(\w+)[^>]*>/g, h = /<(\w+)[^>]*>/g, m = /<\/(\w+)>/g, g = /(<\/([^>]+)>)\s*$/, v = /^(<[^>]+>)+.?/, x = /\s\s+/g, y = function(t) {
            return e.trim(t || "").replace(x, " ")
        }, w = {
            init: function() {
                this.each(function() {
                    var t, l, p, g, x, w, S, b, C, T, I, k, P, A, E, O = [], N = [], B = "", M = {}, W = this, H = e(this), z = e([]), L = e.extend({}, d, H.data("expander") || e.meta && H.data() || {}), D = !!H.find("." + L.detailClass).length, F = !!H.find("*").filter(function() {
                        return /^block|table|list/.test(e(this).css("display"))
                    }).length, _ = F ? "div" : "span", q = _ + "." + L.detailClass, R = L.moreClass + "", j = L.lessClass + "", Q = L.expandSpeed || 0, Y = y(H.html()), X = Y.slice(0, L.slicePoint);
                    if (L.moreSelector = "span." + R.split(" ").join("."),
                    L.lessSelector = "span." + j.split(" ").join("."),
                    !e.data(this, "expanderInit")) {
                        for (e.data(this, "expanderInit", !0),
                        e.data(this, "expander", L),
                        e.each(["onSlice", "beforeExpand", "afterExpand", "onCollapse", "afterCollapse"], function(t, n) {
                            M[n] = e.isFunction(L[n])
                        }),
                        X = s(X),
                        x = X.replace(f, "").length; L.slicePoint > x; )
                            g = Y.charAt(X.length),
                            "<" === g && (g = Y.slice(X.length).match(v)[0]),
                            X += g,
                            x++;
                        for (L.sliceOn && (E = r({
                            sliceOn: L.sliceOn,
                            slicePoint: L.slicePoint,
                            allHtml: Y,
                            summaryText: X
                        }),
                        X = E.summaryText),
                        X = s(X, L.preserveWords && Y.slice(X.length).length),
                        w = X.match(h) || [],
                        S = X.match(m) || [],
                        p = [],
                        e.each(w, function(e, t) {
                            u.test(t) || p.push(t)
                        }),
                        w = p,
                        l = S.length,
                        t = 0; l > t; t++)
                            S[t] = S[t].replace(m, "$1");
                        if (e.each(w, function(t, n) {
                            var i = n.replace(h, "$1")
                              , s = e.inArray(i, S);
                            -1 === s ? (O.push(n),
                            N.push("</" + i + ">")) : S.splice(s, 1)
                        }),
                        N.reverse(),
                        D)
                            C = H.find(q).remove().html(),
                            X = H.html(),
                            Y = X + C,
                            b = "";
                        else {
                            if (C = Y.slice(X.length),
                            "" === (T = e.trim(C.replace(f, ""))) || T.split(/\s+/).length < L.widow)
                                return;
                            b = N.pop() || "",
                            X += N.join(""),
                            C = O.join("") + C
                        }
                        L.moreLabel = H.find(L.moreSelector).length ? "" : i(L, C),
                        F ? C = Y : "&" === X.charAt(X.length - 1) && (B = /^[#\w\d\\]+;/.exec(C)) && (C = C.slice(B[0].length),
                        X += B[0]),
                        X += b,
                        L.summary = X,
                        L.details = C,
                        L.lastCloseTag = b,
                        M.onSlice && (p = L.onSlice.call(W, L),
                        L = p && p.details ? p : L),
                        I = n(L, F),
                        H.html(I),
                        P = H.find(q),
                        A = H.find(L.moreSelector),
                        "slideUp" === L.collapseEffect && "slideDown" !== L.expandEffect || H.is(":hidden") ? P.css({
                            display: "none"
                        }) : P[L.collapseEffect](0),
                        z = H.find("div." + L.summaryClass),
                        k = function(e) {
                            e.preventDefault(),
                            A.hide(),
                            z.hide(),
                            M.beforeExpand && L.beforeExpand.call(W),
                            P.stop(!1, !0)[L.expandEffect](Q, function() {
                                P.css({
                                    zoom: ""
                                }),
                                M.afterExpand && L.afterExpand.call(W),
                                o(L, P, W)
                            })
                        }
                        ,
                        A.find("a").unbind("click.expander").bind("click.expander", k),
                        L.userCollapse && !H.find(L.lessSelector).length && H.find(q).append('<span class="' + L.lessClass + '">' + L.userCollapsePrefix + '<a href="#" class="' + L.lessLinkClass + '">' + L.userCollapseText + "</a></span>"),
                        H.find(L.lessSelector + " a").unbind("click.expander").bind("click.expander", function(t) {
                            t.preventDefault(),
                            clearTimeout(c);
                            var n = e(this).closest(q);
                            a(L, n),
                            M.onCollapse && L.onCollapse.call(W, !0)
                        })
                    }
                })
            },
            destroy: function() {
                this.each(function() {
                    var t, n, i = e(this);
                    i.data("expanderInit") && (t = e.extend({}, i.data("expander") || {}, d),
                    n = i.find("." + t.detailClass).contents(),
                    i.removeData("expanderInit"),
                    i.removeData("expander"),
                    i.find(t.moreSelector).remove(),
                    i.find("." + t.summaryClass).remove(),
                    i.find("." + t.detailClass).after(n).remove(),
                    i.find(t.lessSelector).remove())
                })
            }
        };
        return w[l] && w[l].call(this),
        this
    }
    ,
    e.fn.expander.defaults = e.expander.defaults
}(jQuery),
function(e) {
    e(document).ready(function() {
        e(".views-field.views-field-field-client-company-site-url .field-content").each(function() {
            e(this).find("a").attr("onmouseup", "ga('send', 'event', 'section_links', 'view_client_sites')")
        }),
        e(".testimonial-thumbnail-images .views-field.views-field-field-client-image .field-content").each(function() {
            e(this).wrapInner("<a></a>"),
            e(this).find("a").attr("onmouseup", "ga('send', 'event', 'slide_tabs','testimonial')")
        });
        var t = new Array
          , n = new Array;
        e(".footer .col-sm-8 ul.links li").each(function() {
            t.push(e(this).children("a").text()),
            n.push(e(this).attr("class").split(" ")[0])
        }),
        e.each(t, function(i) {
            e("." + n[i]).find("a").attr("onmouseup", "ga('send', 'event', 'footer_link','" + t[i] + "')")
        }),
        e(".footer .col-sm-4 .footerWidget").each(function() {
            e(this).find("a").attr("onmouseup", "ga('send', 'event', 'footer_links', ' ')")
        }),
        e(".teamieVideo").find("a").attr("onmouseup", "ga('send', 'event', 'section_links', 'play_video')"),
        e(".col-sm-5 .teamieHelpFeature").each(function() {
            e(this).find("a").attr("onmouseup", "ga('send', 'event', 'section', 'Education')")
        }),
        e(".col-sm-5.teamieTraningFeature .traning").each(function() {
            e(this).find("a").attr("onmouseup", "ga('send', 'event', 'section', 'Training')")
        });
        var i = e(".appDownloadLink a:eq(0)").attr("href");
        e(".appDownloadLink").find('a[href="' + i + '"]').attr("onmouseup", "ga('send', 'event', 'section_links', 'App store')");
        var s = e(".appDownloadLink a:eq(1)").attr("href");
        e(".appDownloadLink").find('a[href="' + s + '"]').attr("onmouseup", "ga('send', 'event', 'section_links', 'Google play')"),
        e(".pageBlock p.allPressCoverage").find("a").attr("onmouseup", "ga('send', 'event', 'section_links', 'view press')"),
        e(".teamiePlan td.views-field-field-instant-class-room-.plan-.signUp").find("a").attr("onmouseup", "ga('send', 'event', 'action_link', 'signup')"),
        e(".teamiePlan td.views-field-field-enterprise-or-school-or-co.getInTouch").find("a").attr("onmouseup", "ga('send', 'event', 'action_link', 'contact')");
        var a = e(".navbar-header").children("a").attr("title");
        e(".navbar-header").find("a").attr("onmouseup", "ga('send', 'event', 'navigation_link', '" + a + "')");
        var o = new Array
          , r = new Array;
        e("#header ul.nav.navbar-nav.navbar-right li.dropdown ul.dropdown-menu li").each(function() {
            o.push(e(this).children("a").text()),
            r.push(e(this).children("a").attr("href"))
        }),
        e.each(o, function(t, n) {
            e("#header ul.nav.navbar-nav.navbar-right li.dropdown ul.dropdown-menu li").find("a[href = '" + r[t] + "']").attr("onmouseup", "ga('send', 'event', 'navigation_link', '" + n + "')")
        }),
        e("li.scheduleDemo").find("a").attr("onmouseup", "ga('send', 'event', 'navigation_link', 'Schedule a Demo')"),
        e("li.tryTeamie").find("a").attr("onmouseup", "ga('send', 'event', 'navigation_link', 'Try Teamie')"),
        e(".featureImages.featureScroll #featureNav").each(function() {
            e(this).find("a").attr("onmouseup", "ga('send', 'event', 'slide_tabs','features')")
        }),
        e(".bx-wrapper .bx-controls.bx-has-controls-direction .bx-controls-direction").live("mouseover", function() {
            e(this).find("a").attr("onmouseup", "ga('send', 'event' , 'slide_tabs', 'client_list')")
        }),
        e(".md-bullet").live("mouseover", function() {
            var t = new Array;
            e(".md-bullet").each(function() {
                t.push(e(this).children("a.bannerTab").text())
            }),
            e.each(t, function(t, n) {
                e("[rel=" + t + "]").find("a.bannerTab").attr("onmouseup", "ga('send', 'event', 'slide_tabs', 'banner', '" + n + "')")
            })
        })
    })
}(jQuery),
function(e) {
    function t(s) {
        if (s == n.length && (e(".magical-container a").attr("href", "https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
        e(".magical-container a").attr("target", "_blank"),
        e(".magical-container a").attr("onmouseup", "ga('send', 'event', 'magic', 'yawn-finish')")),
        s >= n.length)
            return void e(".magical-container").hide("slow");
        0 == s && (0 == e(".magical-container").length && (e("body").append('<div class="magical-container"><div class="header"></div><img class="image"/><div class="content"></div><center><a></a></center></div>'),
        e(".magical-container a").click(function() {
            i++,
            t(i)
        })),
        e(".magical-container").hide().fadeIn("slow"),
        e(".magical-container a").removeAttr("href")),
        e(".magical-container .header").html(n[s].header),
        e(".magical-container .content").html(n[s].content),
        e(".magical-container .image").attr("src", n[s].image).removeClass("alignment-left").removeClass("alignment-right").removeClass("alignment-center").addClass("alignment-" + n[s].alignment),
        e(".magical-container a").html(n[s].button)
    }
    var n = [{
        header: "Okay, forget what the page says. Here's the real reason why you should use Teamie...",
        content: "<p>Cos Shakespeare once said... </p> <p>All the worlds a Teamie,<br/>And all the men and women merely users.<br/>They have their logins and their logouts,<br/>And one man in his session shares as he wants<br/>His learning being seven times.</p>",
        button: "Don't kid me! Shakespeare was born before Teamie!",
        image: "https://theteamie.com/sites/all/themes/teamiesite/images/shakespeare.jpg",
        alignment: "right"
    }, {
        header: "Acting smart eh? How about this excerpt from an interview of Edmund Hillary and Tenzing Norgay in 1953?",
        content: "<p>Edmund : My solar plexus was tight with fear as I ploughed on. As we neared the top of Mount Everest, I looked up and stopped. There was something up there in the clouds. Anxiously I waved Tenzing up to me. And he could see it too</p><p>Interviewer : What was it that you saw?</p><p>Tenzing : We're not sure. It was... It was a word. Written out on top of the clouds. We couldn't quite make sense of it.<p>Interviewer : Can you spell it for us?</p><p>Edmund crinkled his eyebrows, drew in his breath and pronounced slowly.</p><p>Edmund : T...E...A...M...I...E...</p>",
        button: "Okay... This is not funny.",
        image: "https://theteamie.com/sites/all/themes/teamiesite/images/edmund_tenzing.jpg",
        alignment: "left"
    }, {
        header: "Ah come on! Stop behaving like Chuck Norris.",
        content: "",
        button: "What has Chuck Norris got anything to do with this?",
        image: "https://theteamie.com/sites/all/themes/teamiesite/images/chuck-norris.jpg",
        alignment: "center"
    }, {
        header: "Oh you didn't know? Chuck Norris doesn't like Teamie.",
        content: "",
        button: "What?! Why?",
        image: "https://theteamie.com/sites/all/themes/teamiesite/images/chuck-norris.jpg",
        alignment: "center"
    }, {
        header: "Cos, just like him, Teamie too is present anytime, anywhere, any device!",
        content: "",
        button: "Oh God! Please help me!",
        image: "https://theteamie.com/sites/all/themes/teamiesite/images/chuck-norris-approved.jpg",
        alignment: "center"
    }]
      , i = 0
      , s = "";
    window.addEventListener("keypress", function(e) {
        var n = window.event ? String.fromCharCode(e.keyCode) : String.fromCharCode(e.which)
          , a = e.target.tagName.toLowerCase();
        "input" != a && "textarea" != a && (s += n.toLowerCase(),
        s.length > "yawn".length && (s = s.slice(1)),
        "yawn" == s && (ga("send", "event", "magic", "yawn"),
        i = 0,
        t(i)))
    })
}(jQuery);
