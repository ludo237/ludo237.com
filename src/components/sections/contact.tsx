import { Send } from "lucide-react";
import { ContactMeDialogs } from "~/components/contact-me-dialogs";
import { Button } from "~/components/ui/button";

const ContactMe = () => {
	return (
		<section id="contact">
			<div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
				<div>
					<div className="space-y-3">
						<h2 className="text-3xl font-bold text-sky-500 tracking-tighter sm:text-5xl">
							Get in Touch
						</h2>
						<p className="mx-auto max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							<span>Want to chat? Just shoot me a dm</span>{" "}
							<a
								className="text-sky-500 hover:underline"
								href="https://x.com/intent/follow?screen_name=realLudo237"
							>
								with a direct question on Twitter
							</a>{" "}
							<span>and I'll respond whenever I can.</span>
						</p>
						<div>
							<span>Want to send me an email?</span>{" "}
							<ContactMeDialogs
								trigger={
									<Button variant={"outline"} size={"sm"}>
										<Send className="size-3" />
										<span>Send me a message</span>
									</Button>
								}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export { ContactMe };
