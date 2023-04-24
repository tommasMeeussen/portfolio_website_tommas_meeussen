import { spring } from "popmotion";
import { mix } from "@popmotion/popcorn";
import { debounce } from "lodash";

const deltaThreshold = 5;
const elasticFactor = 0.2;

const springTo = (value, from, to) => {
    if (value.isAnimating()) return;

    value.start(complete => {
        const animation = spring({
            from,
            to,
            velocity: value.getVelocity(),
            stiffness: 400,
            damping: 40
        }).start({
            update: (v) => value.set(v),
            complete
        });

        return () => animation.stop();
    });
}

const debouncedSpringTo = debounce(springTo, 100);

export const useWheelScroll = (
    ref,
    y,
    constraints,
    onWheelCallback,
    isActive
) => {
    const onWheel = (event) => {
        event.preventDefault();

        const currentY = y.get();
        let newY = currentY - event.deltaY;
        let startedAnimation = false;
        const isWithinBounds =
            constraints && newY >= constraints.top && newY <= constraints.bottom;

        if (constraints && !isWithinBounds) {
            newY = mix(currentY, newY, elasticFactor);

            if (newY < constraints.top) {
                if (event.deltaY <= deltaThreshold) {
                    springTo(y, newY, constraints.top);
                    startedAnimation = true;
                } else {
                    debouncedSpringTo(y, newY, constraints.top);
                }
            }

            if (newY > constraints.bottom) {
                if (event.deltaY >= -deltaThreshold) {
                    springTo(y, newY, constraints.bottom);
                    startedAnimation = true;
                } else {
                    debouncedSpringTo(y, newY, constraints.bottom);
                }
            }
        }

        if (!startedAnimation) {
            y.stop();
            y.set(newY);
        } else {
            debouncedSpringTo.cancel();
        }

        onWheelCallback(event);
    };

    if (isActive) {
        ref.addEventListener("wheel", onWheel, { passive: false });
    }

    return () => {
        ref.removeEventListener("wheel", onWheel, { passive: false });
    };
}
