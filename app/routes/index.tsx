import { ChevronRightIcon } from "@heroicons/react/solid";
import { ActionFunction } from "remix";
import { delay } from "~/utils";
import ContactForm from "~/components/ContactForm";
import Link from "~/components/Link";
import Navbar from "~/components/Navbar";

export const action: ActionFunction = async () => {
  // TODO validate the schema client side
  // Actually save the inquiry in our local DB with Prisma
  // Create a cookie or whatever to store the current user-uuid inquiry in order to let the user do only 1 inquiry a day
  // Returns le funny message if OK or something else if KO
  await delay(5000, () => console.log("simulation"));
  return {};
};

export default function Index () {
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
                    <ChevronRightIcon className="ml-2 w-5 h-5 text-slate-500" aria-hidden="true" />
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
                  not understand how they worked. When I grew up, lots of
                  things became clearer and the field of computer science became my main passion. I started to get closer to the art of programming
                  relatively late, around 16 years old, before, I dabbled only in programming micro C software on consoles, nothing important. The
                  <span className="italic">hard</span> programming began exactly when I was 16. After that, I took a diploma in computer science in
                  Italy
                  then I started to study computer engineering in Switzerland at SUPSI where I learnt a lot of basic essential techniques for a good
                  engineer. I'm deeply proud of my work and I strongly believe in continuous formation because technology never stops and I will not
                  ever let it go too far from my passion.
                </p>
              </div>
            </div>
            <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}