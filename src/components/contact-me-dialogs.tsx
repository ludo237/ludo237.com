"use client";

import {
	type Dispatch,
	type FC,
	type ReactNode,
	type SetStateAction,
	useState,
} from "react";
import { ContactForm } from "~/components/forms/contact";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "~/components/ui/drawer";
import { useMediaQuery } from "~/hooks/use-media-query";

type DialogProps = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	trigger: ReactNode;
};

const ContactMeDesktopDialog: FC<DialogProps> = ({
	open,
	setOpen,
	trigger,
}: DialogProps) => {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Send me a message</DialogTitle>
					<DialogDescription>
						Be sure to specify why you&apos; re contacting me.I&apos; ll get
						back to you as soon as possible.
					</DialogDescription>
				</DialogHeader>
				<ContactForm />
			</DialogContent>
		</Dialog>
	);
};

const ContactMeMobileDialog: FC<DialogProps> = ({ open, setOpen, trigger }) => {
	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>{trigger}</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Send me a message</DrawerTitle>
					<DrawerDescription>
						Be sure to specify why you&apos;re contacting me. I&apos;ll get back
						to you as soon as possible.
					</DrawerDescription>
					<ContactForm />
				</DrawerHeader>
				<DrawerFooter className="py-3" />
			</DrawerContent>
		</Drawer>
	);
};

const ContactMeDialogs: FC<{ trigger: ReactNode }> = ({ trigger }) => {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<ContactMeDesktopDialog open={open} setOpen={setOpen} trigger={trigger} />
		);
	}

	return (
		<ContactMeMobileDialog open={open} setOpen={setOpen} trigger={trigger} />
	);
};

export { ContactMeDialogs };
