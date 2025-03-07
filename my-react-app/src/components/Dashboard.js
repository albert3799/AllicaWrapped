import React from 'react';
import { theme } from '../assets/theme';
import { transactionData, getInsights } from '../data/transactionData';
import SummaryCard from './SummaryCard';
import TransactionTable from './TransactionTable';
import RevenueChart from './RevenueChart';
import ExpenseChart from './ExpenseChart';

const Dashboard = () => {
  const insights = getInsights();
  
  const dashboardStyle = {
    padding: theme.spacing.lg,
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.colors.gray,
    minHeight: 'calc(100vh - 80px)', // Adjust based on header height
  };

  const headingStyle = {
    color: theme.colors.primary,
    marginBottom: theme.spacing.lg,
    fontSize: '28px',
    fontWeight: theme.typography.heading.fontWeight,
  };

  const summaryContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  };

  const chartsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
    gap: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  };

  return (
    <div style={dashboardStyle}>
      <h2 style={headingStyle}>The Devil's Stone Inn: Financial Year in Review</h2>
      
      <div style={summaryContainerStyle}>
        <SummaryCard 
          title="Total Revenue" 
          value={`$${insights.totalIncome.toFixed(2)}`} 
          icon="📈"
          color={theme.colors.secondary}
        />
        <SummaryCard 
          title="Total Expenses" 
          value={`$${insights.totalExpenses.toFixed(2)}`} 
          icon="💰"
          color={theme.colors.accent}
        />
        <SummaryCard 
          title="Net Balance" 
          value={`$${insights.netBalance.toFixed(2)}`} 
          icon="✅"
          color={insights.netBalance >= 0 ? theme.colors.success : theme.colors.danger}
        />
      </div>

      <div style={chartsContainerStyle}>
        <RevenueChart data={transactionData} />
        <ExpenseChart data={insights.expensesByCategory} />
      </div>

      <div>
        <h3 style={{ color: theme.colors.primary, marginBottom: theme.spacing.md }}>
          Transaction Details
        </h3>
        <TransactionTable data={transactionData} />
      </div>
    </div>
  );
};

export default Dashboard; 