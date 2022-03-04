import { Form, useTransition } from "@remix-run/react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Button from "~/components/Button";
import ExternalLink from "~/components/ExternalLink";
import Icon from "~/components/Icon";
import Input from "~/components/Input";
import InputGroup from "~/components/InputGroup";
import Textarea from "~/components/Textarea";

const socialLinks: { href: string, name: string, icon: IconProp }[] = [
  { href: "https://t.me/ludo237", name: "Telegram", icon: ["fab", "telegram"] },
  { href: "https://twitter.com/ludo237", name: "Twitter", icon: ["fab", "twitter"] },
  { href: "https://github.com/ludo237", name: "Github", icon: ["fab", "github"] },
];

// TODO this can be promoted to sub route technically
export default function ContactForm () {
  const transition = useTransition();

  return (
    <div className="shadow-md border border-sky-200 sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
      <div className="px-4 pb-8 pt-7 sm:px-10 space-y-4">
        <h2 className="leading-loose text-slate-900 dark:text-slate-50">Contact Me</h2>
        <Form method="post" className="space-y-6">
          <div className="flex justify-between items-baseline space-x-3">
            <InputGroup label={"Your Name"}>
              <Input
                type={"text"}
                name={"name"}
                id={"name"}
                autoComplete={"name"}
                placeholder="Foo Bar"
                required
              />
            </InputGroup>

            <InputGroup label={"Your Email"}>
              <Input
                type={"email"}
                name={"email"}
                id={"email"}
                autoComplete={"email"}
                placeholder="foo@bar.com"
                required
              />
            </InputGroup>
          </div>

          <InputGroup label={"Your Message"}>
            <Textarea
              appearance={"transparent"}
              id={"message"}
              name={"message"}
              placeholder={"Hello I would like to..."}
              required
            />
          </InputGroup>

          <Button
            type={"submit"}
            className="w-full"
            loading={transition.state !== "idle"}
          >
            <span className="w-full text-center">Send</span>
          </Button>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-sky-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-100">Or</span>
          </div>
        </div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-100">Reach me on</p>
        <div className="mt-1 grid grid-cols-3 gap-3">
          {socialLinks.map((socialLink, index) =>
            <ExternalLink
              key={index}
              to={socialLink.href}
              className="inline-flex justify-center py-1.5 px-3.5 border border-slate-300 rounded-md shadow-sm"
            >
              <span className="sr-only">{socialLink.name}</span>
              <Icon
                aria-hidden="true"
                className={"h-6 w-6"}
                icon={socialLink.icon}
              />
            </ExternalLink>,
          )}
        </div>
      </div>
    </div>
  );
}
