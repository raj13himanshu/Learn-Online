if ("undefined" == typeof jQuery)
    throw new Error("Bootstrap requires jQuery");
+function(t) {
    function e() {
        var t = document.createElement("bootstrap")
          , e = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var i in e)
            if (void 0 !== t.style[i])
                return {
                    end: e[i]
                }
    }
    t.fn.emulateTransitionEnd = function(e) {
        var i = !1
          , o = this;
        t(this).one(t.support.transition.end, function() {
            i = !0
        });
        var n = function() {
            i || t(o).trigger(t.support.transition.end)
        };
        return setTimeout(n, e),
        this
    }
    ,
    t(function() {
        t.support.transition = e()
    })
}(jQuery),
function(t) {
    var e = '[data-dismiss="alert"]'
      , i = function(i) {
        t(i).on("click", e, this.close)
    };
    i.prototype.close = function(e) {
        function i() {
            s.trigger("closed.bs.alert").remove()
        }
        var o = t(this)
          , n = o.attr("data-target");
        n || (n = o.attr("href"),
        n = n && n.replace(/.*(?=#[^\s]*$)/, ""));
        var s = t(n);
        e && e.preventDefault(),
        s.length || (s = o.hasClass("alert") ? o : o.parent()),
        s.trigger(e = t.Event("close.bs.alert")),
        e.isDefaultPrevented() || (s.removeClass("in"),
        t.support.transition && s.hasClass("fade") ? s.one(t.support.transition.end, i).emulateTransitionEnd(150) : i())
    }
    ;
    var o = t.fn.alert;
    t.fn.alert = function(e) {
        return this.each(function() {
            var o = t(this)
              , n = o.data("bs.alert");
            n || o.data("bs.alert", n = new i(this)),
            "string" == typeof e && n[e].call(o)
        })
    }
    ,
    t.fn.alert.Constructor = i,
    t.fn.alert.noConflict = function() {
        return t.fn.alert = o,
        this
    }
    ,
    t(document).on("click.bs.alert.data-api", e, i.prototype.close)
}(jQuery),
function(t) {
    var e = function(i, o) {
        this.$element = t(i),
        this.options = t.extend({}, e.DEFAULTS, o)
    };
    e.DEFAULTS = {
        loadingText: "loading..."
    },
    e.prototype.setState = function(t) {
        var e = "disabled"
          , i = this.$element
          , o = i.is("input") ? "val" : "html"
          , n = i.data();
        t += "Text",
        n.resetText || i.data("resetText", i[o]()),
        i[o](n[t] || this.options[t]),
        setTimeout(function() {
            "loadingText" == t ? i.addClass(e).attr(e, e) : i.removeClass(e).removeAttr(e)
        }, 0)
    }
    ,
    e.prototype.toggle = function() {
        var t = this.$element.closest('[data-toggle="buttons"]');
        t.length && "radio" === this.$element.find("input").prop("checked", !this.$element.hasClass("active")).trigger("change").prop("type") && t.find(".active").removeClass("active"),
        this.$element.toggleClass("active")
    }
    ;
    var i = t.fn.button;
    t.fn.button = function(i) {
        return this.each(function() {
            var o = t(this)
              , n = o.data("bs.button")
              , s = "object" == typeof i && i;
            n || o.data("bs.button", n = new e(this,s)),
            "toggle" == i ? n.toggle() : i && n.setState(i)
        })
    }
    ,
    t.fn.button.Constructor = e,
    t.fn.button.noConflict = function() {
        return t.fn.button = i,
        this
    }
    ,
    t(document).on("click.bs.button.data-api", "[data-toggle^=button]", function(e) {
        var i = t(e.target);
        i.hasClass("btn") || (i = i.closest(".btn")),
        i.button("toggle"),
        e.preventDefault()
    })
}(jQuery),
function(t) {
    var e = function(e, i) {
        this.$element = t(e),
        this.$indicators = this.$element.find(".carousel-indicators"),
        this.options = i,
        this.paused = this.sliding = this.interval = this.$active = this.$items = null,
        "hover" == this.options.pause && this.$element.on("mouseenter", t.proxy(this.pause, this)).on("mouseleave", t.proxy(this.cycle, this))
    };
    e.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0
    },
    e.prototype.cycle = function(e) {
        return e || (this.paused = !1),
        this.interval && clearInterval(this.interval),
        this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)),
        this
    }
    ,
    e.prototype.getActiveIndex = function() {
        return this.$active = this.$element.find(".item.active"),
        this.$items = this.$active.parent().children(),
        this.$items.index(this.$active)
    }
    ,
    e.prototype.to = function(e) {
        var i = this
          , o = this.getActiveIndex();
        return e > this.$items.length - 1 || 0 > e ? void 0 : this.sliding ? this.$element.one("slid", function() {
            i.to(e)
        }) : o == e ? this.pause().cycle() : this.slide(e > o ? "next" : "prev", t(this.$items[e]))
    }
    ,
    e.prototype.pause = function(e) {
        return e || (this.paused = !0),
        this.$element.find(".next, .prev").length && t.support.transition.end && (this.$element.trigger(t.support.transition.end),
        this.cycle(!0)),
        this.interval = clearInterval(this.interval),
        this
    }
    ,
    e.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }
    ,
    e.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }
    ,
    e.prototype.slide = function(e, i) {
        var o = this.$element.find(".item.active")
          , n = i || o[e]()
          , s = this.interval
          , r = "next" == e ? "left" : "right"
          , a = "next" == e ? "first" : "last"
          , l = this;
        if (!n.length) {
            if (!this.options.wrap)
                return;
            n = this.$element.find(".item")[a]()
        }
        this.sliding = !0,
        s && this.pause();
        var h = t.Event("slide.bs.carousel", {
            relatedTarget: n[0],
            direction: r
        });
        if (!n.hasClass("active")) {
            if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"),
            this.$element.one("slid", function() {
                var e = t(l.$indicators.children()[l.getActiveIndex()]);
                e && e.addClass("active")
            })),
            t.support.transition && this.$element.hasClass("slide")) {
                if (this.$element.trigger(h),
                h.isDefaultPrevented())
                    return;
                n.addClass(e),
                n[0].offsetWidth,
                o.addClass(r),
                n.addClass(r),
                o.one(t.support.transition.end, function() {
                    n.removeClass([e, r].join(" ")).addClass("active"),
                    o.removeClass(["active", r].join(" ")),
                    l.sliding = !1,
                    setTimeout(function() {
                        l.$element.trigger("slid")
                    }, 0)
                }).emulateTransitionEnd(600)
            } else {
                if (this.$element.trigger(h),
                h.isDefaultPrevented())
                    return;
                o.removeClass("active"),
                n.addClass("active"),
                this.sliding = !1,
                this.$element.trigger("slid")
            }
            return s && this.cycle(),
            this
        }
    }
    ;
    var i = t.fn.carousel;
    t.fn.carousel = function(i) {
        return this.each(function() {
            var o = t(this)
              , n = o.data("bs.carousel")
              , s = t.extend({}, e.DEFAULTS, o.data(), "object" == typeof i && i)
              , r = "string" == typeof i ? i : s.slide;
            n || o.data("bs.carousel", n = new e(this,s)),
            "number" == typeof i ? n.to(i) : r ? n[r]() : s.interval && n.pause().cycle()
        })
    }
    ,
    t.fn.carousel.Constructor = e,
    t.fn.carousel.noConflict = function() {
        return t.fn.carousel = i,
        this
    }
    ,
    t(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(e) {
        var i, o = t(this), n = t(o.attr("data-target") || (i = o.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "")), s = t.extend({}, n.data(), o.data()), r = o.attr("data-slide-to");
        r && (s.interval = !1),
        n.carousel(s),
        (r = o.attr("data-slide-to")) && n.data("bs.carousel").to(r),
        e.preventDefault()
    }),
    t(window).on("load", function() {
        t('[data-ride="carousel"]').each(function() {
            var e = t(this);
            e.carousel(e.data())
        })
    })
}(jQuery),
function(t) {
    var e = function(i, o) {
        this.$element = t(i),
        this.options = t.extend({}, e.DEFAULTS, o),
        this.transitioning = null,
        this.options.parent && (this.$parent = t(this.options.parent)),
        this.options.toggle && this.toggle()
    };
    e.DEFAULTS = {
        toggle: !0
    },
    e.prototype.dimension = function() {
        return this.$element.hasClass("width") ? "width" : "height"
    }
    ,
    e.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e = t.Event("show.bs.collapse");
            if (this.$element.trigger(e),
            !e.isDefaultPrevented()) {
                var i = this.$parent && this.$parent.find("> .panel > .in");
                if (i && i.length) {
                    var o = i.data("bs.collapse");
                    if (o && o.transitioning)
                        return;
                    i.collapse("hide"),
                    o || i.data("bs.collapse", null)
                }
                var n = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[n](0),
                this.transitioning = 1;
                var s = function() {
                    this.$element.removeClass("collapsing").addClass("in")[n]("auto"),
                    this.transitioning = 0,
                    this.$element.trigger("shown.bs.collapse")
                };
                if (!t.support.transition)
                    return s.call(this);
                var r = t.camelCase(["scroll", n].join("-"));
                this.$element.one(t.support.transition.end, t.proxy(s, this)).emulateTransitionEnd(350)[n](this.$element[0][r])
            }
        }
    }
    ,
    e.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e),
            !e.isDefaultPrevented()) {
                var i = this.dimension();
                this.$element[i](this.$element[i]())[0].offsetHeight,
                this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),
                this.transitioning = 1;
                var o = function() {
                    this.transitioning = 0,
                    this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                };
                return t.support.transition ? void this.$element[i](0).one(t.support.transition.end, t.proxy(o, this)).emulateTransitionEnd(350) : o.call(this)
            }
        }
    }
    ,
    e.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }
    ;
    var i = t.fn.collapse;
    t.fn.collapse = function(i) {
        return this.each(function() {
            var o = t(this)
              , n = o.data("bs.collapse")
              , s = t.extend({}, e.DEFAULTS, o.data(), "object" == typeof i && i);
            n || o.data("bs.collapse", n = new e(this,s)),
            "string" == typeof i && n[i]()
        })
    }
    ,
    t.fn.collapse.Constructor = e,
    t.fn.collapse.noConflict = function() {
        return t.fn.collapse = i,
        this
    }
    ,
    t(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function(e) {
        var i, o = t(this), n = o.attr("data-target") || e.preventDefault() || (i = o.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""), s = t(n), r = s.data("bs.collapse"), a = r ? "toggle" : o.data(), l = o.attr("data-parent"), h = l && t(l);
        r && r.transitioning || (h && h.find('[data-toggle=collapse][data-parent="' + l + '"]').not(o).addClass("collapsed"),
        o[s.hasClass("in") ? "addClass" : "removeClass"]("collapsed")),
        s.collapse(a)
    })
}(jQuery),
function(t) {
    function e() {
        t(o).remove(),
        t(n).each(function(e) {
            var o = i(t(this));
            o.hasClass("open") && (o.trigger(e = t.Event("hide.bs.dropdown")),
            e.isDefaultPrevented() || o.removeClass("open").trigger("hidden.bs.dropdown"))
        })
    }
    function i(e) {
        var i = e.attr("data-target");
        i || (i = e.attr("href"),
        i = i && /#/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var o = i && t(i);
        return o && o.length ? o : e.parent()
    }
    var o = ".dropdown-backdrop"
      , n = "[data-toggle=dropdown]"
      , s = function(e) {
        t(e).on("click.bs.dropdown", this.toggle)
    };
    s.prototype.toggle = function(o) {
        var n = t(this);
        if (!n.is(".disabled, :disabled")) {
            var s = i(n)
              , r = s.hasClass("open");
            if (e(),
            !r) {
                if ("ontouchstart"in document.documentElement && !s.closest(".navbar-nav").length && t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click", e),
                s.trigger(o = t.Event("show.bs.dropdown")),
                o.isDefaultPrevented())
                    return;
                s.toggleClass("open").trigger("shown.bs.dropdown"),
                n.focus()
            }
            return !1
        }
    }
    ,
    s.prototype.keydown = function(e) {
        if (/(38|40|27)/.test(e.keyCode)) {
            var o = t(this);
            if (e.preventDefault(),
            e.stopPropagation(),
            !o.is(".disabled, :disabled")) {
                var s = i(o)
                  , r = s.hasClass("open");
                if (!r || r && 27 == e.keyCode)
                    return 27 == e.which && s.find(n).focus(),
                    o.click();
                var a = t("[role=menu] li:not(.divider):visible a", s);
                if (a.length) {
                    var l = a.index(a.filter(":focus"));
                    38 == e.keyCode && l > 0 && l--,
                    40 == e.keyCode && l < a.length - 1 && l++,
                    ~l || (l = 0),
                    a.eq(l).focus()
                }
            }
        }
    }
    ;
    var r = t.fn.dropdown;
    t.fn.dropdown = function(e) {
        return this.each(function() {
            var i = t(this)
              , o = i.data("dropdown");
            o || i.data("dropdown", o = new s(this)),
            "string" == typeof e && o[e].call(i)
        })
    }
    ,
    t.fn.dropdown.Constructor = s,
    t.fn.dropdown.noConflict = function() {
        return t.fn.dropdown = r,
        this
    }
    ,
    t(document).on("click.bs.dropdown.data-api", e).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", n, s.prototype.toggle).on("keydown.bs.dropdown.data-api", n + ", [role=menu]", s.prototype.keydown)
}(jQuery),
function(t) {
    var e = function(e, i) {
        this.options = i,
        this.$element = t(e),
        this.$backdrop = this.isShown = null,
        this.options.remote && this.$element.load(this.options.remote)
    };
    e.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    },
    e.prototype.toggle = function(t) {
        return this[this.isShown ? "hide" : "show"](t)
    }
    ,
    e.prototype.show = function(e) {
        var i = this
          , o = t.Event("show.bs.modal", {
            relatedTarget: e
        });
        this.$element.trigger(o),
        this.isShown || o.isDefaultPrevented() || (this.isShown = !0,
        this.escape(),
        this.$element.on("click.dismiss.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)),
        this.backdrop(function() {
            var o = t.support.transition && i.$element.hasClass("fade");
            i.$element.parent().length || i.$element.appendTo(document.body),
            i.$element.show(),
            o && i.$element[0].offsetWidth,
            i.$element.addClass("in").attr("aria-hidden", !1),
            i.enforceFocus();
            var n = t.Event("shown.bs.modal", {
                relatedTarget: e
            });
            o ? i.$element.find(".modal-dialog").one(t.support.transition.end, function() {
                i.$element.focus().trigger(n)
            }).emulateTransitionEnd(300) : i.$element.focus().trigger(n)
        }))
    }
    ,
    e.prototype.hide = function(e) {
        e && e.preventDefault(),
        e = t.Event("hide.bs.modal"),
        this.$element.trigger(e),
        this.isShown && !e.isDefaultPrevented() && (this.isShown = !1,
        this.escape(),
        t(document).off("focusin.bs.modal"),
        this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.modal"),
        t.support.transition && this.$element.hasClass("fade") ? this.$element.one(t.support.transition.end, t.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
    }
    ,
    e.prototype.enforceFocus = function() {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
            this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.focus()
        }, this))
    }
    ,
    e.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", t.proxy(function(t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    }
    ,
    e.prototype.hideModal = function() {
        var t = this;
        this.$element.hide(),
        this.backdrop(function() {
            t.removeBackdrop(),
            t.$element.trigger("hidden.bs.modal")
        })
    }
    ,
    e.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(),
        this.$backdrop = null
    }
    ,
    e.prototype.backdrop = function(e) {
        var i = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var o = t.support.transition && i;
            if (this.$backdrop = t('<div class="modal-backdrop ' + i + '" />').appendTo(document.body),
            this.$element.on("click.dismiss.modal", t.proxy(function(t) {
                t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
            }, this)),
            o && this.$backdrop[0].offsetWidth,
            this.$backdrop.addClass("in"),
            !e)
                return;
            o ? this.$backdrop.one(t.support.transition.end, e).emulateTransitionEnd(150) : e()
        } else
            !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"),
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(t.support.transition.end, e).emulateTransitionEnd(150) : e()) : e && e()
    }
    ;
    var i = t.fn.modal;
    t.fn.modal = function(i, o) {
        return this.each(function() {
            var n = t(this)
              , s = n.data("bs.modal")
              , r = t.extend({}, e.DEFAULTS, n.data(), "object" == typeof i && i);
            s || n.data("bs.modal", s = new e(this,r)),
            "string" == typeof i ? s[i](o) : r.show && s.show(o)
        })
    }
    ,
    t.fn.modal.Constructor = e,
    t.fn.modal.noConflict = function() {
        return t.fn.modal = i,
        this
    }
    ,
    t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
        var i = t(this)
          , o = i.attr("href")
          , n = t(i.attr("data-target") || o && o.replace(/.*(?=#[^\s]+$)/, ""))
          , s = n.data("modal") ? "toggle" : t.extend({
            remote: !/#/.test(o) && o
        }, n.data(), i.data());
        e.preventDefault(),
        n.modal(s, this).one("hide", function() {
            i.is(":visible") && i.focus()
        })
    }),
    t(document).on("show.bs.modal", ".modal", function() {
        t(document.body).addClass("modal-open")
    }).on("hidden.bs.modal", ".modal", function() {
        t(document.body).removeClass("modal-open")
    })
}(jQuery),
function(t) {
    var e = function(t, e) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null,
        this.init("tooltip", t, e)
    };
    e.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    },
    e.prototype.init = function(e, i, o) {
        this.enabled = !0,
        this.type = e,
        this.$element = t(i),
        this.options = this.getOptions(o);
        for (var n = this.options.trigger.split(" "), s = n.length; s--; ) {
            var r = n[s];
            if ("click" == r)
                this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
            else if ("manual" != r) {
                var a = "hover" == r ? "mouseenter" : "focus"
                  , l = "hover" == r ? "mouseleave" : "blur";
                this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)),
                this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }
    ,
    e.prototype.getDefaults = function() {
        return e.DEFAULTS
    }
    ,
    e.prototype.getOptions = function(e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e),
        e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }),
        e
    }
    ,
    e.prototype.getDelegateOptions = function() {
        var e = {}
          , i = this.getDefaults();
        return this._options && t.each(this._options, function(t, o) {
            i[t] != o && (e[t] = o)
        }),
        e
    }
    ,
    e.prototype.enter = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(i.timeout),
        i.hoverState = "in",
        i.options.delay && i.options.delay.show ? void (i.timeout = setTimeout(function() {
            "in" == i.hoverState && i.show()
        }, i.options.delay.show)) : i.show()
    }
    ,
    e.prototype.leave = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(i.timeout),
        i.hoverState = "out",
        i.options.delay && i.options.delay.hide ? void (i.timeout = setTimeout(function() {
            "out" == i.hoverState && i.hide()
        }, i.options.delay.hide)) : i.hide()
    }
    ,
    e.prototype.show = function() {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            if (this.$element.trigger(e),
            e.isDefaultPrevented())
                return;
            var i = this.tip();
            this.setContent(),
            this.options.animation && i.addClass("fade");
            var o = "function" == typeof this.options.placement ? this.options.placement.call(this, i[0], this.$element[0]) : this.options.placement
              , n = /\s?auto?\s?/i
              , s = n.test(o);
            s && (o = o.replace(n, "") || "top"),
            i.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(o),
            this.options.container ? i.appendTo(this.options.container) : i.insertAfter(this.$element);
            var r = this.getPosition()
              , a = i[0].offsetWidth
              , l = i[0].offsetHeight;
            if (s) {
                var h = this.$element.parent()
                  , p = o
                  , c = document.documentElement.scrollTop || document.body.scrollTop
                  , d = "body" == this.options.container ? window.innerWidth : h.outerWidth()
                  , f = "body" == this.options.container ? window.innerHeight : h.outerHeight()
                  , u = "body" == this.options.container ? 0 : h.offset().left;
                o = "bottom" == o && r.top + r.height + l - c > f ? "top" : "top" == o && r.top - c - l < 0 ? "bottom" : "right" == o && r.right + a > d ? "left" : "left" == o && r.left - a < u ? "right" : o,
                i.removeClass(p).addClass(o)
            }
            var v = this.getCalculatedOffset(o, r, a, l);
            this.applyPlacement(v, o),
            this.$element.trigger("shown.bs." + this.type)
        }
    }
    ,
    e.prototype.applyPlacement = function(t, e) {
        var i, o = this.tip(), n = o[0].offsetWidth, s = o[0].offsetHeight, r = parseInt(o.css("margin-top"), 10), a = parseInt(o.css("margin-left"), 10);
        isNaN(r) && (r = 0),
        isNaN(a) && (a = 0),
        t.top = t.top + r,
        t.left = t.left + a,
        o.offset(t).addClass("in");
        var l = o[0].offsetWidth
          , h = o[0].offsetHeight;
        if ("top" == e && h != s && (i = !0,
        t.top = t.top + s - h),
        /bottom|top/.test(e)) {
            var p = 0;
            t.left < 0 && (p = -2 * t.left,
            t.left = 0,
            o.offset(t),
            l = o[0].offsetWidth,
            h = o[0].offsetHeight),
            this.replaceArrow(p - n + l, l, "left")
        } else
            this.replaceArrow(h - s, h, "top");
        i && o.offset(t)
    }
    ,
    e.prototype.replaceArrow = function(t, e, i) {
        this.arrow().css(i, t ? 50 * (1 - t / e) + "%" : "")
    }
    ,
    e.prototype.setContent = function() {
        var t = this.tip()
          , e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e),
        t.removeClass("fade in top bottom left right")
    }
    ,
    e.prototype.hide = function() {
        function e() {
            "in" != i.hoverState && o.detach()
        }
        var i = this
          , o = this.tip()
          , n = t.Event("hide.bs." + this.type);
        return this.$element.trigger(n),
        n.isDefaultPrevented() ? void 0 : (o.removeClass("in"),
        t.support.transition && this.$tip.hasClass("fade") ? o.one(t.support.transition.end, e).emulateTransitionEnd(150) : e(),
        this.$element.trigger("hidden.bs." + this.type),
        this)
    }
    ,
    e.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }
    ,
    e.prototype.hasContent = function() {
        return this.getTitle()
    }
    ,
    e.prototype.getPosition = function() {
        var e = this.$element[0];
        return t.extend({}, "function" == typeof e.getBoundingClientRect ? e.getBoundingClientRect() : {
            width: e.offsetWidth,
            height: e.offsetHeight
        }, this.$element.offset())
    }
    ,
    e.prototype.getCalculatedOffset = function(t, e, i, o) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        } : "top" == t ? {
            top: e.top - o,
            left: e.left + e.width / 2 - i / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - o / 2,
            left: e.left - i
        } : {
            top: e.top + e.height / 2 - o / 2,
            left: e.left + e.width
        }
    }
    ,
    e.prototype.getTitle = function() {
        var t = this.$element
          , e = this.options;
        return t.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
    }
    ,
    e.prototype.tip = function() {
        return this.$tip = this.$tip || t(this.options.template)
    }
    ,
    e.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }
    ,
    e.prototype.validate = function() {
        this.$element[0].parentNode || (this.hide(),
        this.$element = null,
        this.options = null)
    }
    ,
    e.prototype.enable = function() {
        this.enabled = !0
    }
    ,
    e.prototype.disable = function() {
        this.enabled = !1
    }
    ,
    e.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }
    ,
    e.prototype.toggle = function(e) {
        var i = e ? t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
        i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    }
    ,
    e.prototype.destroy = function() {
        this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    }
    ;
    var i = t.fn.tooltip;
    t.fn.tooltip = function(i) {
        return this.each(function() {
            var o = t(this)
              , n = o.data("bs.tooltip")
              , s = "object" == typeof i && i;
            n || o.data("bs.tooltip", n = new e(this,s)),
            "string" == typeof i && n[i]()
        })
    }
    ,
    t.fn.tooltip.Constructor = e,
    t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = i,
        this
    }
}(jQuery),
function(t) {
    var e = function(t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip)
        throw new Error("Popover requires tooltip.js");
    e.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }),
    e.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype),
    e.prototype.constructor = e,
    e.prototype.getDefaults = function() {
        return e.DEFAULTS
    }
    ,
    e.prototype.setContent = function() {
        var t = this.tip()
          , e = this.getTitle()
          , i = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e),
        t.find(".popover-content")[this.options.html ? "html" : "text"](i),
        t.removeClass("fade top bottom left right in"),
        t.find(".popover-title").html() || t.find(".popover-title").hide()
    }
    ,
    e.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }
    ,
    e.prototype.getContent = function() {
        var t = this.$element
          , e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }
    ,
    e.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }
    ,
    e.prototype.tip = function() {
        return this.$tip || (this.$tip = t(this.options.template)),
        this.$tip
    }
    ;
    var i = t.fn.popover;
    t.fn.popover = function(i) {
        return this.each(function() {
            var o = t(this)
              , n = o.data("bs.popover")
              , s = "object" == typeof i && i;
            n || o.data("bs.popover", n = new e(this,s)),
            "string" == typeof i && n[i]()
        })
    }
    ,
    t.fn.popover.Constructor = e,
    t.fn.popover.noConflict = function() {
        return t.fn.popover = i,
        this
    }
}(jQuery),
function(t) {
    function e(i, o) {
        var n, s = t.proxy(this.process, this);
        this.$element = t(t(i).is("body") ? window : i),
        this.$body = t("body"),
        this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", s),
        this.options = t.extend({}, e.DEFAULTS, o),
        this.selector = (this.options.target || (n = t(i).attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a",
        this.offsets = t([]),
        this.targets = t([]),
        this.activeTarget = null,
        this.refresh(),
        this.process()
    }
    e.DEFAULTS = {
        offset: 10
    },
    e.prototype.refresh = function() {
        var e = this.$element[0] == window ? "offset" : "position";
        this.offsets = t([]),
        this.targets = t([]);
        var i = this;
        this.$body.find(this.selector).map(function() {
            var o = t(this)
              , n = o.data("target") || o.attr("href")
              , s = /^#\w/.test(n) && t(n);
            return s && s.length && [[s[e]().top + (!t.isWindow(i.$scrollElement.get(0)) && i.$scrollElement.scrollTop()), n]] || null
        }).sort(function(t, e) {
            return t[0] - e[0]
        }).each(function() {
            i.offsets.push(this[0]),
            i.targets.push(this[1])
        })
    }
    ,
    e.prototype.process = function() {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset, i = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, o = i - this.$scrollElement.height(), n = this.offsets, s = this.targets, r = this.activeTarget;
        if (e >= o)
            return r != (t = s.last()[0]) && this.activate(t);
        for (t = n.length; t--; )
            r != s[t] && e >= n[t] && (!n[t + 1] || e <= n[t + 1]) && this.activate(s[t])
    }
    ,
    e.prototype.activate = function(e) {
        this.activeTarget = e,
        t(this.selector).parents(".active").removeClass("active");
        var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]'
          , o = t(i).parents("li").addClass("active");
        o.parent(".dropdown-menu").length && (o = o.closest("li.dropdown").addClass("active")),
        o.trigger("activate")
    }
    ;
    var i = t.fn.scrollspy;
    t.fn.scrollspy = function(i) {
        return this.each(function() {
            var o = t(this)
              , n = o.data("bs.scrollspy")
              , s = "object" == typeof i && i;
            n || o.data("bs.scrollspy", n = new e(this,s)),
            "string" == typeof i && n[i]()
        })
    }
    ,
    t.fn.scrollspy.Constructor = e,
    t.fn.scrollspy.noConflict = function() {
        return t.fn.scrollspy = i,
        this
    }
    ,
    t(window).on("load", function() {
        t('[data-spy="scroll"]').each(function() {
            var e = t(this);
            e.scrollspy(e.data())
        })
    })
}(jQuery),
function(t) {
    var e = function(e) {
        this.element = t(e)
    };
    e.prototype.show = function() {
        var e = this.element
          , i = e.closest("ul:not(.dropdown-menu)")
          , o = e.data("target");
        if (o || (o = e.attr("href"),
        o = o && o.replace(/.*(?=#[^\s]*$)/, "")),
        !e.parent("li").hasClass("active")) {
            var n = i.find(".active:last a")[0]
              , s = t.Event("show.bs.tab", {
                relatedTarget: n
            });
            if (e.trigger(s),
            !s.isDefaultPrevented()) {
                var r = t(o);
                this.activate(e.parent("li"), i),
                this.activate(r, r.parent(), function() {
                    e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: n
                    })
                })
            }
        }
    }
    ,
    e.prototype.activate = function(e, i, o) {
        function n() {
            s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),
            e.addClass("active"),
            r ? (e[0].offsetWidth,
            e.addClass("in")) : e.removeClass("fade"),
            e.parent(".dropdown-menu") && e.closest("li.dropdown").addClass("active"),
            o && o()
        }
        var s = i.find("> .active")
          , r = o && t.support.transition && s.hasClass("fade");
        r ? s.one(t.support.transition.end, n).emulateTransitionEnd(150) : n(),
        s.removeClass("in")
    }
    ;
    var i = t.fn.tab;
    t.fn.tab = function(i) {
        return this.each(function() {
            var o = t(this)
              , n = o.data("bs.tab");
            n || o.data("bs.tab", n = new e(this)),
            "string" == typeof i && n[i]()
        })
    }
    ,
    t.fn.tab.Constructor = e,
    t.fn.tab.noConflict = function() {
        return t.fn.tab = i,
        this
    }
    ,
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(e) {
        e.preventDefault(),
        t(this).tab("show")
    })
}(jQuery),
function(t) {
    var e = function(i, o) {
        this.options = t.extend({}, e.DEFAULTS, o),
        this.$window = t(window).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)),
        this.$element = t(i),
        this.affixed = this.unpin = null,
        this.checkPosition()
    };
    e.RESET = "affix affix-top affix-bottom",
    e.DEFAULTS = {
        offset: 0
    },
    e.prototype.checkPositionWithEventLoop = function() {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    }
    ,
    e.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var i = t(document).height()
              , o = this.$window.scrollTop()
              , n = this.$element.offset()
              , s = this.options.offset
              , r = s.top
              , a = s.bottom;
            "object" != typeof s && (a = r = s),
            "function" == typeof r && (r = s.top()),
            "function" == typeof a && (a = s.bottom());
            var l = !(null != this.unpin && o + this.unpin <= n.top) && (null != a && n.top + this.$element.height() >= i - a ? "bottom" : null != r && r >= o && "top");
            this.affixed !== l && (this.unpin && this.$element.css("top", ""),
            this.affixed = l,
            this.unpin = "bottom" == l ? n.top - o : null,
            this.$element.removeClass(e.RESET).addClass("affix" + (l ? "-" + l : "")),
            "bottom" == l && this.$element.offset({
                top: document.body.offsetHeight - a - this.$element.height()
            }))
        }
    }
    ;
    var i = t.fn.affix;
    t.fn.affix = function(i) {
        return this.each(function() {
            var o = t(this)
              , n = o.data("bs.affix")
              , s = "object" == typeof i && i;
            n || o.data("bs.affix", n = new e(this,s)),
            "string" == typeof i && n[i]()
        })
    }
    ,
    t.fn.affix.Constructor = e,
    t.fn.affix.noConflict = function() {
        return t.fn.affix = i,
        this
    }
    ,
    t(window).on("load", function() {
        t('[data-spy="affix"]').each(function() {
            var e = t(this)
              , i = e.data();
            i.offset = i.offset || {},
            i.offsetBottom && (i.offset.bottom = i.offsetBottom),
            i.offsetTop && (i.offset.top = i.offsetTop),
            e.affix(i)
        })
    })
}(jQuery),
function(t, e, i) {
    "undefined" != typeof module && module.exports ? module.exports = i() : "function" == typeof define && define.amd ? define(i) : e["jquery-scrollto"] = i()
}(0, this, function() {
    var t, e;
    return t = window.jQuery || require("jquery"),
    t.propHooks.scrollTop = t.propHooks.scrollLeft = {
        get: function(t, e) {
            var i = null;
            return "HTML" !== t.tagName && "BODY" !== t.tagName || ("scrollLeft" === e ? i = window.scrollX : "scrollTop" === e && (i = window.scrollY)),
            null == i && (i = t[e]),
            i
        }
    },
    t.Tween.propHooks.scrollTop = t.Tween.propHooks.scrollLeft = {
        get: function(e) {
            return t.propHooks.scrollTop.get(e.elem, e.prop)
        },
        set: function(t) {
            "HTML" === t.elem.tagName || "BODY" === t.elem.tagName ? (t.options.bodyScrollLeft = t.options.bodyScrollLeft || window.scrollX,
            t.options.bodyScrollTop = t.options.bodyScrollTop || window.scrollY,
            "scrollLeft" === t.prop ? t.options.bodyScrollLeft = Math.round(t.now) : "scrollTop" === t.prop && (t.options.bodyScrollTop = Math.round(t.now)),
            window.scrollTo(t.options.bodyScrollLeft, t.options.bodyScrollTop)) : t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
        }
    },
    e = {
        config: {
            duration: 400,
            easing: "swing",
            callback: void 0,
            durationMode: "each",
            offsetTop: 0,
            offsetLeft: 0
        },
        configure: function(i) {
            return t.extend(e.config, i || {}),
            this
        },
        scroll: function(i, o) {
            var n, s, r, a, l, h, p, c, d, f, u, v, m, g, y, b, w;
            return n = i.pop(),
            s = n.$container,
            r = n.$target,
            s.prop("tagName"),
            a = t("<span/>").css({
                position: "absolute",
                top: "0px",
                left: "0px"
            }),
            l = s.css("position"),
            s.css({
                position: "relative"
            }),
            a.appendTo(s),
            f = a.offset().top,
            u = r.offset().top,
            v = u - f - parseInt(o.offsetTop, 10),
            m = a.offset().left,
            g = r.offset().left,
            y = g - m - parseInt(o.offsetLeft, 10),
            h = s.prop("scrollTop"),
            p = s.prop("scrollLeft"),
            a.remove(),
            s.css({
                position: l
            }),
            b = {},
            w = function(t) {
                return 0 === i.length ? "function" == typeof o.callback && o.callback() : e.scroll(i, o),
                !0
            }
            ,
            o.onlyIfOutside && (c = h + s.height(),
            d = p + s.width(),
            h < v && v < c && (v = h),
            p < y && y < d && (y = p)),
            v !== h && (b.scrollTop = v),
            y !== p && (b.scrollLeft = y),
            s.prop("scrollHeight") === s.width() && delete b.scrollTop,
            s.prop("scrollWidth") === s.width() && delete b.scrollLeft,
            null != b.scrollTop || null != b.scrollLeft ? s.animate(b, {
                duration: o.duration,
                easing: o.easing,
                complete: w
            }) : w(),
            !0
        },
        fn: function(i) {
            var o, n, s, r;
            o = [];
            var a = t(this);
            if (0 === a.length)
                return this;
            for (n = t.extend({}, e.config, i),
            s = a.parent(),
            r = s.get(0); 1 === s.length && r !== document.body && r !== document; ) {
                var l, h;
                l = "visible" !== s.css("overflow-y") && r.scrollHeight !== r.clientHeight,
                h = "visible" !== s.css("overflow-x") && r.scrollWidth !== r.clientWidth,
                (l || h) && (o.push({
                    $container: s,
                    $target: a
                }),
                a = s),
                s = s.parent(),
                r = s.get(0)
            }
            return o.push({
                $container: t("html"),
                $target: a
            }),
            "all" === n.durationMode && (n.duration /= o.length),
            e.scroll(o, n),
            this
        }
    },
    t.ScrollTo = t.ScrollTo || e,
    t.fn.ScrollTo = t.fn.ScrollTo || e.fn,
    e
}),
function() {
    var t, e, i, o, n, s = function(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    }, r = [].indexOf || function(t) {
        for (var e = 0, i = this.length; i > e; e++)
            if (e in this && this[e] === t)
                return e;
        return -1
    }
    ;
    e = function() {
        function t() {}
        return t.prototype.extend = function(t, e) {
            var i, o;
            for (i in e)
                o = e[i],
                null == t[i] && (t[i] = o);
            return t
        }
        ,
        t.prototype.isMobile = function(t) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)
        }
        ,
        t.prototype.createEvent = function(t, e, i, o) {
            var n;
            return null == e && (e = !1),
            null == i && (i = !1),
            null == o && (o = null),
            null != document.createEvent ? (n = document.createEvent("CustomEvent"),
            n.initCustomEvent(t, e, i, o)) : null != document.createEventObject ? (n = document.createEventObject(),
            n.eventType = t) : n.eventName = t,
            n
        }
        ,
        t.prototype.emitEvent = function(t, e) {
            return null != t.dispatchEvent ? t.dispatchEvent(e) : e in (null != t) ? t[e]() : "on" + e in (null != t) ? t["on" + e]() : void 0
        }
        ,
        t.prototype.addEvent = function(t, e, i) {
            return null != t.addEventListener ? t.addEventListener(e, i, !1) : null != t.attachEvent ? t.attachEvent("on" + e, i) : t[e] = i
        }
        ,
        t.prototype.removeEvent = function(t, e, i) {
            return null != t.removeEventListener ? t.removeEventListener(e, i, !1) : null != t.detachEvent ? t.detachEvent("on" + e, i) : delete t[e]
        }
        ,
        t.prototype.innerHeight = function() {
            return "innerHeight"in window ? window.innerHeight : document.documentElement.clientHeight
        }
        ,
        t
    }(),
    i = this.WeakMap || this.MozWeakMap || (i = function() {
        function t() {
            this.keys = [],
            this.values = []
        }
        return t.prototype.get = function(t) {
            var e, i, o, n;
            for (n = this.keys,
            e = i = 0,
            o = n.length; o > i; e = ++i)
                if (n[e] === t)
                    return this.values[e]
        }
        ,
        t.prototype.set = function(t, e) {
            var i, o, n, s;
            for (s = this.keys,
            i = o = 0,
            n = s.length; n > o; i = ++o)
                if (s[i] === t)
                    return void (this.values[i] = e);
            return this.keys.push(t),
            this.values.push(e)
        }
        ,
        t
    }()),
    t = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (t = function() {
        function t() {
            "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."),
            "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
        }
        return t.notSupported = !0,
        t.prototype.observe = function() {}
        ,
        t
    }()),
    o = this.getComputedStyle || function(t) {
        return this.getPropertyValue = function(e) {
            var i;
            return "float" === e && (e = "styleFloat"),
            n.test(e) && e.replace(n, function(t, e) {
                return e.toUpperCase()
            }),
            (null != (i = t.currentStyle) ? i[e] : void 0) || null
        }
        ,
        this
    }
    ,
    n = /(\-([a-z]){1})/g,
    this.WOW = function() {
        function n(t) {
            null == t && (t = {}),
            this.scrollCallback = s(this.scrollCallback, this),
            this.scrollHandler = s(this.scrollHandler, this),
            this.resetAnimation = s(this.resetAnimation, this),
            this.start = s(this.start, this),
            this.scrolled = !0,
            this.config = this.util().extend(t, this.defaults),
            this.animationNameCache = new i,
            this.wowEvent = this.util().createEvent(this.config.boxClass)
        }
        return n.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null
        },
        n.prototype.init = function() {
            var t;
            return this.element = window.document.documentElement,
            "interactive" === (t = document.readyState) || "complete" === t ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start),
            this.finished = []
        }
        ,
        n.prototype.start = function() {
            var e, i, o, n;
            if (this.stopped = !1,
            this.boxes = function() {
                var t, i, o, n;
                for (o = this.element.querySelectorAll("." + this.config.boxClass),
                n = [],
                t = 0,
                i = o.length; i > t; t++)
                    e = o[t],
                    n.push(e);
                return n
            }
            .call(this),
            this.all = function() {
                var t, i, o, n;
                for (o = this.boxes,
                n = [],
                t = 0,
                i = o.length; i > t; t++)
                    e = o[t],
                    n.push(e);
                return n
            }
            .call(this),
            this.boxes.length)
                if (this.disabled())
                    this.resetStyle();
                else
                    for (n = this.boxes,
                    i = 0,
                    o = n.length; o > i; i++)
                        e = n[i],
                        this.applyStyle(e, !0);
            return this.disabled() || (this.util().addEvent(window, "scroll", this.scrollHandler),
            this.util().addEvent(window, "resize", this.scrollHandler),
            this.interval = setInterval(this.scrollCallback, 50)),
            this.config.live ? new t(function(t) {
                return function(e) {
                    var i, o, n, s, r;
                    for (r = [],
                    i = 0,
                    o = e.length; o > i; i++)
                        s = e[i],
                        r.push(function() {
                            var t, e, i, o;
                            for (i = s.addedNodes || [],
                            o = [],
                            t = 0,
                            e = i.length; e > t; t++)
                                n = i[t],
                                o.push(this.doSync(n));
                            return o
                        }
                        .call(t));
                    return r
                }
            }(this)).observe(document.body, {
                childList: !0,
                subtree: !0
            }) : void 0
        }
        ,
        n.prototype.stop = function() {
            return this.stopped = !0,
            this.util().removeEvent(window, "scroll", this.scrollHandler),
            this.util().removeEvent(window, "resize", this.scrollHandler),
            null != this.interval ? clearInterval(this.interval) : void 0
        }
        ,
        n.prototype.sync = function() {
            return t.notSupported ? this.doSync(this.element) : void 0
        }
        ,
        n.prototype.doSync = function(t) {
            var e, i, o, n, s;
            if (null == t && (t = this.element),
            1 === t.nodeType) {
                for (t = t.parentNode || t,
                n = t.querySelectorAll("." + this.config.boxClass),
                s = [],
                i = 0,
                o = n.length; o > i; i++)
                    e = n[i],
                    r.call(this.all, e) < 0 ? (this.boxes.push(e),
                    this.all.push(e),
                    this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(e, !0),
                    s.push(this.scrolled = !0)) : s.push(void 0);
                return s
            }
        }
        ,
        n.prototype.show = function(t) {
            return this.applyStyle(t),
            t.className = t.className + " " + this.config.animateClass,
            null != this.config.callback && this.config.callback(t),
            this.util().emitEvent(t, this.wowEvent),
            this.util().addEvent(t, "animationend", this.resetAnimation),
            this.util().addEvent(t, "oanimationend", this.resetAnimation),
            this.util().addEvent(t, "webkitAnimationEnd", this.resetAnimation),
            this.util().addEvent(t, "MSAnimationEnd", this.resetAnimation),
            t
        }
        ,
        n.prototype.applyStyle = function(t, e) {
            var i, o, n;
            return o = t.getAttribute("data-wow-duration"),
            i = t.getAttribute("data-wow-delay"),
            n = t.getAttribute("data-wow-iteration"),
            this.animate(function(s) {
                return function() {
                    return s.customStyle(t, e, o, i, n)
                }
            }(this))
        }
        ,
        n.prototype.animate = function() {
            return "requestAnimationFrame"in window ? function(t) {
                return window.requestAnimationFrame(t)
            }
            : function(t) {
                return t()
            }
        }(),
        n.prototype.resetStyle = function() {
            var t, e, i, o, n;
            for (o = this.boxes,
            n = [],
            e = 0,
            i = o.length; i > e; e++)
                t = o[e],
                n.push(t.style.visibility = "visible");
            return n
        }
        ,
        n.prototype.resetAnimation = function(t) {
            var e;
            return t.type.toLowerCase().indexOf("animationend") >= 0 ? (e = t.target || t.srcElement,
            e.className = e.className.replace(this.config.animateClass, "").trim()) : void 0
        }
        ,
        n.prototype.customStyle = function(t, e, i, o, n) {
            return e && this.cacheAnimationName(t),
            t.style.visibility = e ? "hidden" : "visible",
            i && this.vendorSet(t.style, {
                animationDuration: i
            }),
            o && this.vendorSet(t.style, {
                animationDelay: o
            }),
            n && this.vendorSet(t.style, {
                animationIterationCount: n
            }),
            this.vendorSet(t.style, {
                animationName: e ? "none" : this.cachedAnimationName(t)
            }),
            t
        }
        ,
        n.prototype.vendors = ["moz", "webkit"],
        n.prototype.vendorSet = function(t, e) {
            var i, o, n, s;
            o = [];
            for (i in e)
                n = e[i],
                t["" + i] = n,
                o.push(function() {
                    var e, o, r, a;
                    for (r = this.vendors,
                    a = [],
                    e = 0,
                    o = r.length; o > e; e++)
                        s = r[e],
                        a.push(t["" + s + i.charAt(0).toUpperCase() + i.substr(1)] = n);
                    return a
                }
                .call(this));
            return o
        }
        ,
        n.prototype.vendorCSS = function(t, e) {
            var i, n, s, r, a, l;
            for (a = o(t),
            r = a.getPropertyCSSValue(e),
            s = this.vendors,
            i = 0,
            n = s.length; n > i; i++)
                l = s[i],
                r = r || a.getPropertyCSSValue("-" + l + "-" + e);
            return r
        }
        ,
        n.prototype.animationName = function(t) {
            var e;
            try {
                e = this.vendorCSS(t, "animation-name").cssText
            } catch (i) {
                e = o(t).getPropertyValue("animation-name")
            }
            return "none" === e ? "" : e
        }
        ,
        n.prototype.cacheAnimationName = function(t) {
            return this.animationNameCache.set(t, this.animationName(t))
        }
        ,
        n.prototype.cachedAnimationName = function(t) {
            return this.animationNameCache.get(t)
        }
        ,
        n.prototype.scrollHandler = function() {
            return this.scrolled = !0
        }
        ,
        n.prototype.scrollCallback = function() {
            var t;
            return !this.scrolled || (this.scrolled = !1,
            this.boxes = function() {
                var e, i, o, n;
                for (o = this.boxes,
                n = [],
                e = 0,
                i = o.length; i > e; e++)
                    (t = o[e]) && (this.isVisible(t) ? this.show(t) : n.push(t));
                return n
            }
            .call(this),
            this.boxes.length || this.config.live) ? void 0 : this.stop()
        }
        ,
        n.prototype.offsetTop = function(t) {
            for (var e; void 0 === t.offsetTop; )
                t = t.parentNode;
            for (e = t.offsetTop; t = t.offsetParent; )
                e += t.offsetTop;
            return e
        }
        ,
        n.prototype.isVisible = function(t) {
            var e, i, o, n, s;
            return i = t.getAttribute("data-wow-offset") || this.config.offset,
            s = window.pageYOffset,
            n = s + Math.min(this.element.clientHeight, this.util().innerHeight()) - i,
            o = this.offsetTop(t),
            e = o + t.clientHeight,
            n >= o && e >= s
        }
        ,
        n.prototype.util = function() {
            return null != this._util ? this._util : this._util = new e
        }
        ,
        n.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }
        ,
        n
    }()
}
.call(this),
function(t) {
    t(document).ready(function() {
        t("div.views-field-field-more-about-teamie").find("#sliderPage3").click(function() {
            t(".sliderPage3").ScrollTo()
        })
    })
}(jQuery),
function(t) {
    Drupal.FieldGroup = Drupal.FieldGroup || {},
    Drupal.FieldGroup.Effects = Drupal.FieldGroup.Effects || {},
    Drupal.FieldGroup.groupWithfocus = null,
    Drupal.FieldGroup.setGroupWithfocus = function(t) {
        t.css({
            display: "block"
        }),
        Drupal.FieldGroup.groupWithfocus = t
    }
    ,
    Drupal.FieldGroup.Effects.processFieldset = {
        execute: function(e, i, o) {
            "form" == o && t("fieldset.fieldset", e).once("fieldgroup-effects", function(e) {
                t(this).is(".required-fields") && t(this).find(".form-required").length > 0 && t("legend span.fieldset-legend", t(this)).eq(0).append(" ").append(t(".form-required").eq(0).clone()),
                t(".error", t(this)).length && (t("legend span.fieldset-legend", t(this)).eq(0).addClass("error"),
                Drupal.FieldGroup.setGroupWithfocus(t(this)))
            })
        }
    },
    Drupal.FieldGroup.Effects.processAccordion = {
        execute: function(e, i, o) {
            t("div.field-group-accordion-wrapper", e).once("fieldgroup-effects", function() {
                var e = t(this);
                if (e.accordion({
                    autoHeight: !1,
                    active: ".field-group-accordion-active",
                    collapsible: !0,
                    changestart: function(e, i) {
                        t(this).hasClass("effect-none") ? i.options.animated = !1 : i.options.animated = "slide"
                    }
                }),
                "form" == o) {
                    var i = !1;
                    e.find("div.field-group-accordion-item").each(function(e) {
                        t(this).is(".required-fields") && t(this).find(".form-required").length > 0 && t("h3.ui-accordion-header a").eq(e).append(" ").append(t(".form-required").eq(0).clone()),
                        t(".error", t(this)).length && (i || (i = t(this).parent().accordion("activate", e)),
                        t("h3.ui-accordion-header").eq(e).addClass("error"))
                    }),
                    i || t(".ui-accordion-content-active", i).css({
                        height: "auto",
                        width: "auto",
                        display: "block"
                    })
                }
            })
        }
    },
    Drupal.FieldGroup.Effects.processHtabs = {
        execute: function(e, i, o) {
            "form" == o && t("fieldset.horizontal-tabs-pane", e).once("fieldgroup-effects", function(e) {
                t(this).is(".required-fields") && t(this).find(".form-required").length > 0 && t(this).data("horizontalTab").link.find("strong:first").after(t(".form-required").eq(0).clone()).after(" "),
                t(".error", t(this)).length && (t(this).data("horizontalTab").link.parent().addClass("error"),
                Drupal.FieldGroup.setGroupWithfocus(t(this)),
                t(this).data("horizontalTab").focus())
            })
        }
    },
    Drupal.FieldGroup.Effects.processTabs = {
        execute: function(e, i, o) {
            "form" == o && t("fieldset.vertical-tabs-pane", e).once("fieldgroup-effects", function(e) {
                t(this).is(".required-fields") && t(this).find(".form-required").length > 0 && t(this).data("verticalTab").link.find("strong:first").after(t(".form-required").eq(0).clone()).after(" "),
                t(".error", t(this)).length && (t(this).data("verticalTab").link.parent().addClass("error"),
                Drupal.FieldGroup.setGroupWithfocus(t(this)),
                t(this).data("verticalTab").focus())
            })
        }
    },
    Drupal.FieldGroup.Effects.processDiv = {
        execute: function(e, i, o) {
            t("div.collapsible", e).once("fieldgroup-effects", function() {
                var e = t(this)
                  , i = t("span.field-group-format-toggler:first", e)
                  , o = t('<a class="field-group-format-title" href="#"></a>');
                o.prepend(i.contents()),
                t(this).is(".required-fields") && t(this).find(".form-required").length > 0 && o.append(" ").append(t(".form-required").eq(0).clone()),
                o.appendTo(i),
                o.click(function() {
                    var i = e.get(0);
                    if (!i.animating) {
                        i.animating = !0;
                        var o = e.hasClass("speed-fast") ? 300 : 1e3;
                        e.hasClass("effect-none") && e.hasClass("speed-none") ? t("> .field-group-format-wrapper", i).toggle() : e.hasClass("effect-blind") ? t("> .field-group-format-wrapper", i).toggle("blind", {}, o) : t("> .field-group-format-wrapper", i).toggle(o),
                        i.animating = !1
                    }
                    return e.toggleClass("collapsed"),
                    !1
                })
            })
        }
    },
    Drupal.behaviors.fieldGroup = {
        attach: function(e, i) {
            void 0 != i.field_group && (t.each(Drupal.FieldGroup.Effects, function(o) {
                var n = o.toLowerCase().replace("process", "");
                void 0 != i.field_group[n] && t.isFunction(this.execute) && this.execute(e, i, i.field_group[n])
            }),
            t(".fieldset-wrapper .fieldset > legend").css({
                display: "block"
            }),
            t(".vertical-tabs fieldset.fieldset").addClass("default-fallback"),
            t(".group-wrapper fieldset").each(function() {
                var e = "field_group-" + t(this).attr("id") + " " + t(this).attr("id");
                t(this).attr("id", e)
            }),
            t(".group-wrapper ul li").each(function() {
                var e = t(this).index();
                t(this).children("a").click(function() {
                    var i = t(".group-wrapper fieldset").get(e)
                      , o = t(i).attr("id").replace(/^field_group-/, "").split(" ")[0];
                    window.location.hash = o
                })
            }))
        }
    }
}(jQuery);
