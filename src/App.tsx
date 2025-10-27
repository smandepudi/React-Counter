import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter as Router, Link } from "react-router-dom";
import NavTabs from "./components/Tabs";
import HomePage from "./pages/HomePage";
import TodoPage from "./pages/TodoPage";



const tabList = [
  { name: "Home", path: "/home" },
  { name: "Todo", path: "/todo" },
];

function App() {
  return (
    <>
      <NavTabs tabs={tabList} />
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
