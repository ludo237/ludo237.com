import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import cx from "clsx";
import { createMemoClass } from "~/utils";

type ButtonProps = {
  color?: "sky";
  size?: "sm" | "base";
  loading?: boolean;
  loadingText?: string;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const useButtonClass = createMemoClass((props: ButtonProps) => {
  const defaultStyle = [
    "transition-colors",
    "inline-flex",
    "items-center",
    "border",
    "shadow-sm",
    "rounded-md",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "ease-in-out",
    "duration-150",
    "cursor-pointer",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
  ];

  const sky = [
    "border-sky-500",
    "text-white",
    "dark:text-slate-50",
    "bg-sky-500",
    "hover:bg-sky-600",
    "dark:bg-sky-700",
    "dark:hover:bg-sky-800",
    "focus:border-sky-600",
    "dark:focus:border-sky-800",
    "focus:ring-sky",
  ];

  const colors = {
    sky: sky.join(" "),
  };

  const sizes = {
    sm: "font-medium text-sm px-1.5 py-3",
    base: "font-medium text-base leading-5 py-2 px-4",
  };

  return cx(
    defaultStyle.join(" "),
    sizes[props.size ?? "base"],
    colors[props.color ?? "sky"],
  );
});

export default function Button (props: ButtonProps) {
  const {
    color = "sky",
    size = "base",
    loadingText,
    disabled,
    loading,
    children,
    className,
    ...rest
  } = props;

  const isDisabled = disabled || loading;
  const classes = useButtonClass({
    color,
    size,
  });

  return (
    <button
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      className={cx(classes, className)}
      {...rest}
    >
      {loading
        ? loadingText || children
        : children
      }
    </button>
  );
}

