import React, {useState} from 'react'
import { connect } from "react-redux";

//Actions
import {basket} from '../../actions/basket'

const DetailHeader = (product, addBasket) => {
  function addBasket(){
     product.basket(product.selectedColor, product.selectedMemory, product.name)
  }
  return (
    <div className="product-detail__header sticky-top">
    <h3>{product.name}</h3>
      <div className="d-flex align-items-center justify-content-center">
        <div className={`spinner mr-5 pr-2 ${!product.loading ? "d-none" : ""}`} >
          <div className="spinner-border text-primary" role="status"></div>
        </div>
        <p className={`product-detail__price mr-4 ${product.loading ? "d-none" : ""}`}> {product.price} TL</p>
        <a className="button pr-5 pl-5" onClick={addBasket}>Sepete Ekle</a>
      </div>
  </div>
  );
};

const mapStateToProps = (state) => {
  return{
    loading: state.products.isLoading,
  }
};

const mapDispatchToProps = {
  basket
};

export default connect(mapStateToProps,mapDispatchToProps)(DetailHeader);
//rscp