import "../styles/Tabs.css";
import React from "react";
import { Tabs, Tab, AppBar, Toolbar } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

type Tab = {
  name: string;
  path: string;
};

type TabsProps = {
  tabs: Tab[];
};

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const currentTab = tabs.findIndex((tab) => tab.path === location.pathname);
  const navigate = useNavigate();
  const location = useLocation();
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    navigate(tabs[newValue].path);
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Tabs
          value={currentTab !== -1 ? currentTab : 0}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          {tabs.map((tab) => (
            <Tab key={tab.path} label={tab.name} />
          ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};
export default Tabs;
