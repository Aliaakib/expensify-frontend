// Auto-logout on tab/browser close (not on refresh)
// Add this in App.jsx (or a top-level component)
import { useEffect } from "react";

function useLogoutOnTabClose() {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Detect refresh (type 1 means reload)
      const isReload =
        performance.getEntriesByType("navigation")[0]?.type === "reload";

      if (!isReload && localStorage.getItem("token")) {
        // Notify server (optional)
        navigator.sendBeacon(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/auth/logout`,
          JSON.stringify({ token: localStorage.getItem("token") })
        );

        // Clear local storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
}

export default useLogoutOnTabClose;
