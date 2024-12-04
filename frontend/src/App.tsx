import { RouterProvider } from "react-router-dom";
import "./App.css";
import AppRouter from "./router/AppRouter";
import { ThemeProvider } from "@/components/theme-provider";
import { useEffect, useState } from "react";
import store from "./store";
import { setCredentials } from "./store/slices/authSlice";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedToken && storedUser) {
      try {
        const user = JSON.parse(storedUser);

        store.dispatch(
          setCredentials({
            user,
            token: storedToken,
          })
        );
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-green-100">
        <h1>Loaging...</h1>
      </div>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={AppRouter} />
    </ThemeProvider>
  );
}
export default App;
