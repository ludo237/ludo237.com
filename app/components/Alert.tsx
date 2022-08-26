import type { IconName } from "@fortawesome/fontawesome-svg-core";
import cx from "clsx";
import React from "react";
import Icon from "~/components/Icon";
import { createMemoClass } from "~/utils";

type AlertProps = {
  color: "green",
  children: React.ReactNode,
  icon: IconName
}

const useAlertClass = createMemoClass((props: AlertProps) => {
  const colors = {
    green: ["bg-emerald-50", "border-emerald-400", "text-emerald-700"],
  };

  return cx(
    colors[props.color ?? "green"],
  );
});

export default function Alert (props: AlertProps) {
  const { children, color, icon } = props;

  const colors = useAlertClass({ color });

  return (
    <div className={cx(colors, ["border-l-4", "p-4"])}>
      <div className={"flex items-center"}>
        <div className={"shrink-0"}>
          <Icon className={"h-3 w-3"} icon={["fas", icon]} />
        </div>
        <div className={"ml-3 text-sm"}>
          {children}
        </div>
      </div>
    </div>
  );
}
