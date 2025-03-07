import React from 'react';
import { theme } from '../assets/theme';

const Header = () => {
  const headerStyle = {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    fontFamily: theme.typography.fontFamily,
    position: 'sticky',
    top: 0,
    zIndex: 100,
  };

  const logoStyle = {
    fontWeight: 700,
    fontSize: '24px',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
  };

  const highlightStyle = {
    color: theme.colors.accent,
    fontWeight: 'bold',
  };

  return (
    <header style={headerStyle}>
      <h1 style={logoStyle}>
        <span>Allica Bank</span>
        <span style={highlightStyle}>Wrapped</span>
      </h1>
      <div>
        <p style={{ margin: 0, fontSize: '14px' }}>Fiscal Year 2024-2025</p>
      </div>
    </header>
  );
};

export default Header; 