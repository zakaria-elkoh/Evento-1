import { RouterProvider } from "react-router-dom";
import "./App.css";
import AppRouter from "./router/AppRouter";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { currentUser } from "./store/slices/authSlice";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      console.log("Checking token:", token);

      if (token) {
        try {
          await dispatch(currentUser());
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }

      setIsLoading(false);
    };

    fetchUser();
  }, [dispatch]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {isLoading ? (
        <div className="">
          <div className="flex space-y-6 flex-col justify-center items-center  h-screen ">
            <h3 className="text-2xl font-bold ">Welcome back :)</h3>
            <div className="flex space-x-2 justify-center items-center">
              <div className="h-4 w-4 bg-black/80 rounded-full animate-bounce [animation-delay:-0.3s] dark:bg-white/80"></div>
              <div className="h-4 w-4 bg-black/80 rounded-full animate-bounce [animation-delay:-0.15s] dark:bg-white/80"></div>
              <div className="h-4 w-4 bg-black/80 rounded-full animate-bounce dark:bg-white/80"></div>
            </div>
          </div>
        </div>
      ) : (
        <RouterProvider router={AppRouter} />
      )}
    </ThemeProvider>
  );
}
export default App;
