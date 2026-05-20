import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import { Gateway } from "./pages/gateway";
import { Home } from "./pages/home";
import { AboutUs } from "./pages/about-us";
import { NewsEvents } from "./pages/news-events";
import { Academics } from "./pages/academics";
import { ApplyNow } from "./pages/apply-now";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Gateway,
  },
  {
    path: "/school",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: AboutUs },
      { path: "news-events", Component: NewsEvents },
      { path: "academics", Component: Academics },
      { path: "apply", Component: ApplyNow },
    ],
  },
]);

