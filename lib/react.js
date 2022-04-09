import { createElement, forwardRef, } from "react";
import { variants, } from "./index.js";
export function variantProps(config) {
    const variantClassName = variants(config);
    return (props) => {
        const result = {};
        // Pass-through all unrelated props
        for (let prop in props) {
            if (config.variants && !(prop in config.variants)) {
                result[prop] = props[prop];
            }
        }
        // Add the optionally passed className prop for chaining
        result.className = [props.className, variantClassName(props)]
            .filter(Boolean)
            .join(" ");
        return result;
    };
}
export function styled(type, config) {
    const styledProps = variantProps(config);
    return forwardRef((props, ref) => createElement(type, Object.assign(Object.assign({}, styledProps(props)), { ref })));
}
