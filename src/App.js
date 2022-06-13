// import logo from './logo.svg';
import './App.css';

//router related imports
import Router from './routes'


//date-picker related imports
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

//redux related imports
import { Provider as ReduxProvider } from 'react-redux'
import reduxStore from './redux/reduxStore'

const App = () => {

  return (
    <ReduxProvider store={reduxStore}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Router />
      </LocalizationProvider>
    </ReduxProvider>
  );
}

export default App
