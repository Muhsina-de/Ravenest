/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6B46C1', // Vibrant purple
          dark: '#553C9A',    // Darker purple for depth
          light: '#9F7AEA',   // Lighter purple for accents
          lighter: '#B794F4', // Very light purple for subtle highlights
        },
        secondary: {
          DEFAULT: '#E6EEFF', // Light blue-tinted background
          dark: '#D1E3FF',    // Slightly darker background
        },
        'text-primary': '#2D3748',
        'text-secondary': '#4A5568',
        success: '#10B981',
        warning: '#F59E0B',
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236B46C1' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'gradient-primary': 'linear-gradient(135deg, #6B46C1 0%, #553C9A 100%)',
        'gradient-light': 'linear-gradient(135deg, #9F7AEA 0%, #6B46C1 100%)',
        'gradient-background': 'linear-gradient(135deg, #E6EEFF 0%, #FFFFFF 50%, #D1E3FF 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} 