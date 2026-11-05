import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const navStyle = ({ isActive }) => ({
    backgroundColor: isActive ? '#6f42c1' : 'transparent',
    color: isActive ? '#ffffff' : '#000000',
    padding: '8px 16px',
    borderRadius: '4px',
    textDecoration: 'none',
    marginRight: '8px',
    fontWeight: 'bold'
  });

  return (
    <nav style={{ padding: '16px', backgroundColor: '#f8f9fa', marginBottom: '20px' }}>
      <NavLink to="/" end style={navStyle}>Trang chủ</NavLink>
      <NavLink to="/questions" style={navStyle}>Ngân hàng câu hỏi</NavLink>
      <NavLink to="/history" style={navStyle}>Lịch sử</NavLink>
    </nav>
  );
};

export default NavBar;