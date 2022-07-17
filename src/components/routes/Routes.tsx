import { Route, Routes } from 'react-router-dom';
import { Dashboard } from '../dashboard';
import { PageLayout } from './PageLayout';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Dashboard />} />
        {/* <Route path='/expenses' element={<Expenses />} /> */}
      </Route>
    </Routes>
  );
};
