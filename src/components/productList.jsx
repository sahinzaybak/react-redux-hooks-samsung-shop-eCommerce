import React,{useState} from 'react'
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import { Tooltip } from 'antd';


//Actions
import {holdChoosenProductInfo} from '../actions/productStorage'

//Function componenet servis return dispatch sorunu mapDispatchToProps değerini bu kısmı da yazmamız gerekli.
const ProductList = ({ product, holdChoosenProductInfo }) => { 
  const [colorId, setColorId] = useState(0) 
  const [memoryId, setMemoryId] = useState(0) 
  const [simId, setSimId] = useState(0) 
  const [isActiveColor, setActiveColor] = useState("") 
  const [isActiveMemory, setActiveMemory] = useState("") 
  const [isSpinner, setSpinner] = useState(false) 

  function holdChoosenInfo(){ //seçilen ürün bilgilerini (renk, gb) detay sayfamızda kullabilmek için state'e attık. 
    holdChoosenProductInfo(colorId, memoryId, simId)
    localStorage.setItem("selectedProductInfo", JSON.stringify({colorId, memoryId, simId}))
  }

  return ( 
    <div className="col-md-4" key={product.id}>
      <div className="products-page__item">
        <img src={product.colors[colorId].image} />
        <div className="d-flex justify-content-center mt-3">
          {product.colors.map((rgb,index) => 
            <Tooltip title={rgb.name} color={rgb.color} key={rgb.id} >
              <p className={`products-page__color ${index == isActiveColor ? "active" : ""}`} key={index} style={{backgroundColor: rgb.color}} 
              onClick={() => {
                setColorId(rgb.id);
                setActiveColor(index)} 
              }></p>
            </Tooltip>
          )}
        </div>
        <div className="d-flex justify-content-center mt-4">
          {product.memory.map((memory,index) =>
            <p className={`products-page__memory ${index == isActiveMemory ? "active" : ""}`} key={memory.id} 
            onClick={() => {
              setSpinner(true)
              setTimeout(() => {setMemoryId(memory.id)}, 700);
              setTimeout(() => {setSpinner(false)}, 700);
              setActiveMemory(index)} 
            } >{memory.gb} GB</p>
          )}
        </div>
        <h2 className="products-page__phone mt-4">{product.name}</h2>
        <div className="products-page__middle">
          <h2 className={`products-page__price mt-3 mb-2 ${isSpinner ? "d-none" : ""}`} >{product.memory[memoryId].price} TL</h2>
          <div className={`spinner mt-1 ${!isSpinner ? "d-none" : ""}`} >
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        </div>
        <Link to={`/${product.slug}`} className="button mt-4" onClick={holdChoosenInfo}>Ürünü İncele</Link>
      </div>
    </div>
  );
};

ProductList.propTypes = {
  product: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    productStorage: state.productStorage.productStorageInfo
  };
};

const mapDispatchToProps = {
  holdChoosenProductInfo
};

export default connect(mapStateToProps,mapDispatchToProps)(ProductList);

