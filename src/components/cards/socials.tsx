import {
	Github,
	Gitlab,
	Layers,
	Linkedin,
	MessageCirclePlusIcon,
	QrCode,
	Send,
	Twitter,
} from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { ContactMeDialogs } from "~/components/contact-me-dialogs";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";

const SocialCard: FC = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-sky-500">Socials</CardTitle>
				<CardDescription>My public profiles</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex items-center space-x-3">
					<Link href="https://t.me/ludo237" target="_blank" title="Telegram">
						<Send className="size-6 text-sky-300" />
					</Link>
					<Link
						href="https://twitter.com/realLudo237"
						target="_blank"
						title="Twitter"
					>
						<Twitter className="size-6 text-sky-400" />
					</Link>
					<Link
						href="https://www.linkedin.com/in/ludo237/"
						target="_blank"
						title="Linkedin"
					>
						<Linkedin className="size-6 text-sky-600" />
					</Link>
					<Link
						href="https://stackoverflow.com/users/1202367/ludo237"
						target="_blank"
						title="Stackoverflow"
					>
						<Layers className="size-6 text-orange-600" />
					</Link>
					<Link
						href="https://github.com/ludo237"
						target="_blank"
						title="Github"
					>
						<Github className="size-6 text-zinc-800" />
					</Link>
					<Link
						href="https://gitlab.com/ludo237"
						target="_blank"
						title="Gitlab"
					>
						<Gitlab className="size-6 text-orange-700" />
					</Link>
					<Link
						href="https://www.ideaqr.com/ludo237"
						target="_blank"
						title="IdeaQR"
					>
						<QrCode className="size-6 text-emerald-500" />
					</Link>
				</div>
			</CardContent>
			<CardFooter className="flex justify-end">
				<ContactMeDialogs
					trigger={
						<Button variant={"outline"} size={"sm"}>
							<MessageCirclePlusIcon />
							<span>Send me a message</span>
						</Button>
					}
				/>
			</CardFooter>
		</Card>
	);
};

export { SocialCard };
