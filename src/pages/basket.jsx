import React, { PureComponent } from 'react';
import { connect } from "react-redux";

//Components
import BasketList from '../components/basket-page/basketList'
import BasketSummary from '../components/basket-page/basketSummary'
import CouponCode from '../components/basket-page/couponCode'

class basket extends PureComponent {
  render() {
    return (
      <div className="basket-page">
        <div className="basket">
          <h4 class="basket-title">Sepetim ({this.props.basketList.length} Ürün)</h4>
          <div className="row">
            <div className="col-md-8">
              {this.props.basketList.map((basketList,index) => (
                <BasketList basket={basketList} basketProductIndex={index}/>
              ))}
            </div>
            <div className="col-md-4">
              <div className="basket-summary">
                <h5 class="basket-title mb-3">Sipariş Özeti</h5>
                <BasketSummary basket={this.props.basketList}/>
              </div>
              <div className="basket-summary coupon mt-3">
                <CouponCode />
              </div>
              <a className="button w-100 text-center mt-4 green" onClick={(e) => this.checkCode(e.target.value)}>Siparişi Onayla</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    basketList: state.basket.basketList
  };
};

export default connect(mapStateToProps)(basket);
