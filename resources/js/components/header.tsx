import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from '@inertiajs/react';

export default function Header() {
    return (
        <>
            <header className="leading-loose">
                <h1 className="text-4xl font-bold tracking-wide md:text-7xl">Claudio Ludovico</h1>
                <p className="max-w-[600px] md:text-xl">
                    Also known as <strong className="text-secondary">Ludo237</strong>. Software Artisan and Entrepreneur.
                </p>
            </header>
            <section id="about" className="flex justify-between space-x-3 py-12">
                <Avatar className="size-22 md:size-36">
                    <AvatarImage src="https://avatars.githubusercontent.com/u/921500?v=4" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-justify leading-loose tracking-wider">
                    I am the CTO of{' '}
                    <a href="https://6go.it" target="_blank" rel="noreferrer" className="text-secondary">
                        6GO
                    </a>
                    , creator of{' '}
                    <a href="https://digie.it" target="_blank" rel="noreferrer" className="text-secondary">
                        Digie
                    </a>{' '}
                    and{' '}
                    <a href="https://ideaqr.com" target="_blank" rel="noreferrer" className="text-secondary">
                        IDeaQR
                    </a>
                    , co-owner of{' '}
                    <a href="https://corsiok.com" target="_blank" rel="noreferrer" className="text-secondary">
                        CorsiOk
                    </a>
                    , investor, Vektra board member, body builder and father.
                    <br />I write regularly on{' '}
                    <Link href={route('blog.index')} className="text-secondary">
                        my Blog
                    </Link>
                    .<br />
                    You can also find me on{' '}
                    <a href="https://x.com/RealLudo237" target="_blank" rel="noreferrer" className="text-secondary">
                        X
                    </a>
                    ,{' '}
                    <a href="https://www.linkedin.com/in/ludo237/" target="_blank" rel="noreferrer" className="text-secondary">
                        Linkedin
                    </a>{' '}
                    and{' '}
                    <a href="https://www.instagram.com/ludo237/" target="_blank" rel="noreferrer" className="text-secondary">
                        Instagram
                    </a>
                    . Or book a call with me.
                </p>
            </section>
        </>
    );
}
