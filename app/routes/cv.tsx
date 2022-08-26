import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/server-runtime";
import { getCurriculum } from "~/api/curriculum";
import type { Curriculum } from "~/api/types";
import ExternalLink from "~/components/ExternalLink";
import Icon from "~/components/Icon";

type LoaderData = {
  curriculum: Curriculum,
};

export const meta: MetaFunction = () => {
  return {
    title: "My curriculum",
    description: "Take a look at my working history, skills, educations and more",
  };
};

export const loader: LoaderFunction = async () => {
  const curriculum = await getCurriculum();

  return { curriculum };
};

export default function Cv () {
  const { curriculum } = useLoaderData<LoaderData>();
  const { contacts, educations, languages, jobs, projects } = curriculum;

  return (
    <div className={"px-4 sm:px-6"}>
      <div>
        <h3 className={"text-xl leading-6 font-medium text-slate-900"}>My Curriculum</h3>
        <p className={"mt-1 max-w-2xl text-sm text-slate-500"}>I try to keep this up to date as much as possible</p>
      </div>
      <div className={"mt-5 border-t border-slate-200"}>
        <dl className={"sm:divide-y sm:divide-slate-200"}>
          <div className={"py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4"}>
            <dt className={"text-sm font-medium text-slate-500"}>Full name</dt>
            <dd className={"mt-1 text-sm sm:mt-0 sm:col-span-2"}>
              <span className={"text-slate-900 "}>Claudio Ludovico Malorgio</span>
            </dd>
          </div>
          <div className={"py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4"}>
            <dt className={"text-sm font-medium text-slate-500"}>Contacts</dt>
            <dd className={"mt-1 text-sm sm:mt-0 sm:col-span-2"}>
              <ul className={"space-y-6"}>
                {contacts.map((contact, index) =>
                  <li key={index}>
                    <ExternalLink to={contact.href} size={"sm"}>{contact.name}</ExternalLink>
                  </li>,
                )}
              </ul>
            </dd>
          </div>
          <div className={"py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4"}>
            <dt className={"text-sm font-medium text-slate-500"}>Work Experiences</dt>
            <dd className={"mt-1 text-sm sm:mt-0 sm:col-span-2"}>
              <ul className={"space-y-6"}>
                {jobs.map((job, index) =>
                  <li key={index}>
                    <h3 className={"space-x-2"}>
                      <span className={"text-slate-900 font-medium"}>{job.company}</span>
                      <span className={"text-slate-500"}>
                        {new Date(job.startedAt).toLocaleDateString()} - {job.endedAt ? new Date(job.endedAt).toLocaleDateString() : "Present"}
                      </span>
                    </h3>
                    <p className={"prose prose-sm prose-slate max-w-none"}>{job.description}</p>
                  </li>,
                )}
              </ul>
            </dd>
          </div>
          <div className={"py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4"}>
            <dt className={"text-sm font-medium text-slate-500"}>Noteworthy skills and interests</dt>
            <dd className={"mt-1 text-sm sm:mt-0 sm:col-span-2"}>
              <p className={"prose prose-sm max-w-none"}>
                I'm fluent with backend languages such as PHP (10 years of experience), GO, Python and Ruby for scripting purposes. I'm also able to
                manage IAAS with Terraform and orchestrate Docker containers with k8s. I like to write front end applications using Vue and React
                though recently I've moved more towards React because of how confused the Vue 3 migration was. When I have time I like to research and
                study about UX design on web and mobile in order to understand how to create good looking and easy to use interfaces. In my spare time
                I study finance and economy which helps me understand how the world works on a macro scale, I also engage in Bitcoin-only
                conversations and play video games.
              </p>
            </dd>
          </div>
          <div className={"py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4"}>
            <dt className={"text-sm font-medium text-slate-500"}>Personal projects and OSS contributions</dt>
            <dd className={"mt-1 text-sm sm:mt-0 sm:col-span-2"}>
              <ul className={"space-y-6"}>
                {projects.slice(0).reverse().map((project, index) =>
                  <li key={index}>
                    <ExternalLink size={"sm"} to={project.url}>
                      <h3 className={"font-medium text-slate-900"}>{project.name}</h3>
                    </ExternalLink>
                    <p className={"prose prose-sm prose-slate max-w-none"}>{project.description}</p>
                  </li>,
                )}
              </ul>
            </dd>
          </div>
          <div className={"py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4"}>
            <dt className={"text-sm font-medium text-slate-500"}>Education</dt>
            <dd className={"mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2"}>
              <ul className={"space-y-6"}>
                {educations.map((education, index) =>
                  <li key={index}>
                    <h3 className={"space-x-2"}>
                      <span className={"text-slate-900 font-medium"}>{education.name}</span>
                      <span className={"text-slate-500"}>
                        {new Date(education.startedAt).toLocaleDateString()} - {new Date(education.endedAt).toLocaleDateString()}
                      </span>
                    </h3>
                    <p className={"prose prose-sm prose-slate max-w-none"}>{education.description}</p>
                  </li>,
                )}
              </ul>
            </dd>
          </div>
          <div className={"py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4"}>
            <dt className={"text-sm font-medium text-slate-500"}>Languages</dt>
            <dd className={"mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2"}>
              <ul className={"space-y-6"}>
                {languages.map((language, index) =>
                  <li key={index}>
                    <div className={"inline-flex items-center space-x-1"}>
                      <h3 className={"text-slate-900 font-medium"}>{language.name}</h3>
                      <i>-</i>
                      <span className={"text-slate-500 capitalize"}>{language.experience}</span>
                    </div>
                  </li>,
                )}
              </ul>
            </dd>
          </div>
          <div className={"py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4"}>
            <dt className={"text-sm font-medium text-slate-500"}>Attachments</dt>
            <dd className={"mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2"}>
              <ul className={"border border-slate-200 rounded-md divide-y divide-slate-200"}>
                <li className={"pl-3 pr-4 py-3 flex items-center justify-between text-sm"}>
                  <div className={"w-0 flex-1 flex items-center"}>
                    <Icon icon={["fas", "paperclip"]} className={"flex-shrink-0 h-5 w-5 text-slate-400"} aria-hidden={"true"} />
                    <span className={"ml-2 flex-1 w-0 truncate"}>resume_2022.pdf</span>
                  </div>
                  <div className={"ml-4 flex-shrink-0"}>
                    <ExternalLink to={"/resume_2022.pdf"} color={"sky"}>
                      Download
                    </ExternalLink>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
