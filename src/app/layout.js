import cx from 'classnames';
import { Inter } from 'next/font/google';
import { Footer } from '../components/footer';
import { IframeResizerProvider } from '../providers/iframe';
import { SessionProvider } from '../providers/session';
import { ThemeProvider } from '../providers/theme';
import './globals.css';
//import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PERSCOM Widget'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <IframeResizerProvider />
      <body
        className={cx('!dark:text-gray-400 max-h-max !text-gray-700', inter.className)}
        style={{
          margin: '0.2rem 0.1rem'
        }}
      >
        <SessionProvider>
          <ThemeProvider>
            <main>
              {children}
              {/*<SpeedInsights />*/}
            </main>
          </ThemeProvider>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
