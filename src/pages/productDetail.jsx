import React, { PureComponent } from "react";
import { connect } from "react-redux";
//Actions
import {getProductDetail} from '../actions/products'
import {holdChoosenProductInfo} from '../actions/productStorage'

//Components
import ProductInfo from '../components/productDetailInfo'

class productDetail extends PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug; 
    this.props.getProductDetail(slug)
    let isSelectedProductInfo = JSON.parse(localStorage.getItem("selectedProductInfo"))

    //Herhangi bir ürün detay(gb, renk) seçilmediğinde default geleecek bilgiler.
    if(isSelectedProductInfo == null) this.props.holdChoosenProductInfo(0,0) 
    else this.props.holdChoosenProductInfo(isSelectedProductInfo.colorId, isSelectedProductInfo.memoryId)
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
  getProductDetail,
  holdChoosenProductInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(productDetail);
