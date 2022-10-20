/* eslint-disable react/jsx-props-no-spreading */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";

import { Chakra } from "lib/components/Chakra";
import "lib/styles/globals.css";
import DashboardLayout from "lib/layout";

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position="top-left" />
      <Chakra>
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      </Chakra>
    </QueryClientProvider>
  );
};

export default MyApp;
