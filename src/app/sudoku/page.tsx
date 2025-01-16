import type { User } from "@supabase/supabase-js";
import type { Metadata } from "next";
import type { FC } from "react";
import { logout } from "~/actions/auth";
import { LoginForm } from "~/components/forms/login";
import { Header } from "~/components/sections/header";
import { Game } from "~/components/sudoku/game";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import { supabaseClient } from "~/lib/supabase/server";

export const metadata: Metadata = {
	title: "Ludo237 | Sudoku",
	description:
		"Simple sudoku board that reflects the classic game, which i like a lot.",
};

const SignupCta = () => {
	return (
		<div>
			<span>
				Simple sudoku board that reflects the classic game, which i like a lot.
				Do you want to keep track of your scores?
			</span>{" "}
			<Dialog>
				<DialogTrigger asChild>
					<span className="text-sky-500 underline">Login or Register</span>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Register or create a new account</DialogTitle>
						<DialogDescription>
							What, another account? I know I hate them too, but certain
							functionalities can only work with some sort of authentication. I
							can promise you I will never ever ever use your email for anything
							else beside log you in my app, I make enough money I don't need to
							sell my data to third parties!
						</DialogDescription>
					</DialogHeader>

					<LoginForm revalidateFrom="sudoku" />
				</DialogContent>
			</Dialog>
		</div>
	);
};

const LoginCta: FC<{ user: User }> = ({ user }) => {
	return (
		<div className="flex items-center space-x-1.5">
			<span>Welcome back {user?.id}</span>
			<form action={logout}>
				<Button type="submit" size="xs">
					Logout
				</Button>
			</form>
		</div>
	);
};

const SudokuGame: FC = async () => {
	const supabase = await supabaseClient();
	const { data } = await supabase.auth.getUser();

	return (
		<>
			<Header />

			<Breadcrumb className="py-3">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Sudoku</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="py-3">
				{!data.user && <SignupCta />}
				{data.user && <LoginCta user={data.user} />}
			</div>

			<main className="mx-auto max-w-lg">
				<Game user={data.user} />
			</main>
		</>
	);
};

export default SudokuGame;
