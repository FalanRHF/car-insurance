// import logo from './logo.svg';
import './App.css';

//router related imports
import { useRoutes } from "react-router-dom"
import Router from './routes'


//date-picker related imports
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

//redux related imports
import { Provider as ReduxProvider } from 'react-redux'
import reduxStore from './redux/reduxStore'

// const App = () => {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }



const App = () => {
  // const contents = useRoutes(routes)

  return (
    <ReduxProvider store={reduxStore}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Router />
      </LocalizationProvider>
    </ReduxProvider>
  );
}

export default App
