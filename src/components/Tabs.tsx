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
    <nav
      className="flex border-b border-gray-300 mb-4"
      aria-label="Main navigation"
    >
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            `px-4 py-2 font-medium -mb-px border-b-2 ${
              isActive
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-700 hover:text-blue-500"
            }`
          }
        >
          {tab.name}
        </NavLink>
      ))}
    </nav>
  );
};
export default Tabs;
