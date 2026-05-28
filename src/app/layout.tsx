import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '../context/LanguageContext';
import { LayoutShell } from '../components/LayoutShell';

export const metadata: Metadata = {
  title: 'NCERT Study Hub',
  description:
    'Free NCERT textbooks for Classes 6–12 — read chapters online, Physics, Chemistry, Biology, Maths exercises',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <LayoutShell>{children}</LayoutShell>
        </LanguageProvider>
      </body>
    </html>
  );
}

