import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Brand from "~/components/Brand";
import Link from "~/components/Link";

const navigation = [
  { name: "Curriculum", href: "/cv" },
  { name: "Blog", href: "/blog" },
  { name: "Books", href: "/notes" },
];

export default function Navbar () {
  return (
    <Popover>
      <nav
        className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
        aria-label="Global"
      >
        <div className="flex items-center flex-1">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Brand />
            <div className="-mr-2 flex items-center md:hidden">
              <Popover.Button
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-slate-400 hover:bg-slate-700 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
          </div>
          <div className="hidden space-x-10 md:flex md:ml-10">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href}>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg border border-slate-50 bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="px-5 pt-4 flex items-center justify-between">
              <Brand />
              <div className="-mr-4">
                <Popover.Button
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-slate-400 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="flex flex-col px-5 py-4 space-y-5">
              {navigation.map((item) => (
                <Link key={item.name} to={item.href}>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
