import React from 'react';
import { connect } from "react-redux";

//Actions
import {holdChoosenProductInfo} from '../../actions/productStorage'

const DetailColor = product => {
  //holdChoosenProductInfo(seçilenRenkId, seçilenHafızaId) => seçili renk ve hafızaya göre ürün detay bilgilerini günceller.
  function changeColorImage(productColorId){
    let memoryId = product.selectedMemory.id;
    let colorId = productColorId;
    let simId = product.selectedSim.id;
    product.holdChoosenProductInfo(colorId, memoryId, simId) 
    localStorage.setItem("selectedProductInfo", JSON.stringify({colorId, memoryId}))
  }
  return (
    <div className="product-detail__color mt-5">
      <div className="d-flex align-items-center">
        <h5 className="mr-2">Seçtiğiniz Renk:</h5>
        <p className="product-detail__color-selected " style={{borderBottom: `3px solid ${product.selectedColor.color}`}}>
          {product.selectedColor.name}</p>
      </div>
      <div className="text-center">
        <div className="d-flex align-items-center flex-wrap mt-4">
          {product.productInfo.length != 0 && product.productInfo.colors.map(productColor =>
            <div className={`product-detail__color-item mb-3 ${product.selectedColor.id == productColor.id ? "active" : ""}`} 
            key={productColor.id} onClick={() => {changeColorImage(productColor.id)}}>
              <span className="products-page__color mx-auto d-block small" style={{backgroundColor: productColor.color}}></span>
              <p className="product-detail__color-other">{productColor.name}</p>
            </div>
            )}
        </div>
      </div>
  </div>
  );
};

const mapStateToProps = () => {
  return{}
};

const mapDispatchToProps = {
  holdChoosenProductInfo
};

export default connect(mapStateToProps,mapDispatchToProps)(DetailColor);