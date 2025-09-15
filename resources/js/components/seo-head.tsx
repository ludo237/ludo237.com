import { SharedPageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';

interface SeoHeadProps {
    title?: string;
}

const SeoHead = ({ title }: SeoHeadProps) => {
    const { meta } = usePage<SharedPageProps>().props;

    return (
        <Head>
            <title>{title || meta.title}</title>
            <meta head-key="description" name="description" content={meta.description} />

            <meta head-key="og:title" property="og:title" content={meta.og.title} />
            <meta head-key="og:description" property="og:description" content={meta.og.description} />
            <meta head-key="og:type" property="og:type" content={meta.og.type} />
            <meta head-key="og:url" property="og:url" content={meta.og.url} />
            <meta head-key="og:image" property="og:image" content={meta.og.image} />

            <meta head-key="twitter:card" name="twitter:card" content={meta.twitter.card} />
            <meta head-key="twitter:title" name="twitter:title" content={meta.twitter.title} />
            <meta head-key="twitter:description" name="twitter:description" content={meta.twitter.description} />
            <meta head-key="twitter:image" name="twitter:image" content={meta.twitter.image} />
            <meta head-key="twitter:image:alt" name="twitter:image:alt" content={meta.twitter.alt} />
        </Head>
    );
};

export default SeoHead;
