import type { DetailedHTMLProps, LabelHTMLAttributes } from "react";

export default function Label (props: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>) {
  const {
    children,
    htmlFor,
    ...rest
  } = props;

  return (
    <label
      htmlFor={htmlFor}
      className={"absolute -top-2 left-2 -mt-px inline-block px-1 bg-white dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200"}
      {...rest}
    >
      {children}
    </label>
  );
}
