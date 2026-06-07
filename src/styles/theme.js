import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {

        primary: {
            main: '#6C63FF',       // Electric Violet
            dark: '#4B44CC',       // For hover
            light: '#9D97FF',      // lighter shade for backgrounds
            contrastText: '#fff',  // contrast text color for buttons and highlights
        },

        secondary: {
            main: '#FF6B6B',       // Coral Red
            dark: '#CC4444',
            light: '#FF9999',
            contrastText: '#fff',
        },

        success: { main: '#4ECDC4' },  // for success messages and indicators
        warning: { main: '#FFE66D' },  // for ratings
        error: { main: '#FF4444' },  // for errors and cancellations

        background: {
            default: '#F7F7F7',    // background color for the whole app
            paper: '#FFFFFF',    // background color for cards and modals
        },

        navbar: '#1a1a2e',       // Navy Deep
        navbarLight: '#2D2D44',  // Dark Slate
    },

    typography: {
        fontFamily: "'Segoe UI', sans-serif",
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h6: { fontWeight: 600 },
    },

    shape: {
        borderRadius: 12,  // rounded corners for buttons and cards
    },
});

export default theme;