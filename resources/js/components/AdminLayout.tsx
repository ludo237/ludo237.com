import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { ReactNode } from 'react';

interface BreadcrumbItem {
    label: string;
    href?: string;
    active?: boolean;
}

interface Props {
    title: string;
    description?: string;
    breadcrumbs?: BreadcrumbItem[];
    children: ReactNode;
}

export default function AdminLayout({ title, description, breadcrumbs = [], children }: Props) {
    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <main className="mx-auto min-h-[100dvh] max-w-3xl px-6 py-12 md:px-0">
            <div className="space-y-6">
                <header className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold tracking-wide text-primary">{title}</h1>
                        {description && <p className="mt-2 text-muted-foreground">{description}</p>}
                    </div>
                    <Button onClick={handleLogout} variant="outline" size="sm">
                        Logout
                    </Button>
                </header>

                {breadcrumbs.length > 0 && (
                    <Breadcrumb>
                        <BreadcrumbList>
                            {breadcrumbs.map((breadcrumb, index) => (
                                <div key={index} className="flex items-center">
                                    {index > 0 && <BreadcrumbSeparator />}
                                    <BreadcrumbItem>
                                        {breadcrumb.active || !breadcrumb.href ? (
                                            <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.label}</BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                </div>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                )}

                {children}
            </div>
        </main>
    );
}
