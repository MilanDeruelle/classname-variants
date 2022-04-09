import { ComponentProps, ElementType, ForwardRefExoticComponent, PropsWithoutRef } from "react";
import { Variants, VariantsConfig, VariantOptions, Simplify } from "./index.js";
/**
 * Utility type to infer the first argument of a variantProps function.
 */
export declare type VariantPropsOf<T> = T extends (props: infer P) => any ? P : never;
/**
 * Type for the variantProps() argument – consists of the VariantOptions and an optional className for chaining.
 */
declare type VariantProps<C extends VariantsConfig<V>, V extends Variants = C["variants"]> = VariantOptions<C> & {
    className?: string;
};
export declare function variantProps<C extends VariantsConfig<V>, V extends Variants = C["variants"]>(config: Simplify<C>): <P extends VariantProps<C, C["variants"]>>(props: P) => {
    className: string;
} & Omit<P, keyof C["variants"]>;
declare type StyledComponent<T extends ElementType, C extends VariantsConfig<V>, V extends Variants = C["variants"]> = ForwardRefExoticComponent<PropsWithoutRef<ComponentProps<T> & VariantOptions<C>> & React.RefAttributes<T>>;
export declare function styled<T extends ElementType, C extends VariantsConfig<V>, V extends Variants = C["variants"]>(type: T, config: Simplify<C>): StyledComponent<T, C>;
export {};
