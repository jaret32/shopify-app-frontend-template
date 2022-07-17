import { BrowserRouter } from 'react-router-dom';
import { AppNavigationMenu } from './components/navigation';
import { AppBridgeProvider, PolarisProvider } from './components/providers';
import { AppRoutes } from './components/routes';

const App = () => {
  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <AppNavigationMenu />
          <AppRoutes />
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
};

export default App;
