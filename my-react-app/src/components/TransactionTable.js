import React, { useState } from 'react';
import { theme } from '../assets/theme';

const TransactionTable = ({ data }) => {
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('asc');

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: theme.colors.white,
    borderRadius: theme.shapes.borderRadius,
    overflow: 'hidden',
    boxShadow: theme.shadows.card,
    fontFamily: theme.typography.fontFamily,
  };

  const headerStyle = {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: theme.spacing.md,
    textAlign: 'left',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  const cellStyle = {
    padding: theme.spacing.md,
    borderBottom: `1px solid ${theme.colors.gray}`,
  };

  const getRowStyle = (index, type) => ({
    backgroundColor: index % 2 === 0 ? theme.colors.white : theme.colors.gray,
    transition: `background-color ${theme.animation.fast} ease-in-out`,
    ':hover': {
      backgroundColor: theme.colors.accent + '20',
    },
    ...(type === 'Credit' 
      ? { borderLeft: `4px solid ${theme.colors.success}` }
      : { borderLeft: `4px solid ${theme.colors.danger}` }),
  });

  const getSortIcon = (field) => {
    if (sortField !== field) return '⇅';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortField === 'amount') {
      return sortDirection === 'asc' 
        ? a.amount - b.amount 
        : b.amount - a.amount;
    } else if (sortField === 'date') {
      return sortDirection === 'asc' 
        ? new Date(a.date) - new Date(b.date) 
        : new Date(b.date) - new Date(a.date);
    } else {
      return sortDirection === 'asc' 
        ? a[sortField].localeCompare(b[sortField]) 
        : b[sortField].localeCompare(a[sortField]);
    }
  });

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={headerStyle} onClick={() => handleSort('date')}>
            Date {getSortIcon('date')}
          </th>
          <th style={headerStyle} onClick={() => handleSort('amount')}>
            Amount {getSortIcon('amount')}
          </th>
          <th style={headerStyle} onClick={() => handleSort('type')}>
            Type {getSortIcon('type')}
          </th>
          <th style={headerStyle} onClick={() => handleSort('party')}>
            Party {getSortIcon('party')}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((transaction, index) => (
          <tr key={index} style={getRowStyle(index, transaction.type)}>
            <td style={cellStyle}>{transaction.date}</td>
            <td style={cellStyle}>${transaction.amount.toFixed(2)}</td>
            <td style={cellStyle}>
              <span style={{ 
                color: transaction.type === 'Credit' ? theme.colors.success : theme.colors.danger,
                fontWeight: 'bold',
              }}>
                {transaction.type}
              </span>
            </td>
            <td style={cellStyle}>{transaction.party}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable; 