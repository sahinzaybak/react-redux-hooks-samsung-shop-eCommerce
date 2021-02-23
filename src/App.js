import {Route} from 'react-router-dom';
import productsPage from './pages/products.jsx'

import 'bootstrap/dist/css/bootstrap.css'
import './assets/global.scss'
import './assets/scss/products-page.scss'

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={productsPage}></Route>
    </div>
  );
}

export default App;
