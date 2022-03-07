import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Form, useActionData, useLoaderData, useTransition } from "@remix-run/react";
import { ActionFunction, json, LoaderFunction } from "remix";
import { object, string } from "yup";
import { createInquirySession, getInquiryId } from "~/modules/session.server";
import { parseFormData } from "~/utils";
import { createInquiry } from "~/api/inquiry";
import Alert from "~/components/Alert";
import Button from "~/components/Button";
import ExternalLink from "~/components/ExternalLink";
import Link from "~/components/Link";
import Icon from "~/components/Icon";
import Input from "~/components/Input";
import InputGroup from "~/components/InputGroup";
import Navbar from "~/components/Navbar";
import Textarea from "~/components/Textarea";

const socialLinks: { href: string, name: string, icon: IconProp }[] = [
  { href: "https://t.me/ludo237", name: "Telegram", icon: ["fab", "telegram"] },
  { href: "https://twitter.com/ludo237", name: "Twitter", icon: ["fab", "twitter"] },
  { href: "https://github.com/ludo237", name: "Github", icon: ["fab", "github"] },
];

const inquirySchema = object({
  name: string().required(),
  email: string().required().email(),
  message: string().required(),
});

export const loader: LoaderFunction = async ({ request }) => {
  const id = await getInquiryId(request);

  if (id) {
    return { submitted: true };
  }

  return {};
};

export const action: ActionFunction = async ({ request }) => {
  const [formData, errors] = await parseFormData(request, inquirySchema);

  if (!formData || errors) {
    return { errors };
  }

  const inquiry = await createInquiry({
    name: formData.name,
    email: formData.email,
    content: formData.message,
  });

  return json({ submitted: true, inquiry },
    {
      headers: {
        "Set-Cookie": await createInquirySession(inquiry),
      },
    },
  );
};

export default function Index () {
  const transition = useTransition();
  const loaderData = useLoaderData();
  const actionData = useActionData();

  return (
    <div className="relative pt-6 pb-16 sm:pb-24">
      <Navbar />

      <main className="mt-16 sm:mt-24">
        <div className="mx-auto max-w-7xl">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
              <div>
                <Link to="/cv">
                  <div className="inline-flex items-center  border border-slate-900 bg-white dark:bg-slate-900 rounded-full p-1 pr-2">
                    <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-sky-500 rounded-full">
                      Available for Hire
                    </span>
                    <span className="ml-4 text-sm">Check my curriculum</span>
                    <Icon
                      className="ml-2 w-5 h-5 text-slate-500"
                      aria-hidden="true"
                      icon={["fas", "chevron-right"]}
                    />
                  </div>
                </Link>
                <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                  <span className="md:block text-slate-900 dark:text-slate-50">Hello I am</span>{" "}
                  <span className="text-sky-400 md:block">Claudio Ludovico</span>
                </h1>
                <p className="mt-3 prose prose-slate dark:prose-invert sm:mt-5 sm:prose-xl lg:prose-base xl:prose-lg">
                  Being self-taught, I believe in life-long learning and knowledge sharing. I also deeply believe in the open-source movement
                  and try to give back to the community whenever I can. I am part of the ‘90s generation that grew up with the Fresh Prince of
                  Bel Air and the Commodore 64. Understanding how stuff works is a passion that I showed since the age of 5, in fact I tried
                  to assemble and disassemble both <span className="italic">Commodore</span> and <span className="italic">Amiga</span> with very
                  positive results, but with a lot of anger as well. It was caused by the fact that the more parts I discovered, the more I could
                  not understand how they worked. When I grew up, lots of things became clearer and the field of computer science became my main
                  passion. I started to get closer to the art of programming relatively late, around 16 years old, before, I dabbled only in
                  programming micro C software on consoles, nothing important. The <span className="italic">hard</span> programming began exactly when
                  I was 16. After that, I took a diploma in computer science in Italy then I started to study computer engineering in Switzerland at
                  SUPSI where I learnt a lot of basic essential techniques for a good engineer. I'm deeply proud of my work and I strongly believe in
                  continuous formation because technology never stops and I will not ever let it go too far from my passion.
                </p>
              </div>
            </div>
            <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
              <div className="shadow-md border border-sky-200 sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
                <div className="px-4 pb-8 pt-7 sm:px-10 space-y-4">
                  {actionData?.submitted || loaderData?.submitted
                    ? <>
                      <Alert
                        color={"green"}
                        icon={"check-circle"}
                      >
                        <p>Your inquiry has been sent. Allow me a few days to answer you</p>
                      </Alert>
                    </>
                    : <>
                      <h2 className="leading-loose text-slate-900 dark:text-slate-50">Contact Me</h2>
                      <Form method={"post"} className="space-y-6">
                        <InputGroup
                          label={"Your Name"}
                          error={actionData?.errors?.name}
                        >
                          <Input
                            type={"text"}
                            name={"name"}
                            id={"name"}
                            autoComplete={"name"}
                            placeholder="Foo Bar"
                            required
                          />
                        </InputGroup>

                        <InputGroup
                          label={"Your Email"}
                          error={actionData?.errors?.email}
                        >
                          <Input
                            type={"email"}
                            name={"email"}
                            id={"email"}
                            autoComplete={"email"}
                            placeholder="foo@bar.com"
                            required
                          />
                        </InputGroup>

                        <InputGroup
                          label={"Your Message"}
                          error={actionData?.errors?.message}
                        >
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
                    </>
                  }
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
