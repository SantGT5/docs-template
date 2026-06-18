import { RouterProvider } from "react-router";
import { Provider } from "@/components/ui/provider";
import { router } from "@/router";

const App = () => {
  return (
    <Provider defaultTheme="system">
      <RouterProvider router={router} />
    </Provider>
  );
};

export { App };
