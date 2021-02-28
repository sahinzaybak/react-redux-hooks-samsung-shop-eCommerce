import React from 'react'
import { connect } from "react-redux";

const DetailHeader = product => {
  function addBasket(){
    console.log(product.selectedColor)
    console.log(product.selectedMemory)
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
    loading: state.products.isLoading
  }
};


export default connect(mapStateToProps)(DetailHeader);
//rscp