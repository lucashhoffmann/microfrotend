import { PropsWithChildren, ReactNode } from 'react';

export interface CardProps extends PropsWithChildren {
  title: string;
  eyebrow?: string;
  footer?: ReactNode;
  tone?: 'default' | 'accent';
}

const baseStyle = {
  width: '100%',
  maxWidth: '720px',
  padding: '24px',
  borderRadius: '24px',
  border: '1px solid #dbe4f0',
  background: '#ffffff',
  boxShadow: '0 18px 45px rgba(15, 23, 42, 0.08)',
} as const;

export function Card({
  children,
  eyebrow,
  footer,
  title,
  tone = 'default',
}: CardProps) {
  const toneStyle =
    tone === 'accent'
      ? {
          borderColor: '#bfdbfe',
          background:
            'linear-gradient(180deg, rgba(239, 246, 255, 0.95), rgba(255, 255, 255, 1))',
        }
      : undefined;

  return (
    <section style={{ ...baseStyle, ...toneStyle }}>
      {eyebrow ? (
        <p
          style={{
            margin: '0 0 10px',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#2563eb',
          }}
        >
          {eyebrow}
        </p>
      ) : null}

      <h2 style={{ margin: '0 0 12px', fontSize: '1.5rem', color: '#0f172a' }}>
        {title}
      </h2>

      <div>{children}</div>

      {footer ? <div style={{ marginTop: '16px' }}>{footer}</div> : null}
    </section>
  );
}
