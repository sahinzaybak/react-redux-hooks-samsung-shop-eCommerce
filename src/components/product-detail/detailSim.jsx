import React,{useState} from 'react'
const DetailSim = product => {
  const [selectedSim, setSelectedSim] = useState(0)
  const [isSpinnerSim, setSpinnerSim] = useState(false) 
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
            ${product.productInfo.sim[selectedSim].id == productSim.id ? "active" : ""}`} key={productSim.id} onClick={() => {
              setSpinnerSim(true)
              setTimeout(() => {setSelectedSim(productSim.id)}, 700);
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

export default DetailSim;