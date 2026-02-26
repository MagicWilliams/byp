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

const CONSOLE_SIGNATURE = `
  (function() {
    console.log('%c 🌼 🌠 🚀 Built by David Latimore II 🚀 🌠 🌼 ', 'font-size: 14px;');
    console.log('%c 🌼 Delight — https://delight.studio 🌼', 'font-size: 14px;');
  })();
`;

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
        <script
          dangerouslySetInnerHTML={{
            __html: CONSOLE_SIGNATURE,
          }}
        />
        {children}
      </body>
    </html>
  );
}
