import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SharedProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function Header() {
    const { firstPost } = usePage<SharedProps>().props;

    return (
        <>
            <header>
                <div className="w-full">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex flex-1 flex-col space-y-1.5">
                            <h1 className="inline-block text-3xl font-bold tracking-wide leading-loose sm:text-5xl xl:text-6xl/none dark:text-slate-400">
                                Hi, I am Claudio Ludovico
                            </h1>
                            <p className="inline-block max-w-[600px] md:text-xl dark:text-slate-400">
                                Also known as <strong className="text-sky-500 dark:text-sky-600">Ludo237</strong>. Software Artisan and Entrepreneur.
                            </p>
                        </div>
                        <Avatar className="size-16 md:size-36">
                            <AvatarImage src="https://avatars.githubusercontent.com/u/921500?v=4" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>
            <section id="about">
                <div>
                    <h2 className="text-xl font-bold dark:text-slate-400">About</h2>
                </div>
                <div>
                    <div className="prose max-w-full font-sans text-sm text-pretty dark:prose-invert">
                        <p>
                            I am part of the 90s generation that grew up with the Fresh Prince of Bel Air and the Commodore 64. Currently I am the{' '}
                            <strong>C.T.O.</strong> of{' '}
                            <a href="https://6go.it" className="dark:text-slate-400" target="_blank" rel="noreferrer">
                                6GO
                            </a>
                            , which is one of my business adventures, I have quite an experience in{' '}
                            <Link href="/#career" className="dark:text-slate-400">
                                software engineering
                            </Link>
                            .
                        </p>

                        <Link href={`/blog/${firstPost.slug}`} className="font-semibold text-sky-500 dark:text-sky-600">
                            Read more about my story
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
