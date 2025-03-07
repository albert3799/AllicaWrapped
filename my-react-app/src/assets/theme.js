// Theme configuration for Allica Bank Wrapped experience
// Using Allica Bank's brand colors with Spotify Wrapped-inspired styling

export const theme = {
  // Primary brand colors for Allica Bank
  colors: {
    primary: '#0047AB', // Deep blue (Allica primary)
    secondary: '#00A6ED', // Light blue
    accent: '#FFB81C', // Gold/Yellow
    success: '#4CAF50', // Green
    danger: '#E53935', // Red
    white: '#FFFFFF',
    black: '#000000',
    gray: '#F5F5F5',
    darkGray: '#333333',
    chartColors: [
      '#0047AB', // Deep blue 
      '#00A6ED', // Light blue
      '#FFB81C', // Gold
      '#4CAF50', // Green
      '#E53935', // Red
      '#9C27B0', // Purple
    ]
  },
  // Typography
  typography: {
    fontFamily: "'Montserrat', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    heading: {
      fontWeight: 700,
      lineHeight: 1.2,
    },
    body: {
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
  // Spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  // Borders and shapes
  shapes: {
    borderRadius: '8px',
    cardBorderRadius: '16px',
    buttonBorderRadius: '24px',
  },
  // Shadows
  shadows: {
    card: '0px 8px 20px rgba(0, 0, 0, 0.1)',
    button: '0px 4px 12px rgba(0, 0, 0, 0.15)',
  },
  // Animation durations
  animation: {
    fast: '0.2s',
    medium: '0.5s',
    slow: '0.8s',
  }
}; 