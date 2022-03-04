import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons";

// We handle the CSS somewhere else
config.autoAddCss = false;

library.add(
  faBars, faChevronRight, faGithub, faTelegram, faTimes, faTwitter,
);

export default function Icon (props: FontAwesomeIconProps) {
  const {
    className,
    icon,
    size,
    spin,
    ...rest
  } = props;

  return (
    <FontAwesomeIcon
      spin={spin}
      size={size}
      className={className}
      icon={icon as IconProp}
      {...rest}
    />
  );
};

