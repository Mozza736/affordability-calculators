interface AdBannerProps {
  position: 'top' | 'mid';
  className?: string;
}

// Invisible spacer until ad inventory is live — renders nothing visible.
export function AdBanner({ className = '' }: AdBannerProps) {
  return <div className={className} />;
}
