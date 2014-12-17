/*global window, define, exports, module*/

(function (root, factory) {
    "use strict";
     if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.probe = factory();
    }
}(window, function () {
    "use strict";
    var nop = function () {},
        win = window;

    /**
     * computeEvents - will compute all the events that need to be fired
     *
     * @param {Object} oldRect - the old coordinates of the probe
     * @param {Object} newRect - the new coordinates of the probe
     * @param {Number} viewportHeight - the height of the current viewport
     * @return {Object} - the object containing all the events
     */
    var computeEvents = function (oldRect, newRect, viewportHeight) {
        return {
            onTopHitTop: {
                shouldFire: newRect.top !== 0 && (oldRect.top * newRect.top) <= 0,
                visible: newRect.top >= 0
            },
            onBottomHitTop: {
                shouldFire: newRect.bottom !== 0 && (oldRect.bottom * newRect.bottom) <= 0,
                visible: newRect.bottom >= 0
            },
            onTopHitBottom: {
                shouldFire: newRect.top !== 0 && ((oldRect.top - viewportHeight) * (newRect.top - viewportHeight)) <= 0,
                visible: newRect.top - viewportHeight >= 0
            },
            onBottomHitBottom: {
                shouldFire: newRect.bottom !== 0 && ((oldRect.bottom - viewportHeight) * (newRect.bottom - viewportHeight)) <= 0,
                visible: newRect.bottom - viewportHeight >= 0
            }
        };
    };

    var probe = function (element, config) {
        var viewportHeight = win.innerHeight,
            oldRect = element.getBoundingClientRect(),

            conf = {
                onTopHitTop: config.onTopHitTop || nop,
                onBottomHitTop: config.onBottomHitTop || nop,
                onTopHitBottom: config.onTopHitBottom || nop,
                onBottomHitBottom: config.onBottomHitBottom || nop
            },

            handleScroll = function () {
                var rect = element.getBoundingClientRect(),
                    events = computeEvents(oldRect, rect, viewportHeight);

                for (var i in events) {
                    if (events[i].shouldFire) {
                        conf[i](events[i].visible);
                    }
                }
                oldRect = rect;
            };

        win.addEventListener("scroll", handleScroll);
        handleScroll();
    };

    return probe;
}));
