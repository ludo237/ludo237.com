
import {FC} from "react";
import {BioCard} from "~/components/BioCard";
import {BlogCard} from "~/components/BlogCard";
import {GitFeedCard} from "~/components/GitFeedCard";
import {JobsCard} from "~/components/JobsCard";
import {SocialCard} from "~/components/SocialdCard";

const HomePage: FC = () => {
  return (
    <div>
      <div className="mx-auto flex flex-col items-center gap-2 py-4 md:py-6 md:pb-4 lg:py-12 lg:pb-10 max-w-3xl">
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] text-balance">
          Claudio Ludovico
        </h1>
        <small className="text-sky-600">also known as ludo237</small>
        <span className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
          Entrepreneur - Engineer - Optimistic for the Future
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 max-w-7xl mx-3 xl:mx-auto">
        <div className="col-span-1 md:col-span-3">
          <BioCard />
        </div>

        <div className="space-y-3 col-span-1 md:col-span-6">
          <JobsCard />
          <BlogCard />
        </div>

        <div className="space-y-3 col-span-1 md:col-span-3">
          <SocialCard />
          <GitFeedCard />
        </div>
      </div>
    </div>
  );
}

export default HomePage;