import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy } from "react";
import Loader from "./ui/Loader";
import Signup from "./authentication/Signup";
import Login from "./authentication/Login";

const HomePage = lazy(() => import("./features/HomePage/HomePage"));
const CreateFeedback = lazy(() => import("./features/HomePage/CreateFeedback"));
const EditFeedback = lazy(
  () => import("./features/FeedbackDetail/EditFeedback"),
);
const FeedbackDetail = lazy(
  () => import("./features/FeedbackDetail/FeedbackDetail"),
);
const RoadmapPage = lazy(() => import("./features/Roadmap/RoadmapPage"));

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
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="create-feedback" element={<CreateFeedback />} />
          <Route path="edit-feedback/:feedbackId" element={<EditFeedback />} />
          <Route
            path="feedback-detail/:feedbackId"
            element={<FeedbackDetail />}
          />
          <Route path="roadmap" element={<RoadmapPage />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />

          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Suspense>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            color: "#0c0e16",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
