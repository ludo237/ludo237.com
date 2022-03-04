import React from "react";
import { Link as BaseLink, LinkProps as BaseLinkProps } from "@remix-run/react";
import cx from "clsx";
import { createMemoClass } from "~/utils";

export interface LinkProps extends BaseLinkProps {
  color?: "gray";
  disabled?: boolean;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  size?: "base";
}

export const useLinkClass = createMemoClass((props: LinkProps) => {
  const colors = {
    gray: "text-slate-900 dark:text-white hover:text-slate-600 dark:hover:text-slate-200",
  };

  const sizes = {
    base: "sm:text-base lg:text-sm xl:text-base",
  };

  return cx(
    "transition-colors transform ease-in-out duration-150 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
    sizes[props.size ?? "base"],
    colors[props.color ?? "gray"],
  );
});

export default function Link (props: LinkProps) {
  const {
    children,
    className,
    color,
    disabled,
    leftIcon,
    rightIcon,
    size,
    to,
    ...rest
  } = props;

  const classes = useLinkClass({
    color,
    size,
  });

  return (
    <BaseLink
      aria-disabled={disabled}
      to={to}
      className={cx(classes, className)}
      {...rest}
    >
      {leftIcon ? leftIcon : null}
      {children}
      {rightIcon ? rightIcon : null}
    </BaseLink>
  );
}
