import React,{useState, useEffect} from 'react'
import { connect } from "react-redux";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss"

//Actions
import {holdChoosenProductInfo} from '../actions/productStorage'

// function componenet mapStateToProps this.props yerine "productStorage" burada tanımlamamaız gerekli ki "productStorage" diye kullanabilelim.
const ProductDetailInfo = ({productInfo, productStorage, holdChoosenProductInfo}) => {
  const [selectedMemory, setSelectedMemory] = useState('')
  const [selectedColorImage, setSelectedColorImage] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
   const [isSpinner, setSpinner] = useState(false) 

  useEffect(() => {
    if(productInfo.length != 0 && productStorage.length != 0 ){
      setSelectedMemory(productInfo.memory.find(memory => memory.id === productStorage._memoryId)) // seçili hafıza
      setSelectedColor(productInfo.colors.find(color => color.id == productStorage._colorId)) // seçili renk
      productInfo.colorsImage.forEach(element => { // seçili renge ait resimler
        if(Object.keys(element).find(colorImageKey => colorImageKey == productStorage._colorId))
          setSelectedColorImage(element[productStorage._colorId])
      });
    }      
  })
  //Slider
  const productImages = [];
  {selectedColorImage.length != 0 && selectedColorImage.map(color =>  //seçilen resimlerin görüntülenmesi
    productImages.push({
      original: color.img,
      thumbnail: color.thumb
    })
  )}

  //Renk değişiminde slider resimleri değişsin. (Renk seçimine göre state değişimi)
  function changeColorImage(productColorId){
     holdChoosenProductInfo(productColorId, selectedMemory.id)
  }

   //Hafıza değişimi (Hafıza seçimine göre state değişimi)
   function changeMemory(productMemoryId){
    holdChoosenProductInfo(selectedColor.id, productMemoryId)
 }
 
  return (
    <div>
      <div className="product-detail__header">
        <h3>{productInfo.name}</h3>
        <div className="d-flex align-items-center justify-content-center">
          <div className={`spinner mt-2 mr-5 pr-2 ${!isSpinner ? "d-none" : ""}`} >
            <div className="spinner-border text-primary" role="status"></div>
          </div>
          <p className={`product-detail__price mr-4 ${isSpinner ? "d-none" : ""}`}> {selectedMemory.price} TL</p>
          <a href="#" className="button pr-5 pl-5">Sepete Ekle</a>
        </div>
      </div>
      <div class="row h-100">
        <div className="col-md-6">
          <div className="product-detail__slider h-100">
            <ImageGallery items={productImages} showPlayButton={false} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="product-detail__info h-100">
            <h4>{productInfo.name}</h4>
            <p class="product-detail__desc" dangerouslySetInnerHTML={{__html: productInfo.desc}}></p>
            <div className="product-detail__color mt-5">
              <div className="d-flex align-items-center">
                <h5 className="mr-2">Seçtiğiniz Renk:</h5>
                <p className="product-detail__color-selected " style={{borderBottom: `3px solid ${selectedColor.color}`}}>{selectedColor.name}</p>
              </div>
              <div className="text-center">
                <div className="d-flex align-items-center flex-wrap mt-4">
                  {productInfo.length != 0 && productInfo.colors.map(productColor =>
                    <div className="product-detail__color-item mb-3" onClick={() => {changeColorImage(productColor.id)}}>
                      <span className="products-page__color mx-auto d-block small" style={{backgroundColor: productColor.color}}></span>
                      <p class="product-detail__color-other">{productColor.name}</p>
                    </div>
                    )}
                </div>
              </div>
            </div>
            <div className="product-detail__color mt-5">
              <div className="wrp d-flex align-items-center">
                <h5 className="mr-2">Seçtiğiniz Hafıza:</h5>
                <div className={`spinner mt-1 mr-5 pr-2 ${!isSpinner ? "d-none" : ""}`} >
                  <div className="spinner-border text-primary" role="status"></div>
                 </div>
                <p className={`product-detail__color-selected ${isSpinner ? "d-none" : ""}`}>{selectedMemory.gb} GB</p>
              </div>
              <div className="text-center">
                <div className="d-flex align-items-center flex-wrap mt-4">
                  {productInfo.length != 0 && productInfo.memory.map(productMemory =>
                    <div className="product-detail__color-item mb-3 p-2 pb-3"  onClick={() => {
                      setSpinner(true)
                      setTimeout(() => {changeMemory(productMemory.id)}, 700);
                      setTimeout(() => {setSpinner(false)}, 700);
                    }}>
                      <p class="product-detail__color-other">{productMemory.gb} GB</p>
                    </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    productStorage: state.productStorage.productStorageInfo
  };
};

const mapDispatchToProps = {
  holdChoosenProductInfo
};

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetailInfo);