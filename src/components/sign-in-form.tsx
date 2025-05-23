'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import Link from 'next/link';
import z from 'zod/v4';
import { useForm } from '@tanstack/react-form';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import AppleLogo from './ui/logos/apple-logo';
import GoogleLogo from './ui/logos/google-logo';
import MetaLogo from './ui/logos/meta-logo';
import Loader from './ui/loader';

interface SignInFormValues {
  email: string;
  password: string;
}

const SignInFormSchema = z.object({
  email: z.email('Invalid email address').trim().toLowerCase(),
  password: z
    .string()
    .min(1, 'Password is required')
    .max(255, 'Password must be at most 255 characters long'),
});

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const mutation = useMutation({
    mutationFn: async (value: SignInFormValues) => {
      return await authClient.signIn.email({
        ...value,
        callbackURL: '/dashboard',
      });
    },
  });

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    } as SignInFormValues,

    validators: {
      onSubmit: SignInFormSchema,
    },

    onSubmit: async ({ value }) => {
      const { error } = await mutation.mutateAsync({ ...value });

      if (error) {
        switch (error.code) {
          case 'INVALID_EMAIL_OR_PASSWORD':
            toast('Invalid email or password');
            break;
          default:
            break;
        }
      }

      if (mutation.isError) {
        toast('Something went wrong, please try again', {
          description: 'If it persists please, contact us',
        });
      }
    },
  });

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8"
            onSubmit={(event) => {
              event.preventDefault();
              form.handleSubmit();
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your TodoApp account
                </p>
              </div>

              <form.Field name="email">
                {(field) => (
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="text"
                      placeholder="john@example.com"
                      autoComplete="email"
                      value={field.state.value}
                      onChange={({ target }) =>
                        field.handleChange(target.value)
                      }
                    />
                    {field.state.meta.errors.length > 0 && (
                      <ul
                        className="mt-1 space-y-1 text-xs text-red-600"
                        role="alert"
                        aria-live="polite"
                      >
                        {field.state.meta.errors.map((err, i) => (
                          <li key={i}>
                            <em>{err?.message}</em>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Field name="password">
                {(field) => (
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        href="/forgot-password"
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      value={field.state.value}
                      onChange={({ target }) =>
                        field.handleChange(target.value)
                      }
                    />
                    {field.state.meta.errors.length > 0 && (
                      <ul
                        className="mt-1 space-y-1 text-xs text-red-600"
                        role="alert"
                        aria-live="polite"
                      >
                        {field.state.meta.errors.map((err, i) => (
                          <li key={i}>
                            <em>{err?.message}</em>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </form.Field>

              <Button
                type="submit"
                className="w-full"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? <Loader /> : 'Login'}
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <AppleLogo />
                <GoogleLogo />
                <MetaLogo />
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/sign-up" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src="https://placehold.co/300x600/6366f1/white.svg?text=TodoApp"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              width={600}
              height={300}
              priority
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
