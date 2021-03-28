import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { store } from 'react-notifications-component';
import { Modal } from 'antd';

//Actions
import {basketItemIncreaseCount,summaryLoading,basketItemDelete} from '../../actions/basket'
const { confirm } = Modal;
class basketList extends PureComponent {
  state = {
    productCount: this.props.basket.count,
    price : this.props.basket.memory.price,
    isSpinner:false
  }
  
  increaseProductCount = (productCount, basketProductIndex) => {
    var newPrice = this.state.price * productCount
    // this.setState({price : newPrice})
    this.setState({productCount : productCount})
    this.setState({isSpinner : true})

    this.props.basketItemIncreaseCount(newPrice,basketProductIndex,productCount) //Ürün adedi arttırma
    this.props.summaryLoading(true) //Sipariş özeti loading

    setTimeout(() => {this.setState({isSpinner : false})}, 700);
    setTimeout(() => {this.props.summaryLoading(false)}, 700);
  }


  deleteItem(basketProductId){
    const vm = this.props
    confirm({
      title: 'Ürünü sepetten çıkarmak istediğinize emin misiniz?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Evet',
      centered:true,
      okType: 'danger',
      cancelText: 'Hayır',
      confirmLoading:true,
      onOk() {
        if(vm.basketList.length == 1) localStorage.clear();
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 1000 ? resolve  : reject, 1000);
          setTimeout(() => {
            vm.basketItemDelete(basketProductId) //sepetten seçili ürünü sil.
            store.addNotification({
              message: "Ürün sepetten çıkarıldı",
              type: "success",
              insert: "top",
              width:250,
              showIcon:true,
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 2000,
                onScreen: false
              },
            })
          }, 1000);
        }).catch(() =>false);
      },
    });
  }
  render() {
    return (
      <div className="basket-item">
        <div className="d-flex align-items-center">
            <div className="basket-item__img flex-shrink-0">
            <img src={this.props.basket.color.image} alt=""/>
          </div>
          <div className="basket-item__info d-flex flex-column flex-shrink-0">
            <h5 className="mb-2 mt-2">{this.props.basket.productName}</h5>
            <p>Renk: {this.props.basket.color.name}</p>
            <p>Hafıza: {this.props.basket.memory.gb} GB</p>
            <p>SIM: {this.props.basket.sim.name} Kart</p>
          </div>
          <div className="basket-item__counter ml-5 mr-5 flex-shrink-0">
            <input type="number" value={this.props.basket.count} min="1" pattern="[0-9]*"  onChange={e => 
              this.increaseProductCount(e.target.value, this.props.basketProductIndex)}/> Adet
          </div>
          <div className="basket-item__price">
            <div className="d-flex">
              <div className={`spinner mt-1 ${!this.state.isSpinner ? "d-none" : ""}`} >
                <div className="spinner-border text-primary" role="status"></div>
              </div>
              <h4 className={`${this.state.isSpinner ? "d-none" : ""}`}>  {this.props.basket.memory.price.toFixed(3)} TL</h4>
            </div>
          </div>
          <div className="basket-item__price delete ml-5 mr-5">
          <p onClick={() => {this.deleteItem(this.props.basketProductIndex)}}><DeleteOutlined /></p>
          </div>
        </div>
      </div>
    );
  }
}

basketList.propTypes = {
  basket: PropTypes.object.isRequired,
  basketProductIndex: PropTypes.object.isRequired 
};

const mapStateToProps = (state) => {
  return {
    basketList: state.basket.basketList,
  };
};

const mapDispatchToProps = {
  basketItemDelete,
  basketItemIncreaseCount,
  summaryLoading
};

export default connect(mapStateToProps,mapDispatchToProps)(basketList);