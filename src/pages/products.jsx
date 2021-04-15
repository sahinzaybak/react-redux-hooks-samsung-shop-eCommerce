import React, { PureComponent } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux"; //redux ile bağlantı kurmak için connect gerekli.
import '../assets/scss/products-page.scss'

//Components
import ProductFilter from "../components/productFilter.jsx";
import ProductList from "../components/productList.jsx";
import ProductListLoader from '../components/content-loader/product-list-loader'

//Actions
import { getProductList } from "../actions/products";

class products extends PureComponent {
  static propTypes = {
    products: propTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.getProductList();
  }

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
            <div className="products-page__list mt-4">
              {this.props.products.length != 0  &&
                <div className="row">
                  {this.props.products.map((productInfo) => (<ProductList product={productInfo} key={productInfo.id}/>))}
                </div>
              } 
              {this.props.products.length == 0 && !this.props.isFilter && <ProductListLoader />}
              {this.props.products.length == 0 && this.props.isFilter && <h2>Aradığınız kriterlere uygun ürün bulunamadı.</h2>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.productList,
    isFilter: state.products.isFilter,
  };
};

const mapDispatchToProps = {
  getProductList,
};

export default connect(mapStateToProps, mapDispatchToProps)(products);
