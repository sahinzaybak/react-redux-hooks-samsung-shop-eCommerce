import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
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
      <div className="basket-page">
        <div className="basket">
          <h4 class="basket-title">Önceki Siparişlerim ({this.props.previousOrderList.length} Ürün)</h4>
          <div className="row">
            <div className="col-md-8">
              {this.props.previousOrderList.map((prevOrderList) => (
                <PreviousOrder prevOrder={prevOrderList}/>
              ))}
            </div>
          </div>
        </div>
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
