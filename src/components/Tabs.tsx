import React from "react";
import { Tabs, Tab } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

type TabInfo = {
  name: string;
  path: string;
};

type NavTabsProps = {
  tabs: TabInfo[];
};

export default function NavTabs({ tabs }: NavTabsProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentTabIndex = tabs.findIndex(
    (tab) => tab.path === location.pathname
  );

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    navigate(tabs[newValue].path);
  };

  return (
    <Tabs
      value={currentTabIndex === -1 ? 0 : currentTabIndex}
      onChange={handleChange}
    >
      {tabs.map((tab) => (
        <Tab key={tab.path} label={tab.name} />
      ))}
    </Tabs>
  );
}
