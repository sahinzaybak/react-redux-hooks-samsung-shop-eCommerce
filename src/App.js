import {Route, Switch} from 'react-router-dom';
import productsPage from './pages/products.jsx'
import productDetail from './pages/productDetail.jsx'
import basket from './pages/basket.jsx'

import 'bootstrap/dist/css/bootstrap.css'
import './assets/global.scss'
import './assets/scss/products-page.scss'
import './assets/scss/product-detail.scss'
import './assets/scss/basket.scss'

function App() {
  return (
    <div className="App">
       <Switch>
        <Route exact path='/' component={productsPage}></Route>
        <Route exact path='/:slug' component={productDetail}></Route>
        <Route exact path='/basket/list' component={basket}></Route>
      </Switch>
    </div>
  );
}

export default App;
