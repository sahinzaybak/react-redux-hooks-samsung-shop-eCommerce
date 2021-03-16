import React from 'react';

const previousOrderList = ({ prevOrder }) => { 
  debugger;
  console.log(prevOrder);
    return (
      <div>

    
      <h1>{prevOrder.orderDate}</h1>
      <div className="basket-item">

        {prevOrder.orderList.map((orderList) => (      
          <div className="d-flex align-items-center">
              <div className="basket-item__img">
              <img src={orderList.color.image} alt=""/>
            </div>
            <div className="basket-item__info">
              <h5 className="mb-2 mt-2">{orderList.productName}</h5>
              <p>Renk: {orderList.color.name}</p>
              <p>Hafıza: {orderList.memory.gb}</p>
              <p>SIM: Tek SIM</p>
            </div>
            <div className="basket-item__counter ml-5 mr-5">
              <p>Adet</p>
            </div>
            <div className="basket-item__price">
              <div className="d-flex">
                <h4>{orderList.memory.price} TL</h4>
              </div>
            </div>
          </div>
         ))}
      </div>
      </div>
    );
}
  

export default previousOrderList