import React, { PureComponent } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux"; //redux ile bağlantı kurmak için connect gerekli.

//Components
import ProductFilter from '../components/productFilter.jsx'
import ProductList from '../components/productList.jsx'

class examplePage extends PureComponent {
  static propTypes = {};

  render() {
    return (
      <div className="products-page">
        <div className="row">
          <div className="col-md-3">
            <div className="products-page__filter">
              <ProductFilter />
            </div>
          </div>
          <div className="col-md-9">
             <ProductList />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(examplePage);
