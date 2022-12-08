import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore,applyMiddleware,compose } from 'redux';
import reducers from './reducers/index.js'
import reduxThunk from 'redux-thunk'
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import moment from 'moment';
import App from './Components/App';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,composeEnhancers(applyMiddleware(reduxThunk)))
moment.locale('es')



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider  store={store}>
    <Router>
      <Routes>
        <Route path='*' exact element={<App/>}></Route>
      </Routes>
    </Router>
    </Provider>
  </React.StrictMode>
);

