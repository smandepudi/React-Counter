import "./App.css";
import { Routes, Route } from "react-router-dom";
import Tabs from "./components/Tabs";
import HomePage from "./pages/HomePage"
import CounterPage from "./pages/CounterPage";
import TodoPage from "./pages/TodoPage";

function App() {
  const tabs = [
    { name: "Home", path: "/home" },
    { name: "Counter", path: "/counter" },
    { name: "Todo", path: "/todo" },
  ];

  return (
    <div className="app-container">
      <h1>React Basics</h1>
      <p>Navigate between the tabs below</p>

      <Tabs tabs={tabs} />
      <main>
        <Routes>
          {/* redirect root to your default page */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/counter" element={<CounterPage />} />
          <Route path="/todo" element={<TodoPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
