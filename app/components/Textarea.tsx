import cx from "clsx";
import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";
import { createMemoClass } from "~/utils";

type TextareaProps = {
  appearance?: "transparent" | "normal",
} & DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

const useTextareaClass = createMemoClass((props: TextareaProps) => {
  const styles = {
    transparent: "px-0 py-0.5 focus:ring-0 border-none",
    normal: "shadow-sm focus:ring-sky-500 focus:border-sky-500 border-slate-300 ",
  };

  return cx(
    "block w-full sm:text-sm rounded-md",
    "text-slate-900 dark:text-slate-50 dark:bg-slate-800 placeholder-slate-500 dark:placeholder-slate-200",
    styles[props.appearance ?? "normal"],
  );
});

export default function Textarea (props: TextareaProps) {
  const {
    appearance = "normal",
    className,
    id,
    name,
    placeholder,
    ...rest
  } = props;

  const classes = useTextareaClass({ appearance });

  return (
    <textarea
      name={name}
      id={`#${id}`}
      placeholder={placeholder}
      className={cx(classes, className)}
      {...rest}
    />
  );
}
