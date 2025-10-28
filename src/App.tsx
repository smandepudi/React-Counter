import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { Auth } from "./components/Auth";
import NavTabs from "./components/Tabs";
import HomePage from "./pages/HomePage";
import TodoPage from "./pages/TodoPage";

const tabList = [
  { name: "Home", path: "/home" },
  { name: "Todo", path: "/todo" },
];

function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Not logged in - show login page
  if (!session) {
    return <Auth />;
  }

  // Logged in - show your app with sign out button
  return (
    <>
      <div className="flex justify-between items-center px-4 py-2 bg-gray-100">
        <NavTabs tabs={tabList} />
        <button
          onClick={handleSignOut}
          className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
      
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;