import { NavLink } from "react-router-dom";
import "../styles/Tabs.css";
import React from "react";

type Tab = {
  name: string;
  path: string;
};

type TabsProps = {
  tabs: Tab[];
};

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  return (
    <nav className="flex border-b border-gray-300 mb-4" aria-label="Main navigation">
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) => `tab-button ${isActive ? "active" : ""}`}
        >
          {tab.name} Sindhu
        </NavLink>
      ))}
    </nav>
  );
};
export default Tabs;
