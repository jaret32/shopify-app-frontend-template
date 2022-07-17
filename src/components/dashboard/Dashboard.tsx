import { Layout } from '@shopify/polaris';
import { useEffect } from 'react';
import { usePage } from '../routes';

export const Dashboard = () => {
  const { setPageProps } = usePage();

  useEffect(() => {
    setPageProps({ title: 'Dashboard' });
  }, []);

  return <Layout.Section>Dashboard</Layout.Section>;
};
