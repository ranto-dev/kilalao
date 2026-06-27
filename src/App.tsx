import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import QuizzBody from "./pages/QuizPage";
import { useState } from "react";
import Loading from "./components/Loading";

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/commencer-un-quiz",
      element: <QuizzBody />,
    },
  ]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
