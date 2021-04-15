import {Route, Switch} from 'react-router-dom';
import productsPage from './pages/products.jsx'
import productDetail from './pages/productDetail.jsx'
import basket from './pages/basket.jsx'
import payment from './pages/payment.jsx'
import previousOrder from './pages/previousOrder.jsx'
import notFound from './pages/notFound';

import 'bootstrap/dist/css/bootstrap.css'
import './assets/global.scss'

function App() {
  return (
    <div className="App">
       <Switch>
        <Route exact path='/' component={productsPage}></Route>
        <Route exact path='/basket-list' component={basket}></Route>
        <Route exact path='/payment' component={payment}></Route>
        <Route exact path='/previous-order' component={previousOrder}></Route>
        <Route exact path="/notFound" component={notFound} />    
        <Route exact path='/:slug' component={productDetail}></Route>
        <Route path="" component={notFound} />   
      </Switch>
    </div>
  );
}

export default App;
