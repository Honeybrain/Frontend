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

const HomePage = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const history = useHistory();
  const [currentContent, setCurrentContent] = useState("dashboard");
  const { t } = useTranslation();

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
      default:
    }
  };

  return (
    <div className="home-container">
      <div className="home-sidebar">
        <h3>HoneyPot</h3>
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
          <li onClick={() => handleMenuClick("otherFeatures")}>
            {t("homePage.otherFeatures")}
          </li>
        </ul>
      </div>
      <div className="home-content">
        <div className="content-body">{renderContent()}</div>
      </div>
    </div>
  );
};

export default HomePage;
