import React,{useState} from 'react'
import PropTypes from "prop-types";
import { Tooltip, Button, Divider } from 'antd';

const ProductList = ({ product }) => {
  const [colorId, setColorId] = useState(0) 
  const [memoryId, setMemoryId] = useState(0) 
  const [isActiveColor, setActiveColor] = useState("") 
  const [isActiveMemory, setActiveMemory] = useState("") 
  const [isSpinner, setSpinner] = useState(true) 

  return (
    <div className="col-md-4" key={product.id}>
      <div className="products-page__item">
        <img src={product.colors[colorId].image} />
        <div className="d-flex justify-content-center mt-3">
          {product.colors.map(rgb => 
            <Tooltip title={rgb.name} color={rgb.color} key={rgb.id} >
              <p className={`products-page__color ${isActiveColor ? "active" : ""}`} 
              style={{backgroundColor: rgb.color}} onClick={() => {
                setColorId(rgb.id);
                setActiveColor(true)} 
              }></p>
            </Tooltip>
          )}
        </div>
        <div className="d-flex justify-content-center mt-4">
          {product.memory.map(memory =>
            <p className={`products-page__memory ${isActiveMemory ? "active" : ""}`} key={memory.id} onClick={() => {
              setSpinner(false)
              setTimeout(() => {setMemoryId(memory.id)}, 1000);
              setTimeout(() => {setSpinner(true)}, 1000);
              setActiveMemory(true)} 
            } >{memory.gb} GB</p>
          )}
        </div>
        <h2 className="products-page__phone mt-4">{product.name}</h2>
        <div className="products-page__middle">
          <h2 className={`products-page__price mt-2 mb-2 ${!isSpinner ? "d-none" : ""}`} >{product.memory[memoryId].price} TL</h2>
          <div className={`spinner mt-2 ${isSpinner ? "d-none" : ""}`} >
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        </div>
        <a className="button mt-4" href="#">Ürünü İncele</a>
      </div>
    </div>
  );
};

ProductList.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductList;
