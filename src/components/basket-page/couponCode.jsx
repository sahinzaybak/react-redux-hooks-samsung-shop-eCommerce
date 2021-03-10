import React, {  Component } from 'react'
import { store } from 'react-notifications-component';
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
      this.props.summaryLoading(true) //Sipariş özeti loading
      setTimeout(() => {this.setState({isSpinner : false})}, 700);
      setTimeout(() => {
        this.props.summaryLoading(false)
        store.addNotification({
          message: "Kupon kodunuz onaylandı.",
          type: "success",
          insert: "top",
          width:250,
          showIcon:true,
          container: "bottom-right",
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
        message: "Hatalı kupon kodu girdiniz.",
        type: "danger",
        insert: "top",
        width:250,
        showIcon:true,
        container: "bottom-right",
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
      <div className={`${isCode ? "disabled" : ""}`}>
        <h5 class="basket-title mb-3">Kupon Kodu</h5>
        <div className="d-flex justify-content-between">
          <input type="text" placeholder="Kupon Kodu Giriniz" name="couponCode" 
          onChange={this.handleTextChanged} 
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