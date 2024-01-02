import './globals.css';
import cx from 'classnames';
import { Nunito_Sans } from 'next/font/google';
import { ThemeProvider } from './providers';
import { IframeResizer } from './iframe';
import { Footer } from '../components/footer';
//import { SpeedInsights } from '@vercel/speed-insights/next';

const nunitoSans = Nunito_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'PERSCOM Widget'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <IframeResizer />
      <body
        className={cx('text-gray-500 dark:text-gray-400', nunitoSans.className)}
        style={{
          margin: '0.2rem'
        }}
      >
        <ThemeProvider>
          <main>
            {children}
            {/*<SpeedInsights />*/}
          </main>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
