import cx from "clsx";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import { createMemoClass } from "~/utils";
import Label from "~/components/Label";

type InputGroupProps = {
  children: React.ReactNode
  color?: "gray" | "red",
  error?: string[],
  label: string,
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const useInputGroupClass = createMemoClass((props: InputGroupProps) => {
  const defaultStyle = [
    "relative",
    "border",
    "rounded-md",
    "px-3",
    "py-2.5",
    "shadow-sm",
    "focus-within:ring-1",
  ];

  const gray = [
    "border-slate-300",
    "focus-within:ring-sky-600",
    "focus-within:border-sky-600",
  ];

  const red = [
    "border-red-500",
    "focus-within:ring-red-600",
    "focus-within:border-red-600",
  ];

  const colors = {
    gray: gray.join(" "),
    red: red.join(" "),
  };

  return cx(
    defaultStyle.join(" "),
    colors[props.color ?? "gray"],
  );
});

export default function InputGroup (props: InputGroupProps) {
  const {
    className,
    children,
    error,
    label,
  } = props;
  const color = error ? "red" : "gray";
  const classes = useInputGroupClass({ color });

  return (
    <div
      className={cx(classes, className)}
    >
      <Label htmlFor={label}>
        {label}
      </Label>
      {children}

      {error
        ? <small className="text-xs text-red-500">{error}</small>
        : null
      }
    </div>
  );
}
