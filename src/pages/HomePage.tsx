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
import CarrouselPage  from './CarrouselPage';
import ImageDashboard from './../../images/dashboard.png'
import ImageContainerManager from '../../images/containerManager.png'
import ImageIpManagment from '../../images/ipManagment.png'
import ImageMobilLink from '../../images/mobileLink.png'
import '../styles.css';
import RulesManager from "@components/dashboard/RulesManager";

const slideData = [
  {
    index: 0,
    headline: 'Dasboard',
    button: 'go to dashboard',
    src: `${ImageDashboard}`
  },
  {
    index: 1,
    headline: 'Ip Management',
    button: 'go manage',
    src: `${ImageIpManagment}`
  },
  {
    index: 2,
    headline: 'Container Manager',
    button: 'go manage',
    src: `${ImageContainerManager}`
  },
  {
    index: 3,
    headline: 'Link to Mobil',
    button: 'go to link',
    src: `${ImageMobilLink}`
  }
]

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
  const [showCarousel, setShowCarousel] = useState(true);

  useEffect(() => {
    if (user && user.id) {
      const hasVisitedBefore = localStorage.getItem(`visited_${user?.id}`);
      if (!hasVisitedBefore) {
        setShowCarousel(true);
        localStorage.setItem(`visited_${user?.id}`, 'true');
      }
    }
  }, [user]);

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
      case "rulesManager":
        return <RulesManager />;
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

  return (<>
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
          {HaveRoles(user, [RoleEnum.CAN_MANAGE_CONFIGURATION]) && (
            <li onClick={() => handleMenuClick("rulesManager")}>
              {t("homePage.rulesManager")}
            </li>
          )}
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
  </>);
};

export default HomePage;
