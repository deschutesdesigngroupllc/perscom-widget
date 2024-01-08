import AuthWrapper from '../../layout/auth-wrapper';

export default function Layout({ children }) {
  return <AuthWrapper>{children}</AuthWrapper>;
}
