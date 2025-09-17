import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Props {
    status?: string;
}

export default function ForgotPassword({ status }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot Password" />

            <main className="mx-auto min-h-[100dvh] max-w-3xl px-6 py-12 md:px-0">
                <div className="flex min-h-[80vh] items-center justify-center">
                    <Card className="w-full max-w-md">
                        <CardHeader className="space-y-4 text-center">
                            <CardTitle className="text-3xl font-bold text-primary">Forgot Password?</CardTitle>
                            <p className="text-muted-foreground">
                                No problem. Just enter your email address and we'll email you a password reset link.
                            </p>
                        </CardHeader>
                        <CardContent>
                            {status && (
                                <div className="mb-6 rounded-lg border border-secondary/20 bg-secondary/10 p-4">
                                    <div className="text-sm font-medium text-secondary-foreground">{status}</div>
                                </div>
                            )}

                            <form className="space-y-6" onSubmit={submit}>
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
                                        placeholder="Enter your email address"
                                    />
                                    {errors.email && <p className="mt-2 text-sm text-destructive">{errors.email}</p>}
                                </div>

                                <Button type="submit" disabled={processing} className="w-full">
                                    {processing ? 'Sending...' : 'Email Password Reset Link'}
                                </Button>

                                <div className="text-center">
                                    <Link href={route('login')} className="text-sm font-medium text-primary hover:underline">
                                        Back to login
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    );
}
