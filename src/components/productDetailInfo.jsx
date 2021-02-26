import React,{useState, useEffect} from 'react'
import { connect } from "react-redux";
import propTypes from "prop-types";

// function componenet mapStateToProps this.props yerine "productStorage" burada tanımlamamaız gerekli ki "productStorage" diye kullabilelim.
const ProductDetailInfo = ({productInfo, productStorage}) => {
  let [selectedMemory, setSelectedMemory] = useState('')
  let [selectedColor, setSelectedColor] = useState('')
  useEffect(() => {
    if(productInfo.length != 0 && productStorage.length != 0 ){
      setSelectedMemory(productInfo.memory.find(item => item.id === productStorage._memoryId)) //seçili hafıza
      productInfo.colorsImage.forEach(element => { //seçili renge ait resimler
        if(Object.keys(element).find(item => item === productStorage._colorId))
          console.log(element[productStorage._colorId])
      });
    }      
  })
 
  return (
    <div>
      <h2>{productInfo.name}</h2>
      <h2>{selectedMemory.price}</h2>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    productStorage: state.productStorage.productStorageInfo
  };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetailInfo);