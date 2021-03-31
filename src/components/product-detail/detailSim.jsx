import React,{useState} from 'react'
import { connect } from "react-redux";
//Actions
import {holdChoosenProductInfo} from '../../actions/productStorage'

const DetailSim = (product) => {
  debugger;
  const [selectedSim, setSelectedSim] = useState(0)
  const [isSpinnerSim, setSpinnerSim] = useState(false) 

  function changeSim(productSimId){
    let simId = productSimId;
    let colorId = product.selectedColor.id;
    let memoryId = product.selectedMemory.id;
    product.holdChoosenProductInfo(colorId, memoryId, simId)
    localStorage.setItem("selectedProductInfo", JSON.stringify({colorId, memoryId, simId}))
  }

  return (
    <div className="product-detail__color mt-4">
      <div className="wrp d-flex align-items-center">
        <h5 className="mr-2">Seçili SIM:</h5>
        <div className={`spinner mt-1 mr-5 pr-2 ${!isSpinnerSim ? "d-none" : ""}`} >
          <div className="spinner-border text-primary" role="status"></div>
        </div>
        {product.productInfo.length != 0 && 
          <p className={`product-detail__color-selected ${isSpinnerSim ? "d-none" : ""}`}>{product.productInfo.sim[selectedSim].name} Kart</p>
        }
      </div>
      <div className="text-center">
        <div className="d-flex align-items-center flex-wrap mt-4">
          {product.productInfo.length != 0 && product.productInfo.sim.map(productSim =>
            <div className={`product-detail__color-item mb-3 p-2 pb-3 
              ${product.selectedSim.id == productSim.id ? "active" : ""}`}  key={productSim.id} onClick={() => {
                setSpinnerSim(true)
                setTimeout(() => {changeSim(productSim.id)}, 0);
                setTimeout(() => {setSelectedSim(productSim.id)}, 0);
                setTimeout(() => {setSpinnerSim(false)}, 700);
              }}>
              <p className="product-detail__color-other">{productSim.name} SIM</p>
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

export default connect(mapStateToProps,mapDispatchToProps)(DetailSim);