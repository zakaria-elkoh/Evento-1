import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { Toaster } from "sonner";

const DefaultLayout = () => {
  return (
    <main className="bg-gray-200 min-h-screen dark:bg-black">
      <Toaster
        position="bottom-right"
        closeButton
        // richColors
        toastOptions={{
          style: {
            minWidth: "200px",
            maxWidth: "400px",
            padding: "13px 16px",
            fontSize: "0.85rem",
          },
          duration: 5000,
        }}
      />
      <NavBar />
      <div className="max-w-screen-lg mx-auto">
        <Outlet />
      </div>
    </main>
  );
};

export default DefaultLayout;
