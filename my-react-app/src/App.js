import React, { useState, useEffect } from 'react';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';
import { getInsights } from './data/transactionData';
import { theme } from './assets/theme';

// Import or define an emoji icon set for our slides
const icons = {
  welcome: '🍻',
  totalRevenue: '💰',
  beerSales: '🍺',
  foodSales: '🍔',
  topSellingDay: '📅',
  bestEvent: '🎭',
  expenses: '📉',
  profit: '✨',
  thanks: '🎉'
};

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState(null);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  // Format currency values
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Get the financial data insights
  useEffect(() => {
    setInsights(getInsights());
    
    // Simulate loading for a more dramatic reveal
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(currentSlide + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  // Define all slides
  const slides = !insights ? [] : [
    // Welcome slide
    {
      id: 'welcome',
      icon: icons.welcome,
      title: "The Devil's Stone Inn",
      content: (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="slide-content"
        >
          <h1>Your Allica Bank Wrapped Fiscal Year 2025</h1>
          <p className="subtitle">Tap to see your year in pints, pounds, and more...</p>
        </motion.div>
      ),
      background: theme.colors.primary
    },
    
    // Total Revenue slide
    {
      id: 'totalRevenue',
      icon: icons.totalRevenue,
      title: "Cheers to a Great Year!",
      content: (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="slide-content"
        >
          <h2>Your pub made</h2>
          <motion.div 
            className="highlight-number"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
          >
            {formatCurrency(insights.totalIncome)}
          </motion.div>
          <p>in total revenue this year!</p>
        </motion.div>
      ),
      background: theme.colors.secondary
    },
    
    // Beer Sales slide
    {
      id: 'beerSales',
      icon: icons.beerSales,
      title: "Pints of Success",
      content: (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="slide-content"
        >
          <h2>Your top seller was</h2>
          <motion.div 
            className="highlight-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            BEER
          </motion.div>
          <motion.div 
            className="highlight-number"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.8, type: "spring" }}
          >
            {formatCurrency(insights.incomeByCategory['Beer Sales'])}
          </motion.div>
          <p>That's a lot of happy customers!</p>
        </motion.div>
      ),
      background: '#B85C38' // Amber beer color
    },
    
    // Food Sales slide
    {
      id: 'foodSales',
      icon: icons.foodSales,
      title: "Hungry for More",
      content: (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="slide-content"
        >
          <h2>Your kitchen served up</h2>
          <motion.div 
            className="highlight-number"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
          >
            {formatCurrency(insights.incomeByCategory['Food Sales'])}
          </motion.div>
          <p>in delicious pub grub!</p>
        </motion.div>
      ),
      background: '#2D4739' // Dark green
    },
    
    // Top Selling Day slide
    {
      id: 'topSellingDay',
      icon: icons.topSellingDay,
      title: "Your Busiest Day",
      content: (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="slide-content"
        >
          <h2>Your till was ringing on</h2>
          <motion.div 
            className="highlight-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {insights.busiestDay}s
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            More than any other day of the week
          </motion.p>
        </motion.div>
      ),
      background: '#5F7161' // Sage green
    },
    
    // Best Event slide
    {
      id: 'bestEvent',
      icon: icons.bestEvent,
      title: "Crowd Pleasers",
      content: (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="slide-content"
        >
          <h2>Your most popular event was</h2>
          <motion.div 
            className="highlight-text"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
          >
            {insights.topEvent}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Keep the entertainment coming!
          </motion.p>
        </motion.div>
      ),
      background: '#6D8B74' // Muted green
    },
    
    // Expenses slide
    {
      id: 'expenses',
      icon: icons.expenses,
      title: "Where the Money Goes",
      content: (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="slide-content"
        >
          <h2>Your biggest expense was</h2>
          <motion.div 
            className="highlight-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Staff Wages
          </motion.div>
          <motion.div 
            className="highlight-number"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.8, type: "spring" }}
          >
            {formatCurrency(insights.expensesByCategory['Staff Wages'])}
          </motion.div>
          <p>Your team is your greatest asset!</p>
        </motion.div>
      ),
      background: '#395B64' // Slate blue
    },
    
    // Profit slide
    {
      id: 'profit',
      icon: icons.profit,
      title: "Bottom Line",
      content: (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="slide-content"
        >
          <h2>Your net profit was</h2>
          <motion.div 
            className="highlight-number"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
          >
            {formatCurrency(insights.netBalance)}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            That's a {insights.profitMargin.toFixed(1)}% profit margin
          </motion.p>
        </motion.div>
      ),
      background: theme.colors.primary
    },
    
    // Thank you slide
    {
      id: 'thanks',
      icon: icons.thanks,
      title: "Cheers to Another Year!",
      content: (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="slide-content"
        >
          <h1>Thanks for a great 2023!</h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="subtitle"
          >
            Here's to an even better 2024!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="restart-button"
            onClick={() => setCurrentSlide(0)}
          >
            Start Over
          </motion.div>
        </motion.div>
      ),
      background: '#A27B5C' // Warm brown
    }
  ];

  // Loading screen styles
  const loadingContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    fontFamily: theme.typography.fontFamily,
  };

  const loadingTextStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  };

  const spinnerStyle = {
    width: '50px',
    height: '50px',
    border: `4px solid ${theme.colors.white}20`,
    borderTop: `4px solid ${theme.colors.accent}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  // Add keyframes animation for spinner
  if (typeof document !== 'undefined') {
    const styleSheet = document.styleSheets[0];
    try {
      styleSheet.insertRule(`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `, styleSheet.cssRules.length);
    } catch (e) {
      // Animation may already exist
    }
  }

  // Navigation indicators style
  const navIndicatorsStyle = {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '20px',
    width: '100%',
    zIndex: 5,
  };

  const indicatorStyle = (index) => ({
    width: '8px',
    height: '8px',
    margin: '0 4px',
    borderRadius: '50%',
    backgroundColor: currentSlide === index ? theme.colors.white : `${theme.colors.white}50`,
    transition: 'all 0.3s ease',
  });

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  // If no insights yet, show nothing (prevents errors)
  if (!insights && !loading) return null;

  return (
    <div className="app">
      {loading ? (
        <div style={loadingContainerStyle}>
          <h1 style={loadingTextStyle}>
            Preparing Your Pub Wrapped...
          </h1>
          <div style={spinnerStyle}></div>
        </div>
      ) : (
        <div 
          className="slides-container"
          onClick={goToNextSlide}
          style={{ cursor: currentSlide < slides.length - 1 ? 'pointer' : 'default' }}
        >
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 }
              }}
              className="slide"
              style={{ backgroundColor: slides[currentSlide].background }}
            >
              <div className="slide-icon">{slides[currentSlide].icon}</div>
              <div className="slide-title">{slides[currentSlide].title}</div>
              {slides[currentSlide].content}
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div style={navIndicatorsStyle}>
            {slides.map((_, index) => (
              <div
                key={index}
                style={indicatorStyle(index)}
                onClick={(e) => {
                  e.stopPropagation();
                  setDirection(index > currentSlide ? 1 : -1);
                  setCurrentSlide(index);
                }}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="nav-buttons">
            {currentSlide > 0 && (
              <motion.button
                className="nav-button prev"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide();
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ←
              </motion.button>
            )}
            
            {currentSlide < slides.length - 1 && (
              <motion.button
                className="nav-button next"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide();
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                →
              </motion.button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
