import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Props {
    token: string;
    email: string;
}

export default function ResetPassword({ token, email }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.update'));
    };

    return (
        <>
            <Head title="Reset Password" />

            <main className="mx-auto min-h-[100dvh] max-w-3xl px-6 py-12 md:px-0">
                <div className="flex min-h-[80vh] items-center justify-center">
                    <Card className="w-full max-w-md">
                        <CardHeader className="space-y-4 text-center">
                            <CardTitle className="text-3xl font-bold text-primary">Reset Password</CardTitle>
                            <p className="text-muted-foreground">Enter your new password below</p>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-6" onSubmit={submit}>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                                            Email address
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-ring focus:outline-none"
                                            placeholder="Email address"
                                        />
                                        {errors.email && <p className="mt-2 text-sm text-destructive">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">
                                            New password
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="new-password"
                                            required
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-ring focus:outline-none"
                                            placeholder="Enter new password"
                                        />
                                        {errors.password && <p className="mt-2 text-sm text-destructive">{errors.password}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="password_confirmation" className="mb-2 block text-sm font-medium text-foreground">
                                            Confirm password
                                        </label>
                                        <input
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            type="password"
                                            autoComplete="new-password"
                                            required
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-ring focus:outline-none"
                                            placeholder="Confirm new password"
                                        />
                                        {errors.password_confirmation && (
                                            <p className="mt-2 text-sm text-destructive">{errors.password_confirmation}</p>
                                        )}
                                    </div>
                                </div>

                                <Button type="submit" disabled={processing} className="w-full">
                                    {processing ? 'Resetting...' : 'Reset Password'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    );
}
