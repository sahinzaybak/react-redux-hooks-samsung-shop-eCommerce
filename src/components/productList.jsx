import React from "react";
import PropTypes from "prop-types";

const productList = (props) => {
  return (
    <div className="products-page__list mt-4">
      <div className="row">
        <div className="col-md-4">
          <div className="products-page__item">
            <img src="https://samsung.akinoncdn.com/products/2020/12/23/2696/46481173-cd83-4687-8b66-9746841f7a88.jpg" />
            <div className="d-flex justify-content-center mt-3">
              <p className="products-page__color"></p>
              <p className="products-page__color"></p>
              <p className="products-page__color"></p>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <p className="products-page__memory">128 GB</p>
              <p className="products-page__memory">256 GB</p>
            </div>
            <h2 className="products-page__phone mt-4">Galaxy S21 Utra 5G</h2>
            <h2 className="products-page__price mt-2 mb-2">15.999 TL</h2>
            <a className="button mt-4" href="#">
              Ürünü İncele
            </a>
          </div>
        </div>
        <div className="col-md-4">
          <div className="products-page__item"></div>
        </div>
        <div className="col-md-4">
          <div className="products-page__item"></div>
        </div>
      </div>
    </div>
  );
};

productList.propTypes = {};

export default productList;
