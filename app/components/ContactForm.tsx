import { Form } from "@remix-run/react";
import Input from "~/components/Input";
import InputGroup from "~/components/InputGroup";
import Textarea from "~/components/Textarea";

export default function ContactForm () {
  return (
    <div className="bg-white shadow-md border border-sky-200 sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
      <div className="px-4 py-8 sm:px-10 space-y-3">
        <Form action="#" method="post" className="space-y-6">
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

          <div>
            <button
              type="submit"
              className="transition-colors w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Send
            </button>
          </div>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-sky-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="py-2 bg-white text-slate-700">Or</span>
          </div>
        </div>
        <p className="text-sm font-medium text-slate-700">Reach me on</p>
        <div className="mt-1 grid grid-cols-3 gap-3">
          <div>
            <a
              href="#"
              className="w-full inline-flex justify-center py-2 px-4 border border-slate-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-500 hover:bg-slate-50"
            >
              <span className="sr-only">Telegram</span>
              Telegram
            </a>
          </div>

          <div>
            <a
              href="#"
              className="w-full inline-flex justify-center py-2 px-4 border border-slate-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-500 hover:bg-slate-50"
            >
              <span className="sr-only">Twitter</span>
              Twitter
            </a>
          </div>

          <div>
            <a
              href="#"
              className="w-full inline-flex justify-center py-2 px-4 border border-slate-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-500 hover:bg-slate-50"
            >
              <span className="sr-only">GitHub</span>
              Github
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
