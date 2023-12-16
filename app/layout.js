import { Nunito_Sans } from 'next/font/google';
import { ThemeProvider } from './providers';
import { IframeResizer } from './iframe';
import './globals.css';
import { Footer } from '../components/footer';
import cx from 'classnames';

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
          <main>{children}</main>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
