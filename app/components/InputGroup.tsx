import React from "react";
import Label from "~/components/Label";

type InputGroupProps = {
  label: string,
  error?: string[],
  children: React.ReactNode
};

export default function InputGroupProps (props: InputGroupProps) {
  const { children, label } = props;

  return (
    <div
      className="relative border border-slate-300 rounded-md px-3 py-2.5 shadow-sm focus-within:ring-1 focus-within:ring-sky-600 focus-within:border-sky-600"
    >
      <Label htmlFor={label}>
        {label}
      </Label>
      {children}
    </div>
  );
}
