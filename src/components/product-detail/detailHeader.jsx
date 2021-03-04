import React, {useState} from 'react'
import { connect } from "react-redux";


//Actions
import {basket} from '../../actions/basket'

const DetailHeader = (product, addBasket) => {
  const [basketLoading , setBasketLoading] = useState(false)
  const [basketSuccess , setBasketSuccess] = useState(false)
  function addBasket(){
    setBasketLoading(true)
    setTimeout(() => {  
       product.basket(product.selectedColor, product.selectedMemory, product.name, product.id); //sepete ekle
       setBasketSuccess(true)
    },1200);
    setTimeout(() => {setBasketSuccess(false); setBasketLoading(false)}, 2500);
  }
  return (
    <div className="product-detail__header sticky-top">
    <h3>{product.name}</h3>
      <div className="d-flex align-items-center justify-content-center">
        <div className={`spinner mr-5 pr-2 ${!product.loading ? "d-none" : ""}`} >
          <div className="spinner-border text-primary" role="status"></div>
        </div>
        <p className={`product-detail__price mr-4 ${product.loading ? "d-none" : ""}`}> {product.price} TL</p>
        <div className={`basket-button button pr-5 pl-5 cursor-pointer ${basketLoading ? "disable" : ""} , ${basketSuccess ? "success" : ""}`} onClick={addBasket}>
          <div className="basket-loading d-flex align-items-center">
            <div className="spinner mt-1 mr-3">
              <div className="spinner-border text-light" role="status"></div>
            </div>
            <p>Sepete Ekleniyor</p>
          </div>
          <p class="basket-add-text">Ürünü Sepete Ekle</p>
          <p class="basket-add-success">Sepete Eklendi</p>
          </div>
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



  // store.addNotification({
    //   message: "Sepete Eklendi!",
    //   type: "success",
    //   insert: "top",
    //   width:200,
    //   container: "top-right",
    //   animationIn: ["animate__animated", "animate__fadeIn"],
    //   animationOut: ["animate__animated", "animate__fadeOut"],
    //   dismiss: {
    //     duration: 2000,
    //     onScreen: false
    //   },
    // })