import { Container } from '@protos/dashboard';
import { createContext } from 'react';

interface DashboardContextProps {
  containers: Container[] | undefined;
  logs: string | undefined;
  blacklist: string[] | undefined;
}

const defaultDashboard: DashboardContextProps = {
  containers: [],
  logs: undefined,
  blacklist: undefined,
};
  
const DashboardContext = createContext<DashboardContextProps>(defaultDashboard);

export default DashboardContext;
