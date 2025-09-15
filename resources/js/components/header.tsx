import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SharedPageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function Header() {
    const { firstPost } = usePage<SharedPageProps>().props;

    return (
        <>
            <header>
                <div className="w-full">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex flex-1 flex-col space-y-1.5">
                            <h1 className="inline-block text-3xl leading-loose font-bold tracking-wide sm:text-5xl xl:text-6xl/none">
                                Hi, I am Claudio Ludovico
                            </h1>
                            <p className="inline-block max-w-[600px] md:text-xl">
                                Also known as <strong className="text-foreground">Ludo237</strong>. Software Artisan and Entrepreneur.
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
                    <h2 className="text-xl font-bold">About</h2>
                </div>
                <div>
                    <p className="prose max-w-full font-sans text-sm text-pretty dark:prose-invert">
                        I am part of the 90s generation that grew up with the Fresh Prince of Bel Air and the Commodore 64. Currently I am the{' '}
                        <strong>C.T.O.</strong> of{' '}
                        <a href="https://6go.it" target="_blank" rel="noreferrer">
                            6GO
                        </a>
                        , which is one of my business adventures, I have quite an experience in software engineering
                        <span>. </span>
                        <Link href={`/blog/${firstPost.slug}`}>Read more about my story</Link>
                    </p>
                </div>
            </section>
        </>
    );
}
