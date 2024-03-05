import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Navigate, Route, Routes } from "react-router-dom";
// import HomePage from "./features/HomePage/HomePage";
// import CreateFeedback from "./features/HomePage/CreateFeedback";
// import EditFeedback from "./features/FeedbackDetail/EditFeedback";
// import FeedbackDetail from "./features/FeedbackDetail/FeedbackDetail";
// import RoadmapPage from "./features/Roadmap/RoadmapPage";
import { Suspense, lazy } from "react";
import Loader from "./ui/Loader";

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

          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
