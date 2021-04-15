import React from 'react';
import {Table,Modal} from "antd";
import {CheckCircleTwoTone } from '@ant-design/icons';
import { Tooltip } from 'antd';

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
    <div className="previous-wrp mb-4 pb-1">
      <div className="d-flex justify-content-between">
        <h6 className="mb-2 d-flex align-items-center">
          <CheckCircleTwoTone twoToneColor="#52c41a" />Sipariş Tarihi: {prevOrder.orderDate}
        </h6>
        {prevOrder.isCouponCode == "true" && 
          <p className="previous-wrp__coupon"> İndirim Kodu Tanımlanmış ( -100 TL )</p>
        }
      </div>
      <div className="basket-item">
        {prevOrder.orderList.map((orderList) => (  
          <div className="basket-item__wrp">
            <div className="previous-item d-flex align-items-center flex-column flex-md-row">
                <div className="basket-item__img">
                <img src={orderList.color.image} alt=""/>
              </div>
              <div className="basket-item__info">
                <h5 className="mb-2 mt-2">{orderList.productName}</h5>
                <p>Renk: {orderList.color.name}</p>
                <p>Hafıza: {orderList.memory.gb} GB</p>
                <p>SIM: {orderList.sim.name} Kart</p>
              </div>
              <div className="basket-item__counter text-left text-md-center ml- mr-0 ml-md-5 mr-md-5">
                <p className="mb-1">Adet</p>
                <span>{orderList.count}</span>
              </div>
              <div className="basket-item__price">
                <div className="text-center">
                  <p className="mb-1">Toplam Ürün Fiyatı</p>
                  <h4>{orderList.memory.price} TL</h4>
                </div>
              </div>
            </div>
          </div>  
        ))}
        <div className="basket-item__total d-flex align-items-center justify-content-center mt-3 mb-2 flex-column flex-md-row">
          <div className="basket-item__counter text-center mr-0 mr-md-5 mb-4 mb-md-0">
            <p className="mb-1">Ödeme Şekli</p>
            {prevOrder.paymentMethod == "cash" && <span>Peşin</span>}
            {prevOrder.paymentMethod == "hire" && <span className="link" onClick={tableModal}>Taksit</span>}
          </div>
          <div className="basket-item__price d-flex align-items-center">
              {prevOrder.paymentMethod == "cash" && 
                <div className="text-center">
                  <Tooltip title="Kargo Dahil (+9,99 TL)">
                    <p className="mb-1">Toplam Ödeme Tutarı</p>
                    <h4>{prevOrder.totalPrice} TL</h4>
                  </Tooltip>
                </div>
              }
              {prevOrder.paymentMethod == "hire" && 
                <div className="d-flex flex-column flex-md-row">
                  <div className="text-center mr-0 mr-md-5 mb-4 mb-md-0">
                    <Tooltip title="Kargo Dahil (+9,99 TL)">
                      <p className="mb-1">Toplam Ödeme Tutarı</p>
                      <h4>{prevOrder.totalPrice} TL</h4>
                    </Tooltip>
                  </div>
                  <div className="text-center mr-0 pr-0 mr-md-5 pr-md-2 mb-4 mb-md-0">
                    <p className="mb-1">İlk Taksit ({prevOrder.orderPrice.length}/1)</p>
                    <h4>{prevOrder.orderPrice[0].price}</h4>
                  </div>
                  <div className="text-center">
                    <p className="mb-1">Son Ödeme T.</p>
                    <h4>{prevOrder.orderPrice[0].date}</h4>
                  </div>
                </div>
              }
          </div>
        </div>
      </div>
    </div>
  );
}
  
export default previousOrderList