import React from 'react';
import {Table,Modal} from "antd";
import {CheckCircleTwoTone } from '@ant-design/icons';

const previousOrderList = ({ prevOrder }) => { 
  function tableModal(){
    const columns = [
      {
        title: 'Taksit Sayısı',
        dataIndex: 'hire',
        key: 'hire',
      },
      {
        title: 'Ödeme Tarihi',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Ödenecek Tutar',
        dataIndex: 'price',
        key: 'price',
      },
    ];
    Modal.info({
      width:600,
      centered:true,
      title: 'Taksit Bilgileriniz',
      okText: 'Anladım',
      okType: 'success',
      content: <Table className="mt-4 mb-4" dataSource={prevOrder.orderPrice} pagination={false}  columns={columns} />
    },
  )}

  return (
    <div class="previous-wrp mb-4 pb-1">
      <h6 class="mb-2 d-flex align-items-center"><CheckCircleTwoTone twoToneColor="#52c41a" />Sipariş Tarihi: {prevOrder.orderDate}</h6>
      <div className="basket-item">
        {prevOrder.orderList.map((orderList) => (      
          <div className="previous-item d-flex align-items-center">
              <div className="basket-item__img">
              <img src={orderList.color.image} alt=""/>
            </div>
            <div className="basket-item__info">
              <h5 className="mb-2 mt-2">{orderList.productName}</h5>
              <p>Renk: {orderList.color.name}</p>
              <p>Hafıza: {orderList.memory.gb}</p>
              <p>SIM: Tek SIM</p>
            </div>
            <div className="basket-item__counter text-center ml-5 mr-5">
              <p className="mb-1">Adet</p>
              <span>{orderList.count}</span>
            </div>
            <div className="basket-item__counter text-center ml-3 mr-5">
              <p className="mb-1">Ödeme Şekli</p>
              {prevOrder.paymentMethod == "cash" && <span>Peşin</span>}
              {prevOrder.paymentMethod == "hire" && <span className="link" onClick={tableModal}>Taksit</span>}
            </div>
            <div className="basket-item__price">
              {prevOrder.paymentMethod == "cash" && 
                <div className="text-center">
                  <p className="mb-1">Toplam Fiyat</p>
                  <h4>{prevOrder.totalPrice} TL</h4>
                </div>
              }
              {prevOrder.paymentMethod == "hire" && 
                <div className="text-center">
                  <p className="mb-1">İlk Taksit</p>
                  <h4>{prevOrder.orderPrice[0].price}</h4>
                </div>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
  

export default previousOrderList