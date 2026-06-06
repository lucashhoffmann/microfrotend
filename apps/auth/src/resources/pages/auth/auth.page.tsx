import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { CardDescription, CardTitle } from '@modular-payments-console/ui';

interface AuthPageProps extends PropsWithChildren {
  title: string;
  description: string;
  alternatePrompt: string;
  alternateLabel: string;
  alternatePath: string;
}

export function AuthPage({
  title,
  description,
  alternatePrompt,
  alternateLabel,
  alternatePath,
  children,
}: AuthPageProps) {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            Shell access
          </p>
          <CardTitle className="text-3xl leading-tight">{title}</CardTitle>
        </div>
        <CardDescription className="max-w-md text-sm leading-6">
          {description}
        </CardDescription>
      </header>

      {children}

      <div className="border-t border-border pt-4 text-sm text-muted-foreground">
        {alternatePrompt}{' '}
        <Link className="font-semibold text-foreground underline-offset-4 hover:underline" to={alternatePath}>
          {alternateLabel}
        </Link>
      </div>
    </div>
  );
}
