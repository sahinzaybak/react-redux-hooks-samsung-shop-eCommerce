import React, { PureComponent } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
//Actions
import {getProductDetail} from '../actions/products'

//Components
import ProductInfo from '../components/productDetailInfo'

class productDetail extends PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug; 
    this.props.getProductDetail(slug)
  }

  render() {
    return (
      <div className="product-detail">
        <ProductInfo productInfo={this.props.productDetail} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productDetail: state.products.productDetail
  };
};

const mapDispatchToProps = {
  getProductDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(productDetail);
