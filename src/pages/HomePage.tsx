import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "@contexts/AuthContext";
import Dashboard from "@components/dashboard/Dashboard";
import ConnectionsManager from "@components/dashboard/ConnectionsManager";
import ContainerManager from "@components/dashboard/ContainerManager";
import BlockManager from "@components/dashboard/BlockManager";
import Others from "@components/dashboard/Others";
import { useTranslation } from "react-i18next";
import UsersManagement from "../components/dashboard/UsersManagement";
import { HaveRoles } from "../_utils/function/have-roles";
import { RoleEnum } from "@protos/user";
import MobileLink from "@components/dashboard/MobileLink";
import { useNightModeContext } from '../contexts/NightModeContext';
import '../styles.css';

const HomePage = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const history = useHistory();
  const [currentContent, setCurrentContent] = useState("dashboard");
  const { t } = useTranslation();
  const { isNightMode } = useNightModeContext();
  const contentClassName = isNightMode ? "home-content night-mode" : "home-content"; 
  const contentBodyClassName = isNightMode ? "content-body night-mode" : "content-body"; 
  const containerClassName = isNightMode ? "home-container night-mode" : "home-container"; 
  const sidebarClassName = isNightMode ? "home-sidebar night-mode" : "home-sidebar"; 
  const h3ClassName = isNightMode ? "night-mode-text" : "";

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/login");
    }
  }, [isLoggedIn, history]);

  useEffect(() => {
    if (currentContent === "containerManager") {
      fetchConnections();
    }
  }, [currentContent]);

  const fetchConnections = async () => {
    const response = await fetch("");
    const data = await response.json();
    // setContainers(data); TODO
  };

  const handleMenuClick = (content) => {
    setCurrentContent(content);
  };

  const renderContent = () => {
    switch (currentContent) {
      case "dashboard":
        return <Dashboard />;
      case "otherFeatures":
        return <Others />;
      case "containerManager":
        return <ContainerManager />;
      case "incomingConnections":
        return <ConnectionsManager />;
      case "ipManagement":
        return (
          <div>
            <BlockManager />
          </div>
        );
      case "usersManagement":
        return <UsersManagement />;
      case "mobileLink":
        return <MobileLink />;
      default:
    }
  };

  return (
    // <div className={containerClassName}>
    <div className={containerClassName}>
      <div className={sidebarClassName}>
        <h3 className={h3ClassName}>HoneyPot</h3>
        <ul>
          <li onClick={() => handleMenuClick("dashboard")}>
            {t("homePage.dashboard")}
          </li>
          {HaveRoles(user, [RoleEnum.CAN_MANAGE_IP]) && (
            <li onClick={() => handleMenuClick("ipManagement")}>
              {t("homePage.ipManagement")}
            </li>
          )}
          {HaveRoles(user, [RoleEnum.CAN_MANAGE_CONFIGURATION]) && (
            <li onClick={() => handleMenuClick("containerManager")}>
              {t("homePage.containerManager")}
            </li>
          )}
          <li onClick={() => handleMenuClick("incomingConnections")}>
            {t("homePage.incomingConnections")}
          </li>
          {HaveRoles(user, [RoleEnum.CAN_INVITE]) && (
            <li onClick={() => handleMenuClick("usersManagement")}>
              {t('homePage.userManagement')}
            </li>
          )}
          <li onClick={() => handleMenuClick("mobileLink")}>
            {t("homePage.mobileLink")}
          </li>
          <li onClick={() => handleMenuClick("otherFeatures")}>
            {t("homePage.otherFeatures")}
          </li>
        </ul>
      </div>
      <div className={contentClassName}>
        <div className={contentBodyClassName}>{renderContent()}</div>
      </div>
    </div>
    // </div>
  );
};

export default HomePage;
