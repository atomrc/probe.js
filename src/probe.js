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
        win = window,
        RECT_STATES = {
            VISIBLE: 1,
            PARTIALLY_VISIBLE: 0,
            HIDDEN: -1
        };

    /**
     * computeState - give the state of the given rectangle
     * state tells whether the rect is visible or not on the user's screen
     * it also tells whether the rect is fully or partially visible 
     * on the user's screen
     *
     * @param {Object} rect - the rectangle which state is to be computed
     * @param {Number} viewportHeight - the viewport height
     * @return {Number} - the current state of the rect
     */
    var computeState = function (rect, viewportHeight) {
        if (
            (rect.bottom > 0 && rect.top < 0) ||
            (rect.top < viewportHeight && rect.bottom > viewportHeight)
        ) {
            return RECT_STATES.PARTIALLY_VISIBLE;
        }

        if (
            rect.bottom > 0 &&
            rect.top > 0 &&
            rect.top < viewportHeight &&
            rect.bottom < viewportHeight
        ) {
            return RECT_STATES.VISIBLE;
        }

        return RECT_STATES.HIDDEN;
    };

    /**
     * computeEvents - will compute all the events that need to be fired
     *
     * @param {Object} oldRect - the old coordinates of the probe
     * @param {Object} newRect - the new coordinates of the probe
     * @param {Number} viewportHeight - the height of the current viewport
     * @return {Object} - the object containing all the events
     */
    var computeEvents = function (oldRect, newRect, viewportHeight) {
        var states = {
            current: computeState(newRect, viewportHeight),
            previous: computeState(oldRect, viewportHeight)
        };

        return {
            onAppearStart:
                states.previous === RECT_STATES.HIDDEN &&
                states.current !== RECT_STATES.HIDDEN,

            onAppearEnd: states.previous !== RECT_STATES.VISIBLE &&
                states.current === RECT_STATES.VISIBLE,

            onDisappearStart: states.previous === RECT_STATES.VISIBLE &&
                states.current !== RECT_STATES.VISIBLE,

            onDisappearEnd: states.previous !== RECT_STATES.HIDDEN &&
                states.current === RECT_STATES.HIDDEN
        };
    };

    var probe = function (element, config) {
        var viewportHeight = win.innerHeight,
            oldRect = element.getBoundingClientRect(),
            blockedEvents = {},

            handleScroll = function () {
                var rect = element.getBoundingClientRect(),
                    events = computeEvents(oldRect, rect, viewportHeight);

                oldRect = rect;
                for (var i in events) {
                    var ev = events[i];
                    if (blockedEvents[i] !== false && ev) {
                        blockedEvents[i] = config[i] && config[i]();
                    }
                }
            };

        win.addEventListener("scroll", handleScroll);
        handleScroll();
    };

    return probe;
}));
