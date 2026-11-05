import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  return (
    <div>
      <NavBar />
      <main style={{ padding: '0 20px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;