import React from 'react';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { theme } from '../assets/theme';

// Register ChartJS components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend
);

const RevenueChart = ({ data }) => {
  // Filter only credit transactions (revenue)
  const revenueData = data.filter(transaction => transaction.type === 'Credit');
  
  // Sort by date
  revenueData.sort((a, b) => new Date(a.date) - new Date(b.date));
  
  const chartData = {
    labels: revenueData.map(item => item.date),
    datasets: [
      {
        label: 'Revenue',
        data: revenueData.map(item => item.amount),
        borderColor: theme.colors.secondary,
        backgroundColor: theme.colors.secondary + '40',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: theme.colors.primary,
        pointBorderColor: theme.colors.white,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: theme.colors.accent,
      }
    ]
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: theme.typography.fontFamily,
            size: 14,
          }
        }
      },
      title: {
        display: true,
        text: 'Revenue Growth Over Time',
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
            return `Revenue: $${context.parsed.y.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: theme.colors.gray,
        },
        ticks: {
          callback: function(value) {
            return '$' + value;
          },
          font: {
            family: theme.typography.fontFamily,
          }
        },
        title: {
          display: true,
          text: 'Amount (USD)',
          font: {
            family: theme.typography.fontFamily,
          }
        }
      },
      x: {
        grid: {
          color: theme.colors.gray,
        },
        ticks: {
          font: {
            family: theme.typography.fontFamily,
          }
        },
        title: {
          display: true,
          text: 'Date',
          font: {
            family: theme.typography.fontFamily,
          }
        }
      }
    }
  };
  
  const containerStyle = {
    backgroundColor: theme.colors.white,
    borderRadius: theme.shapes.cardBorderRadius,
    padding: theme.spacing.lg,
    boxShadow: theme.shadows.card,
    height: '400px',
  };

  // Calculate cumulative revenue for the narrative
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.amount, 0);
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
        <Line data={chartData} options={options} />
      </div>
      <p style={narrativeStyle}>
        <strong>Insight:</strong> The Devil's Stone Inn has shown consistent revenue growth, 
        with total earnings of <strong>${totalRevenue.toFixed(2)}</strong> for this period. 
        This positive trend indicates effective business strategies and strong customer engagement.
      </p>
    </div>
  );
};

export default RevenueChart; 