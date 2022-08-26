import type { DetailedHTMLProps, InputHTMLAttributes } from "react";

export default function Input (props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  const {
    id,
    name,
    placeholder,
    type,
    ...rest
  } = props;

  return (
    <input
      type={type}
      name={name}
      id={`#${id}`}
      className={"block w-full border-0 p-0 text-slate-900 dark:text-slate-50 dark:bg-slate-800 placeholder-slate-500 dark:placeholder-slate-200 focus:ring-0 sm:text-sm"}
      placeholder={placeholder}
      {...rest}
    />
  );
}
