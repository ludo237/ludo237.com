import { Link as BaseLink, LinkProps } from "@remix-run/react";

export default function Link (props: LinkProps) {
  const {
    children,
    to,
  } = props;

  return (
    <BaseLink
      to={to}
      className="transition-colors text-slate-900 dark:text-white sm:text-base lg:text-sm xl:text-base hover:text-slate-600 dark:hover:text-slate-200"
    >
      {children}
    </BaseLink>
  );
}
