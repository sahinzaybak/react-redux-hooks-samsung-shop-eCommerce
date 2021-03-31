import React, {  Component } from 'react'
import { store } from 'react-notifications-component';
import {InfoCircleOutlined} from '@ant-design/icons';
import { Tooltip } from 'antd';
import { connect } from "react-redux";

//Action
import {couponCodeList} from '../../actions/couponCode'
import {checkCouponCode} from '../../actions/couponCode'
import {summaryLoading} from '../../actions/basket'

let isCode 
class CouponCode extends Component {
  state = {
    couponCode:'',
  }
  handleTextChanged = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  async checkCode(){
    if(this.props.codeList == "")
      await this.props.couponCodeList()

    isCode = this.props.codeList.some(x=> x.code == this.state.couponCode)
    if(isCode){
      this.props.checkCouponCode(true)
      localStorage.setItem('couponCode', true)
      this.props.summaryLoading(true) //Sipariş özeti loading
      setTimeout(() => {this.setState({isSpinner : false})}, 700);
      setTimeout(() => {
        this.props.summaryLoading(false)
        store.addNotification({
          message: "İndirim kodunuz onaylandı.",
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
      }, 700);
    }
    else{
      store.addNotification({
        message: "Hatalı indirim kodu girdiniz.",
        type: "danger",
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
    }
  }
  render(){
    return (
      <div className={`${localStorage.getItem('couponCode') ? "disabled" : ""}`}>
        <div className="d-flex align-items-center mb-3">
          <h5 class="basket-title mb-0 mr-2">İndirim Kodu</h5>
          <Tooltip title="100 TL indirim kazanırsınız."><InfoCircleOutlined/></Tooltip>
        </div>
        <div className="d-flex justify-content-between">
          <input type="text" placeholder="İndirim Kodu Giriniz" name="couponCode" onChange={this.handleTextChanged} 
          value={this.state.couponCode} />
          <a className="button" onClick={(e) => this.checkCode(e.target.value)}>Onayla</a>
        </div>
    </div>
    );
  }
};

const mapStateToProps = (state) => {
  return{
    codeList: state.couponCode.couponCodeList
  }
};

const mapDispatchToProps = {
  couponCodeList,
  checkCouponCode,
  summaryLoading
};

export default connect(mapStateToProps,mapDispatchToProps)(CouponCode);