import DashboardContext from '@contexts/DashboardContext';
import useDashboardRPC from '@hooks/backend/honeypotService/useDashboardRPC';

export const DashboardProvider = ({ children }) => {
  const { containers, logs, blacklist } = useDashboardRPC();

  return (
    <DashboardContext.Provider value={{ containers, logs, blacklist }}>
      {children}
    </DashboardContext.Provider>
  );
};
