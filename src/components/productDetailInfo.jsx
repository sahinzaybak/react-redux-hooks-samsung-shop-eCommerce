import React,{useState, useEffect} from 'react'
import { connect } from "react-redux";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss"

//Components
import DetailDesc from './product-detail/detailDesc'
import DetailHeader from './product-detail/detailHeader'
import DetailColor from './product-detail/detailColor'
import DetailMemory from './product-detail/detailMemory'
import DetailSim from './product-detail/detailSim'

// function componenet mapStateToProps this.props yerine "productStorage" burada tanımlamamaız gerekli ki "productStorage" diye kullanabilelim.
const ProductDetailInfo = ({productInfo, productStorage}) => {
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedColorImage, setSelectedColorImage] = useState('')
  const [selectedMemory, setSelectedMemory] = useState('')
  const [selectedSim, setSelectedSim] = useState('')

  useEffect(() => {
    if(productInfo.length != 0 && productStorage != null ){
      setSelectedMemory(productInfo.memory.find(memory => memory.id === productStorage.memoryId)) // seçili hafıza
      setSelectedColor(productInfo.colors.find(color => color.id == productStorage.colorId)) // seçili renk
      setSelectedSim(productInfo.sim.find(sim => sim.id == productStorage.simId)) // seçili sim
      productInfo.colorsImage.forEach(element => { // seçili renge ait resimler
        if(Object.keys(element).find(colorImageKey => colorImageKey == productStorage.colorId))
          setSelectedColorImage(element[productStorage.colorId])
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

  return (
    <div>
      <DetailHeader name={productInfo.name} id={productInfo.id} price={selectedMemory.price} selectedColor={selectedColor} selectedMemory={selectedMemory} selectedSim={selectedSim}  />
      <div className="row h-100">
        <div className="col-md-6">
          <div className="product-detail__slider h-100">
            <ImageGallery lazyLoad="true" items={productImages} showPlayButton={false} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="product-detail__info h-100">
            
            <DetailDesc productInfo={productInfo} />

            <DetailColor 
            selectedColor={selectedColor} 
            productInfo={productInfo} 
            selectedSim={selectedSim}
            selectedMemory={selectedMemory}/>

            <DetailMemory 
            selectedMemory={selectedMemory} 
            productInfo={productInfo} 
            selectedSim={selectedSim}
            selectedColor={selectedColor}/>

            <DetailSim 
            selectedMemory={selectedMemory} 
            selectedColor={selectedColor}
            selectedSim={selectedSim}
            productInfo={productInfo}/>
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


export default connect(mapStateToProps)(ProductDetailInfo);