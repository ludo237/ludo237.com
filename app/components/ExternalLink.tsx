import cx from "clsx";
import React from "react";
import type { LinkProps } from "~/components/Link";
import { useLinkClass } from "~/components/Link";

export default function ExternalLink (props: LinkProps) {
  const {
    className,
    children,
    color = "gray",
    size,
    to,
    title,
    ...rest
  } = props;

  const classes = useLinkClass({
    color,
    size,
  });

  return (
    <a
      href={to.toString()}
      title={title}
      target={"_blank"}
      rel={"noopener noreferrer"}
      className={cx(classes, className)}
      {...rest}
    >
      {children ?? title}
    </a>
  );
}
