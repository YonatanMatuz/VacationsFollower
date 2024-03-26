import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import interceptorService from './Services/interceptorService';
import Layout from './Components/LayoutArea/Layout/Layout';
import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

// Create interceptor for automatic sending of tokens
interceptorService.create();

// Create custom theme
const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#8d9cea',
      light: '#5f6fde',
      dark: '#3143a2',
    },
    secondary: {
      main: '#f50057',
    },
    error: {
      main: '#ff1505',
    },
    info: {
      main: '#f2f5f5',
    },
    background: {
      default: '#d0b9b9',
      paper: '#d6d1d1',
    },
  },
  typography: {
    body1: {
      fontSize: '1 rem',
      fontWeight: 500,
      lineHeight: 1.46,
    },
  },
};

// Create theme
const defaultTheme = createTheme(themeOptions);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Wrappers are, React router, MUI Theme, MUI localization for dates
root.render(
  <BrowserRouter>

    <ThemeProvider theme={defaultTheme}>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Layout />
      </LocalizationProvider>
      
    </ThemeProvider>

  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
