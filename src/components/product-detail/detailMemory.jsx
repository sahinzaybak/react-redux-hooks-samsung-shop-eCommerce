import React from 'react'
import { connect,useDispatch } from "react-redux";

//Actions
import {holdChoosenProductInfo} from '../../actions/productStorage'

const DetailMemory = (product) => {
  const dispatch = useDispatch();
  //holdChoosenProductInfo(seçilenRenkId, seçilenHafızaId) => seçili renk ve hafızaya göre ürün detay bilgilerini günceller.
  //Hafıza değişimi (Hafıza seçimine göre state değişimi)
  function changeMemory(productMemoryId){
    let memoryId = productMemoryId;
    let colorId = product.selectedColor.id;
    let simId = product.selectedSim.id;
    product.holdChoosenProductInfo(colorId, memoryId, simId)
    localStorage.setItem("selectedProductInfo", JSON.stringify({colorId, memoryId, simId}))
  }

  return (
    <div className="product-detail__color mt-4">
      <div className="wrp d-flex align-items-center">
        <h5 className="mr-2">Seçtiğiniz Hafıza:</h5>
        <div className={`spinner mt-1 mr-5 pr-2 ${!product.loading ? "d-none" : ""}`} >
          <div className="spinner-border text-primary" role="status"></div>
        </div>
        <p className={`product-detail__color-selected ${product.loading ? "d-none" : ""}`}>{product.selectedMemory.gb} GB</p>
      </div>
      <div className="text-center">
        <div className="d-flex align-items-center flex-wrap mt-4">
          {product.productInfo.length != 0 && product.productInfo.memory.map(productMemory =>
            <div className={`product-detail__color-item mb-3 p-2 pb-3 ${product.selectedMemory.id == productMemory.id ? "active" : ""}`} 
            key={productMemory.id} onClick={() => {
              dispatch({ type: 'LOADING' , payload: true })
              setTimeout(() => {changeMemory(productMemory.id)}, 0);
              setTimeout(() => {dispatch({ type: 'LOADING' , payload: false })}, 700);
            }}>
              <p className="product-detail__color-other">{productMemory.gb} GB</p>
              <p className="product-detail__color-price">({productMemory.price} TL)</p>
            </div>
            )}
        </div>
      </div>
  </div>
  );
};

const mapStateToProps = (state) => {
  return{
    loading: state.products.isLoading
  }
};

const mapDispatchToProps = {
  holdChoosenProductInfo
};

export default connect(mapStateToProps,mapDispatchToProps)(DetailMemory);