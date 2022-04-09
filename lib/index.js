export function variants(config) {
    const { base, variants, compoundVariants, defaultVariants } = config;
    const isBooleanVariant = (name) => {
        const v = variants === null || variants === void 0 ? void 0 : variants[name];
        return v && ("false" in v || "true" in v);
    };
    return (props) => {
        var _a;
        const res = [base];
        const getSelected = (name) => {
            var _a, _b;
            return (_b = (_a = props[name]) !== null && _a !== void 0 ? _a : defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[name]) !== null && _b !== void 0 ? _b : (isBooleanVariant(name) ? false : undefined);
        };
        for (let name in variants) {
            const selected = getSelected(name);
            if (selected !== undefined)
                res.push((_a = variants[name]) === null || _a === void 0 ? void 0 : _a[selected]);
        }
        for (let { variants, className } of compoundVariants !== null && compoundVariants !== void 0 ? compoundVariants : []) {
            const isSelected = (name) => getSelected(name) === variants[name];
            if (Object.keys(variants).every(isSelected)) {
                res.push(className);
            }
        }
        return res.filter(Boolean).join(" ");
    };
}
