import {Route} from 'react-router-dom';
import productsPage from './pages/products.jsx'
import productDetail from './pages/productDetail.jsx'

import 'bootstrap/dist/css/bootstrap.css'
import './assets/global.scss'
import './assets/scss/products-page.scss'

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={productsPage}></Route>
      <Route exact path='/:slug' component={productDetail}></Route>
    </div>
  );
}

export default App;
