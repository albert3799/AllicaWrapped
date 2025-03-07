import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { theme } from '../assets/theme';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ExpenseChart = ({ data }) => {
  const labels = Object.keys(data);
  const values = Object.values(data);
  
  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: theme.colors.chartColors,
        borderColor: theme.colors.white,
        borderWidth: 2,
        hoverOffset: 15,
      }
    ]
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            family: theme.typography.fontFamily,
            size: 14,
          },
          padding: 20,
        }
      },
      title: {
        display: true,
        text: 'Expense Breakdown',
        font: {
          family: theme.typography.fontFamily,
          size: 18,
          weight: 'bold',
        },
        color: theme.colors.primary,
        padding: 20,
      },
      tooltip: {
        backgroundColor: theme.colors.primary,
        titleFont: {
          family: theme.typography.fontFamily,
          size: 14,
        },
        bodyFont: {
          family: theme.typography.fontFamily,
          size: 14,
        },
        callbacks: {
          label: function(context) {
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: $${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '60%',
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 2000,
      easing: 'easeOutQuart',
    },
  };
  
  const containerStyle = {
    backgroundColor: theme.colors.white,
    borderRadius: theme.shapes.cardBorderRadius,
    padding: theme.spacing.lg,
    boxShadow: theme.shadows.card,
    height: '400px',
  };

  // Calculate total expenses for the narrative
  const totalExpenses = values.reduce((sum, value) => sum + value, 0);
  const highestExpense = Math.max(...values);
  const highestExpenseCategory = labels[values.indexOf(highestExpense)];
  
  const narrativeStyle = {
    fontSize: '16px',
    lineHeight: '1.5',
    color: theme.colors.darkGray,
    marginTop: theme.spacing.md,
    fontFamily: theme.typography.fontFamily,
  };

  return (
    <div style={containerStyle}>
      <div style={{ height: '300px' }}>
        <Doughnut data={chartData} options={options} />
      </div>
      <p style={narrativeStyle}>
        <strong>Insight:</strong> The largest expense category is <strong>{highestExpenseCategory}</strong> at 
        <strong> ${highestExpense.toFixed(2)}</strong> ({((highestExpense / totalExpenses) * 100).toFixed(1)}% of total expenses). 
        Effective expense management in these areas can significantly improve profitability.
      </p>
    </div>
  );
};

export default ExpenseChart; 