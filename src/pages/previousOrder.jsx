import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import basketImg from "../assets/images/shopping-cart.svg";
import {Link} from 'react-router-dom';

//Components
import PreviousOrder from '../components/previousOrderList'
const { confirm } = Modal;

class previousOrder extends PureComponent {
  orderComplete(){
    const vm = this.props;
    confirm({
      title: 'Siparişi tamamlamak istediğinizden emin misiniz?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Evet',
      okType: 'success',
      cancelText: 'Hayır',
      confirmLoading:true,
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 1000 ? resolve  : reject, 1000);
          setTimeout(() => {
            vm.history.push("/basket/payment")
          }, 1000);
        }).catch(() =>false);
      },
    });
  }
  render() {
    return (
      <div className="basket-page previous">
        {this.props.previousOrderList.length == 0 && 
          <div className="d-flex justify-content-between align-items-center no-product flex-column flex-md-row mt-4 mt-md-0">
            <div className="d-flex mb-4 mb-md-0">
              <img className="mr-4" src={basketImg} alt="" />
              <h5>Önceden yaptığınız alışverişiniz bulunmamaktadır.</h5>
            </div>
            <div>
            <Link to="/">
              <button className="button green">Hemen Alışverişe Başla</button>
            </Link>
            </div>
          </div>      
        }
        {this.props.previousOrderList.length != 0 && 
          <div className="basket">
          <h4 class="basket-title mt-4 mt-md-0">Önceki Siparişlerim ({this.props.previousOrderList.length} Ürün)</h4>
          <div className="row">
            <div className="col-md-8">
              <div className="d-flex flex-column-reverse">
                {this.props.previousOrderList.map((prevOrderList) => (
                  <PreviousOrder prevOrder={prevOrderList}/>
                ))}
              </div>
            
            </div>
          </div>
        </div>    
      }
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    previousOrderList: state.previousOrder.previousOrderList
  };
};

export default connect(mapStateToProps)(previousOrder);
