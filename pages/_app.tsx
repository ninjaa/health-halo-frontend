import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { SessionProvider } from "next-auth/react"
import {
  useEffect,
} from 'react';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });
interface MyAppProps extends AppProps {
  pageProps: {
    session?: any; // Add session to pageProps
  };
}
function App({ Component, pageProps }: MyAppProps) {
  const queryClient = new QueryClient();

  return (
    <SessionProvider session={pageProps.session}>
      <div className={inter.className}>
        <Toaster />
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </div>
    </SessionProvider>
  );
}

export default appWithTranslation(App);
