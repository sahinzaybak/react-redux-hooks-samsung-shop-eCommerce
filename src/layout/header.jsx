import React, { PureComponent } from "react";
import { connect } from "react-redux";

import "../assets/scss/layout/header.scss";
import headerImage from "../assets/images/header.png";
import basketImg from "../assets/images/shopping-cart.svg";

const DetailHeader = (product) => {
  if(product.basketList.length != 0)
    localStorage.setItem("basket", JSON.stringify(product.basketList));

  const basket = JSON.parse(localStorage.getItem("basket"));
  let sameProduct = []
  let matchProducts;
  basket.forEach(element => {
    sameProduct.push({name : element.productName, color: element.color.name})
    matchProducts = sameProduct.filter( x => x.name == element.productName  && x.color == element.color.name) //Sepetteki aynı ürünler
  });
 
  console.log(matchProducts)


  return (
    <div className="header d-flex">
      <div className="header-img">
        <img src={headerImage} alt="" />
      </div>
      <div className="header-basket">
        <div className="header-basket__item">
          <p className="header-basket__text">Sepetim</p>
          <img className="ml-2" src={basketImg} alt="" />
          {basket == null && (<span className="header-basket__count ml-1">0</span>)}
          {basket != null && (<span className="header-basket__count ml-1">{basket.length}</span>)}
        </div>

        {basket != null && 
            <div className="header-basket__products">
              <p className="ml-3 mb-2 mt-1">Sepetim ({basket.length})</p>
              {basket != null && basket.map((basket) => ( 

                <div className="d-flex header-basket__products-wrp" key={basket.id}>
                  <div className="d-flex align-items-start">
                    <img src={basket.color.image} alt=""/>
                  </div>
                  <div className="d-block">
                    <h4 className="header-basket__products-name mt-1 mb-2">{basket.productName}</h4>
                    <p className="header-basket__products-item" >Renk: {basket.color.name}</p>
                    <p className="header-basket__products-item">Hafıza: {basket.memory.gb} GB</p>
                    <p className="header-basket__products-item">SIM: Tek Sim</p>
                    <p className="header-basket__products-price mt-1">{basket.memory.price} TL</p>
                  </div>
                </div>
              ))}

              <div className="d-flex justify-content-around">
                <a className="button pr-4 pl-4 p-1 small white">Sepeti Gör</a>
                <a className="button pr-4 pl-4 p-1 small green">Siparişi Tamamla</a>
              </div>
            </div>
          }
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    basketList: state.basket.basketList,
  };
};

export default connect(mapStateToProps)(DetailHeader);
//rscp
