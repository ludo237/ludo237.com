import type { FC } from "react";
import { AboutMe } from "~/components/sections/about-me";
import { CareerTimeline } from "~/components/sections/career-timeline";
import { ContactMe } from "~/components/sections/contact";
import { Header } from "~/components/sections/header";
import { ProjectsGrid } from "~/components/sections/projects";

const HomePage: FC = async () => {
	return (
		<main className="flex min-h-[100dvh] flex-col space-y-10">
			<Header />
			<AboutMe />
			<CareerTimeline />
			<ProjectsGrid />
			<ContactMe />
		</main>
	);
};

export default HomePage;
