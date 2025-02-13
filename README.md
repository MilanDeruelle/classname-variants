# classname-variants

Stitches-like [variant API](https://stitches.dev/docs/variants) for plain class names.

The library is framework agnostic and can be used with any kind of CSS flavor.

It is especially useful though if used with [Tailwind](https://tailwindcss.com/) and React, as it provides some [dedicated helpers](#React) and even allows for a _styled-components_ like API, but with [class names instead of styles](#bonus-styled-components-but-with-class-names-)!

[![Edit classname-variants/react](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/classname-variants-react-3bzjl?fontsize=14&hidenavigation=1&theme=dark)

# Basics

Let's aussume we want to build a button component with Tailwind CSS that comes in different sizes and colors.

It consists of some _base classes_ that are always present as well as some optional classes that need to be added depending on the desired _variants_.

```tsx
const button = variants({
  base: "rounded text-white",
  variants: {
    color: {
      brand: "bg-sky-500",
      accent: "bg-teal-500",
    },
    size: {
      small: "px-5 py-3 text-xs",
      large: "px-6 py-4 text-base",
    },
  },
});
```

The result is a function that expects an object which specifies what variants should be selected. When called, it returns a string containing the respective class names:

```ts
document.write(`
  <button class="${button({
    color: "accent",
    size: "large",
  })}">
    Click Me!
  </button>
`);
```

# Advanced Usage

## Boolean variants

Variants can be of type `boolean` by using `"true"` as the key:

```tsx
const button = variants({
  base: "text-white",
  variants: {
    rounded: {
      true: "rounded-full",
    },
  },
});
```

## Compound variants

The `compoundVariants` option can be used to apply class names based on a combination of other variants.

```tsx
const button = variants({
  variants: {
    color: {
      neutral: "bg-gray-200",
      accent: "bg-teal-400",
    },
    outlined: {
      true: "border-2",
    },
  },
  compoundVariants: [
    {
      variants: {
        color: "accent",
        outlined: true,
      },
      className: "border-teal-500",
    },
  ],
});
```

## Default variants

The `defaultVariants` option can be used to select a variant by default:

```ts
const button = variants({
  variants: {
    color: {
      neutral: "bg-gray-200",
      accent: "bg-teal-400",
    },
  },
  defaultVariants: {
    color: "neutral",
  },
});
```

# React

The library contains utility functions that are useful for writing React components.

It works much like `variants()` but instead of a class name string, the resulting function returns an object with props.

```ts
import { variantProps } from "classname-variants/react";

const buttonProps = variantProps({
  base: "rounded-md text-white",
  variants: {
    color: {
      brand: "bg-sky-500",
      accent: "bg-teal-500",
    },
    size: {
      small: "px-5 py-3 text-xs",
      large: "px-6 py-4 text-base",
    },
    rounded: {
      true: "rounded-full",
    },
  },
  defaultVariants: {
    color: "brand",
  },
});
```

This way a compontents' props (or part of them) can be directly spread into the target element. All variant-related props are used to construct the `className` property while all other props are passed through verbatim:

```tsx
type Props = SX.IntrinsicElements["button"] &
  VariantPropsOf<typeof buttonProps>;

function Button(props: Props) {
  return <button {...buttonProps(props)} />;
}

function App() {
  return (
    <Button size="small" color="accent" onClick={console.log}>
      Click Me!
    </Button>
  );
}
```

# Bonus: styled-components, but with class names 💅

Things can be taken even a step further, resulting in a _styled-components_ like way of defining reusable components:

```tsx
import { styled } from "classname-variants/react";

const Button = styled("button", {
  variants: {
    size: {
      small: "text-xs",
      large: "text-base",
    },
  },
});
```

You can also style other custom React components as long as the accept a `className` prop.

# Tailwind IntelliSense

In order to get auto-completion for the CSS classes themselves, you can use the [Tailwind CSS IntelliSense](https://github.com/tailwindlabs/tailwindcss-intellisense) plugin for VS Code. In order to make it recognize the strings inside your variants config, you have to somehow mark them and configure the plugin accordingly.

One way of doing so is by using tagged template literals:

```ts
const tw = String.raw;

const button = variants({
  base: tw`px-5 py-2 text-white`,
  variants: {
    color: {
      neutral: tw`bg-slate-500 hover:bg-slate-400`,
      accent: tw`bg-teal-500 hover:bg-teal-400`,
    },
  },
});
```

```ts
const tw = String.raw;

const button = variants({
  base: tw.px(5).py(2).text.white,
  variants: {
    color: {
      neutral: tw.bg.slate(500).hover(tw.bg.slate.400),
      accent: tw.bg.teal(500).hover(tw.bg.teal(400)),
    },
  },
});
```

You can then add the following line to your `settings.json`:

```
"tailwindCSS.experimental.classRegex": ["tw`(.+?)`"]
```

In order to get type coverage even for your Tailwind classes you can use a tool like [tailwind-ts](https://github.com/mathieutu/tailwind-ts).

# License

MIT
