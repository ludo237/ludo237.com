import Link from "next/link";

const AboutMe = () => {
	return (
		<section id="about">
			<div>
				<h2 className="text-xl font-bold">About</h2>
			</div>
			<div>
				<div className="prose max-w-full text-pretty font-sans text-sm dark:prose-invert">
					<p>
						I am part of the '90s generation that grew up with the Fresh Prince
						of Bel Air and the Commodore 64. Currently I'm the{" "}
						<strong>C.T.O.</strong> of{" "}
						<a href="https://6go.it" target="_blank" rel="noreferrer">
							6GO
						</a>
						, which is one of my business adventures, I've quite an experience
						in <a href="/#career">software engineering</a>.
					</p>

					<Link href="/blog/my-story" className="text-sm">
						Read more about my story
					</Link>
				</div>
			</div>
		</section>
	);
};

export { AboutMe };
