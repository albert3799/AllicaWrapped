import React from 'react';
import { theme } from '../assets/theme';

const SummaryCard = ({ title, value, icon, color }) => {
  const cardStyle = {
    backgroundColor: theme.colors.white,
    borderRadius: theme.shapes.cardBorderRadius,
    padding: theme.spacing.lg,
    boxShadow: theme.shadows.card,
    transition: `transform ${theme.animation.fast} ease-in-out`,
    cursor: 'pointer',
    border: `1px solid ${color || theme.colors.primary}`,
    borderLeft: `4px solid ${color || theme.colors.primary}`,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const iconStyle = {
    fontSize: '32px',
    marginBottom: theme.spacing.sm,
  };

  const titleStyle = {
    fontSize: '16px',
    color: theme.colors.darkGray,
    fontWeight: 500,
    margin: `${theme.spacing.sm} 0`,
  };

  const valueStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: color || theme.colors.primary,
    margin: 0,
  };

  // Hover effect
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
  };

  return (
    <div 
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={iconStyle}>{icon}</div>
      <h3 style={titleStyle}>{title}</h3>
      <p style={valueStyle}>{value}</p>
    </div>
  );
};

export default SummaryCard; 