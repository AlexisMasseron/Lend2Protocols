import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
export function ReactQueryProvider(props: any) {
  return <QueryClientProvider client={queryClient} {...props} />;
}
