import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faLinkedin, faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faBars, faCheckCircle, faChevronRight, faPaperclip, faTimes } from "@fortawesome/free-solid-svg-icons";
import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

// We handle the CSS somewhere else
config.autoAddCss = false;

library.add(
// @ts-ignore
  faBars, faCheckCircle, faChevronRight, faGithub, faLinkedin, faPaperclip, faTelegram, faTimes, faTwitter,
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

