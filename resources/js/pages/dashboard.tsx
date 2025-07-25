import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@/types/model';
import { Head, router } from '@inertiajs/react';

interface DashboardProps {
    user: User;
}

export default function Dashboard({ user }: DashboardProps) {
    const handleLogout = () => {
        router.delete(route('logout'));
    };

    return (
        <>
            <Head title="Dashboard" />

            <main className="flex min-h-[100dvh] items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Dashboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p className="text-lg">Welcome {user.name}</p>
                            <Button onClick={handleLogout} variant="outline" className="w-full">
                                Logout
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </>
    );
}
