// src/components/SocialLinks.tsx
import React from "react";

interface SocialIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const InstagramIcon = ({
  size = 24,
  className,
  ...props
}: SocialIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const TiktokIcon = ({
  size = 24,
  className,
  ...props
}: SocialIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.83V7.62a6.34 6.34 0 1 0 6.34 6.34V8.45a8.28 8.28 0 0 0 4.77 1.48V6.69z" />
  </svg>
);

export const WhatsappIcon = ({
  size = 24,
  className,
  ...props
}: SocialIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

export const SocialLinks = () => {
  const links = [
    {
      href: "https://www.instagram.com/proganda1?stkn=ZWw5ZjdvcTNxOW95",
      icon: InstagramIcon,
      label: "Instagram",
    },
    {
      href: "https://www.tiktok.com",
      icon: TiktokIcon,
      label: "TikTok",
    },
  ];

  return (
    <div className="flex space-x-4 justify-center mt-6">
      {links.map(({ href, icon: Icon, label }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-white/70 hover:text-primary transition-colors"
        >
          <Icon size={24} />
        </a>
      ))}
    </div>
  );
};