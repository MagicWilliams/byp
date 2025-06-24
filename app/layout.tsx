import type { Metadata } from 'next';
import { Inter, Playfair_Display, Playfair } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
});

const playfair = Playfair({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'BYP',
  description: 'The Black Youth Project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${playfair.variable} ${playfairDisplay.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
