import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Basic from "../pages/Basic";
import NotFound from "../pages/NotFound";
import Attachment from "../pages/Attachment";
import Information from "../pages/Consolation/Information";
import Encouragement from "../pages/Consolation/Encouragement";
import Emotion from "../pages/Consolation/Emotion";
import Prologue from "../pages/Consolation/Prologue";
import Epilogue from "../pages/Epilogue";
import Chatbot from "../pages/Chatbot";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "basic",
          element: <Basic />,
        },
        {
          path: "attachment",
          element: <Attachment />,
        },
        {
          path: "consolation/information",
          element: <Information />,
        },
        {
          path: "consolation/encouragement",
          element: <Encouragement />,
        },
        {
          path: "consolation/emotion",
          element: <Emotion />,
        },
        {
          path: "consolation/prologue",
          element: <Prologue />,
        },
        {
          path: "chatbot",
          element: <Chatbot />,
        },
        {
          path: "epilogue",
          element: <Epilogue />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ],
  {
    basename: "/ai-test", // 🔑 GitHub repo 이름과 동일하게
  }
);

export default function Router() {
  return <RouterProvider router={router} />;
}
