import React from 'react';
const detailDesc = product => {
  return (
    <div>
       <h4 className="font-weight-bold">{product.productInfo.name}</h4>
      <p className="product-detail__desc" dangerouslySetInnerHTML={{__html: product.productInfo.desc}}></p>
    </div>
  );
};

export default detailDesc;