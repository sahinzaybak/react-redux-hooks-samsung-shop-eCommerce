import React, { PureComponent } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux"; //redux ile bağlantı kurmak için connect gerekli.

//Components
import ProductFilter from "../components/productFilter.jsx";
import ProductList from "../components/productList.jsx";

//Actions
import { getProductList } from "../actions/products";

class products extends PureComponent {
  static propTypes = {
    Products: propTypes.array.isRequired,
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
              <div className="row">
                {this.props.Products.map((productInfo) => (
                  <ProductList product={productInfo} key={productInfo.id}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Products: state.products.productList,
  };
};

const mapDispatchToProps = {
  getProductList,
};

export default connect(mapStateToProps, mapDispatchToProps)(products);
