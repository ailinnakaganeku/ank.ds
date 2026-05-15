import type { ReactNode } from 'react';
import { Card, Stack } from '@ankds/core';

export const Metric = ({ value, label }: { value: ReactNode; label: ReactNode }) => (
  <Stack gap="2">
    <div style={{
      fontFamily: 'var(--ank-display)',
      fontSize: 'clamp(48px, 6vw, 72px)',
      fontWeight: 700,
      lineHeight: 1,
      letterSpacing: '-0.02em',
      color: 'var(--ank-ink)',
    }}>
      {value}
    </div>
    <div style={{
      fontFamily: 'var(--ank-mono)',
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--ank-gray-700)',
    }}>
      {label}
    </div>
  </Stack>
);

export const Tile = ({
  href,
  index,
  title,
  hint,
}: {
  href: string;
  index: ReactNode;
  title: ReactNode;
  hint: ReactNode;
}) => (
  <a href={href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
    <Card className="ank-card--interactive" style={{ height: '100%' }}>
      <Card.Eyebrow>{index}</Card.Eyebrow>
      <Card.Title>{title} →</Card.Title>
      <Card.Description>{hint}</Card.Description>
    </Card>
  </a>
);
