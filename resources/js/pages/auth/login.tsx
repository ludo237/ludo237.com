import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Login" />

            <main className="mx-auto min-h-[100dvh] max-w-3xl px-6 py-12 md:px-0">
                <div className="flex min-h-[80vh] items-center justify-center">
                    <Card className="w-full max-w-md">
                        <CardHeader className="space-y-4 text-center">
                            <CardTitle className="text-3xl font-bold text-primary">Admin Login</CardTitle>
                            <p className="text-muted-foreground">Sign in to manage your content</p>
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
                                            placeholder="Enter your email"
                                        />
                                        {errors.email && <p className="mt-2 text-sm text-destructive">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-ring focus:outline-none"
                                            placeholder="Enter your password"
                                        />
                                        {errors.password && <p className="mt-2 text-sm text-destructive">{errors.password}</p>}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember"
                                            name="remember"
                                            type="checkbox"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
                                        />
                                        <label htmlFor="remember" className="ml-2 block text-sm text-foreground">
                                            Remember me
                                        </label>
                                    </div>

                                    <Link href={route('password.request')} className="text-sm font-medium text-primary hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>

                                <Button type="submit" disabled={processing} className="w-full">
                                    {processing ? 'Signing in...' : 'Sign in'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    );
}
