import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.tsx";
import StoreProvider from "./context/StoreProvider.tsx";
import "./index.css";
export const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <StoreProvider>
      <App />
      <Toaster />
    </StoreProvider>
  </QueryClientProvider>
);
