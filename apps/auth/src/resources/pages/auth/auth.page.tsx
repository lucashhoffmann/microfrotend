import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@modular-payments-console/ui';

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
    <Card className="w-full max-w-xl border-border/70 bg-card/95 shadow-xl backdrop-blur">
      <CardHeader className="space-y-3">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-sm leading-6">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {children}
        <div className="text-sm text-muted-foreground">
          {alternatePrompt}{' '}
          <Link className="font-semibold text-primary" to={alternatePath}>
            {alternateLabel}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
