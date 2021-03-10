import React,{useState,useEffect} from 'react'
import { connect } from "react-redux";

const BasketSummary = (basketList) => {
  const [cargoPrice, setCargoPrice] = useState(9) //Kargo ücreti
  const [couponCode, setCouponCode] = useState(0)

  useEffect(() => {
    if(basketList.isCouponCode)
      setCouponCode(0.100)  //100
  },[basketList.isCouponCode])

  return (
    <div className="basket-summary__wrp">
        <div className="d-flex basket-summary__item">
          <p> Ürün Toplamı: </p>
          <div className="d-flex ml-2">
            <span className={`${basketList.isBasketLoading ? "d-none" : ""}`}>
              {(basketList.basket.reduce((a,v) =>  a = a + v.memory.price , 0 ).toFixed(3))} TL 
            </span>
            <div className={`spinner ml-2 ${!basketList.isBasketLoading  ? "d-none" : ""}`} >
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          </div>
        </div>
        <div className="d-flex basket-summary__item">
          <p> Kargo Ücreti: </p>
          <div className="d-flex ml-2">
            <span>+{cargoPrice} TL </span>
          </div>
        </div>
        <div className={`d-flex basket-summary__item ${!basketList.isCouponCode ? "disabled" : ""}`}>
          <p> İndirimsiz Sipariş Tutarı: </p>
          <div className="d-flex ml-2">
            <span className={`${basketList.isBasketLoading ? "d-none" : ""}`}>
            {(basketList.basket.reduce((a,v) =>  a = (a + v.memory.price) + 0,9, 0 ).toFixed(3))} TL 
            </span>
          </div>
        </div>
        <div className={`d-flex basket-summary__item ${!basketList.isCouponCode ? "disabled" : ""}`}>
          <p> Kupon Kodu İndirimi: </p>
          <div className="d-flex ml-2">
            <span>-100 TL </span>
          </div>
        </div>
       
        <div className="d-flex basket-summary__item">
          <p> </p>
          <div className="d-flex ml-2">
            <span className={`total-price ${basketList.isBasketLoading ? "d-none" : ""}`}>
            {(basketList.basket.reduce((a,v) =>  a = (a + v.memory.price) + 0,9 - (couponCode), 0 ).toFixed(3))} TL 
            </span>
            <div className={`spinner ml-2 ${!basketList.isBasketLoading  ? "d-none" : ""}`} >
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          </div>
        </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return{
    isBasketLoading: state.basket.isLoading,
    isCouponCode: state.couponCode.checkCouponCode
  }
};

export default connect(mapStateToProps)(BasketSummary);
