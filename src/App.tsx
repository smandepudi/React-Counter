import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { supabase } from "./lib/supabase";
import { Auth } from "./components/Auth";
import NavTabs from "./components/Tabs";
import HomePage from "./pages/HomePage";
import TodoPage from "./pages/TodoPage";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeContext } from "./context/ThemeContext";
import { IconButton, Button, Box} from "@mui/material";


const tabList = [
  { name: "Home", path: "/home" },
  { name: "Todo", path: "/todo" },
];

function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toggleTheme, mode } = useContext(ThemeContext);

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
      <div
        className="flex justify-between items-center px-4 py-2 bg-gray-100"
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: mode === "dark" ? "#1e1e1e" : "#f5f5f5",
        }}
      >
        <NavTabs tabs={tabList} />
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', pr: 1.25 }}>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Button
            onClick={handleSignOut}
            variant="outlined"
            color="inherit"
            size="small"
          >
            Sign Out
          </Button>
        </Box>
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
