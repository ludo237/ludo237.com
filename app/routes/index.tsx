import { IconProp } from "@fortawesome/fontawesome-svg-core";
import ExternalLink from "~/components/ExternalLink";
import Link from "~/components/Link";
import Icon from "~/components/Icon";

const socialLinks: { href: string, name: string, icon: IconProp }[] = [
  { href: "https://t.me/ludo237", name: "Telegram", icon: ["fab", "telegram"] },
  { href: "https://twitter.com/ludo237", name: "Twitter", icon: ["fab", "twitter"] },
  { href: "https://github.com/ludo237", name: "Github", icon: ["fab", "github"] },
];

export default function Index () {
  return (
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
          <div className="px-4 pb-8 pt-7 sm:px-10 space-y-2">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-100">
              <span className={"mr-1"}>If you want to send me an inquiry you can reach me at</span>
              <ExternalLink to={"mailto:inquiry@ludo237.com"} color={"sky"} size={"sm"}>inquiry@ludo237.com</ExternalLink>
            </p>
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-sky-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-100">Or</span>
              </div>
            </div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-100">You can find me on</p>
            <div className="mt-1 grid grid-cols-3 gap-3">
              {socialLinks.map((socialLink, index) =>
                <ExternalLink
                  title={socialLink.name}
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
  );
}
