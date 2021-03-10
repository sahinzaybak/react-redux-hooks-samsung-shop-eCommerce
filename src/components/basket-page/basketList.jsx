import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import {basketItemIncreaseCount} from '../../actions/basket'
import {summaryLoading} from '../../actions/basket'

class basketList extends PureComponent {
  state = {
    productCount: this.props.basket.count,
    price : this.props.basket.memory.price,
    isSpinner:false
  }
  
  increaseProductCount = (productCount,basketProductIndex) => {
    var newPrice = this.props.basket.memory.price * productCount
    this.setState({price : newPrice})
    this.setState({productCount : productCount})
    this.setState({isSpinner : true})

    this.props.basketItemIncreaseCount(newPrice,basketProductIndex,productCount) //Ürün adedi arttırma
    this.props.summaryLoading(true) //Sipariş özeti loading

    setTimeout(() => {this.setState({isSpinner : false})}, 700);
    setTimeout(() => {this.props.summaryLoading(false)}, 700);
  }
  render() {
    return (
      <div className="basket-item">
        <div className="d-flex align-items-center">
            <div className="basket-item__img">
            <img src={this.props.basket.color.image} alt=""/>
          </div>
          <div className="basket-item__info">
            <h5 className="mb-2 mt-2">{this.props.basket.productName}</h5>
            <p>Renk: {this.props.basket.color.name}</p>
            <p>Hafıza: {this.props.basket.memory.gb}</p>
            <p>SIM: Tek SIM</p>
          </div>
          <div className="basket-item__counter ml-5 mr-5">
            <input type="number" value={this.props.basket.count} minlength="1" onChange={e => this.increaseProductCount(e.target.value,this.props.basketProductIndex)}/> Adet
          </div>
          <div className="basket-item__price">
            <div className="d-flex">
              <div className={`spinner mt-1 ${!this.state.isSpinner ? "d-none" : ""}`} >
                <div className="spinner-border text-primary" role="status"></div>
              </div>
              <h4 className={`${this.state.isSpinner ? "d-none" : ""}`}>{this.props.basket.memory.price} TL</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

basketList.propTypes = {
  basket: PropTypes.object.isRequired,
  basketProductIndex: PropTypes.object.isRequired 
};

const mapStateToProps = (state) => {
  return{}
};

const mapDispatchToProps = {
  basketItemIncreaseCount,
  summaryLoading
};

export default connect(mapStateToProps,mapDispatchToProps)(basketList);