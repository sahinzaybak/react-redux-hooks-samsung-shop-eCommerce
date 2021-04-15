import React, { useRef, useState, useEffect } from "react";
import { connect} from "react-redux";
import {Link} from 'react-router-dom';
import { store } from 'react-notifications-component';
import { Modal } from 'antd';
import { ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { useHistory } from "react-router";
import "../assets/scss/layout/header.scss";
import headerImage from "../assets/images/header.png";
import basketImg from "../assets/images/shopping-cart.svg";

//Actions
import {basketItemDelete} from '../actions/basket'
import {basketStorage} from '../actions/basket'
import {previousOrder,previousOrderStorage} from '../actions/previousOrder'

const { confirm } = Modal;
const Header = (product) => {
  const history = useHistory();
  const [basketHover, setBasketHover] = useState(false)
  if(product.basketList.length != 0)
    localStorage.setItem("basket", JSON.stringify(product.basketList)); //state basketList yenilendiğinde localStorage'de yenilenir.

  if(product.previousOrderList.length != 0)
    localStorage.setItem("myPrevOrderList", JSON.stringify(product.previousOrderList)); //state prevOrderList yenilendiğinde localStorage'de yenilenir.

  let basket = JSON.parse(localStorage.getItem("basket"));
  let previousOrder = JSON.parse(localStorage.getItem("myPrevOrderList"));

  function orderComplete(){
    confirm({
      title: 'Siparişi tamamlamak istediğinizden emin misiniz?',
      icon: <ExclamationCircleOutlined />,
      centered:true,
      okText: 'Evet',
      okType: 'success',
      cancelText: 'Hayır',
      confirmLoading:true,
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 1000 ? resolve  : reject, 1000);
          setTimeout(() => {
            history.push("/payment")
          }, 1000);
        }).catch(() =>false);
      },
    });
  }

  function deleteItem(basketProductId){
    confirm({
      title: 'Ürünü sepetten çıkarmak istediğinize emin misiniz?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Evet',
      centered:true,
      okType: 'danger',
      cancelText: 'Hayır',
      confirmLoading:true,
      onOk() {
        if(product.basketList.length == 1) localStorage.clear();
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 1000 ? resolve  : reject, 1000);
          setTimeout(() => {
            product.basketItemDelete(basketProductId) //sepetten seçili ürünü sil.
            store.addNotification({
              message: "Ürün sepetten çıkarıldı",
              type: "success",
              insert: "top",
              width:250,
              showIcon:true,
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 2000,
                onScreen: false
              },
            })
          }, 1000);
        }).catch(() =>false);
      },
    });
  }

  //sayfa yenilendiğinde local storage'deki bilgileri state'teki ilgili dizilere doldur.  --> [] sadece bir kere..
  useEffect(() => {
  if(basket != null)
    product.basketStorage();

  if(previousOrder != null)
    product.previousOrderStorage();
  },[]);

  return (
    <div className="header d-flex">
      <div className="header-img d-none d-lg-block">
        <img src={headerImage} loading="lazy" alt="" />
      </div>
      <div className={`header-basket ${basketHover ? "activeBasket" : ""}`}>
        <Link to="/previous-order" className="header-basket__item">
          {previousOrder == null ? 
            (<p className="header-basket__text">Önceki Siparişlerim (0)</p>) :
            (<p className="header-basket__text">Önceki Siparişlerim ({previousOrder.length}) </p>)
          }
        </Link>
        
        <Link to="/basket-list" className="header-basket__item" onMouseEnter={() => {setBasketHover(true)}} onMouseLeave={() => {setBasketHover(false)}} >
          <p className="header-basket__text">Sepetim</p>
          <img className="ml-2" src={basketImg} alt="" />
          {basket == null ? 
            (<span className="header-basket__count ml-1">0</span>) :
            (<span className="header-basket__count ml-1">{basket.length}</span>)
          }
        </Link>
    
        {basket != null && 
          <div className="header-basket__products">
            <p className="ml-3 mb-2 mt-1">Sepetim ({basket.length})</p>
            {basket != null && basket.map((basket,index) => ( 
              <div className="d-flex header-basket__products-wrp" key={index}>
                <div className="d-flex align-items-start">
                  <img src={basket.color.image} alt=""/>
                </div>
                <div className="d-block">
                  <h4 className="header-basket__products-name mt-1 mb-2">{basket.productName}</h4>
                  <p className="header-basket__products-item" >Renk: {basket.color.name}</p>
                  <p className="header-basket__products-item">Hafıza: {basket.memory.gb} GB</p>
                  <p className="header-basket__products-item">SIM: {basket.sim.name} Kart</p>
                  <p className="header-basket__products-price mt-1">{basket.memory.price.toFixed(3)} TL</p>
                  <p className="header-basket__products-s mt-1">{basket.count} Adet</p>
                </div>
                <div className="ml-auto mr-2">
                  <p onClick={() => {deleteItem(index)}}><DeleteOutlined /></p>
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-around">
              <Link to="/basket-list" className="button pr-4 pl-4 p-1 small white">Sepeti Gör</Link>
              <a className="button pr-4 pl-4 p-1 small green" onClick={orderComplete.bind(this)}>Siparişi Tamamla</a>
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
    previousOrderList: state.previousOrder.previousOrderList
  };
};

const mapDispatchToProps = {
  basketItemDelete,
  basketStorage,
  previousOrder,
  previousOrderStorage
  
};

export default connect(mapStateToProps,mapDispatchToProps)(Header);
//rscp
