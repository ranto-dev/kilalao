import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/landing";
import QuizzBody from "./pages/quizgame";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

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

  if (isLoading == false) {
    return (
      <div className="w-full h-screen flex justify-center items-center ">
        <p className="text-5xl text-amber-600 flex justify-center items-center gap-2">
          <FaSpinner className="animate-spin" />
          <span className="text-lg">Loading</span>
        </p>
      </div>
    );
  }

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
