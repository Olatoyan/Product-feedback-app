import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes } from "react-router-dom";
import HomePage from "./features/HomePage/HomePage";
import CreateFeedback from "./features/HomePage/CreateFeedback";
import EditFeedback from "./features/HomePage/EditFeedback";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="create-feedback" element={<CreateFeedback />} />
        <Route path="edit-feedback/:feedbackId" element={<EditFeedback />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
