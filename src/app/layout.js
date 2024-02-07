import cx from 'classnames';
import { Nunito_Sans } from 'next/font/google';
import { Footer } from '../components/footer';
import { IframeResizerProvider } from '../providers/iframe';
import { SessionProvider } from '../providers/session';
import { ThemeProvider } from '../providers/theme';
import './globals.css';
//import { SpeedInsights } from '@vercel/speed-insights/next';

const nunitoSans = Nunito_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'PERSCOM Widget'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <IframeResizerProvider />
      <body
        className={cx('text-gray-500 dark:text-gray-400', nunitoSans.className)}
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
