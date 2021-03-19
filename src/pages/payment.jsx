import React, { PureComponent } from "react";
import { Form, Input, InputNumber, Select, Table, Radio, Modal} from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from "react-redux";

//Components
import BasketSummary from '../components/basket-page/basketSummary'

//Actions
import {basketClear} from '../actions/basket'
import {previousOrder} from '../actions/previousOrder'

const { Option } = Select;
const validateMessages = {
  required: "Bu alan zorunludur!",
  types: {
    email: "Doğru format değil!",
    number: "Numara giriniz!",
  },
};

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

let tableHirePriceTotal = null;
let totalPrice;
let today = new Date()
let date;
const { confirm } = Modal;
class payment extends PureComponent {
  state = {
    dataSource:[],
    choosePaymentmethod:'',
    hire:'',
    tableShow:false
  }

  componentDidMount(){ //her zaman default 2 taksit
    totalPrice = localStorage.getItem('totalPrice')
    tableHirePriceTotal = [...this.state.dataSource];
    for (let index = 1; index <= 2; index++) {
      date = today.getDate() + '-' + "0" + (today.getMonth() + index +1) + '-' + today.getFullYear();
      tableHirePriceTotal.push({key: '1', hire: index, date: date, price: (totalPrice / 2).toFixed(3) + " " + "TL"});
    }
  }

  selectHireCount = (count) => { //taksit seçeneği (2,3,4)
    tableHirePriceTotal = [...this.state.dataSource];
    for (let index = 1; index <= count; index++) {
      date = today.getDate() + '-' + "0" + (today.getMonth() + index +1) + '-' + today.getFullYear();
      tableHirePriceTotal.push({key: '1', hire: index, date: date, price: (totalPrice / count).toFixed(3) + " " + "TL"});
      this.setState({ tableHirePriceTotal });
    }
  }

  changePaymentMethod = (e) => { //ödeme şekli (taksit, peşin)
    this.setState({choosePaymentmethod : e.target.value})
    if(e.target.value == "cash"){
      this.setState({tableShow:false})
    }
   
    else
      this.setState({tableShow:true})
  };

  completePayment = () => { // Ödemeyi Tamamla
    const vm = this;
    const todayDate = today.getDate() + '-' + "0" + (today.getMonth() +1) + '-' + today.getFullYear();
    confirm({
      title: 'Ödeme yapmak istediğinizden emin misiniz?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Evet',
      centered:true,
      okType: 'success',
      cancelText: 'Hayır',
      confirmLoading:true,
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 1000 ? resolve  : reject, 1000);
          setTimeout(() => {
            vm.props.previousOrder(vm.props.basketList,todayDate, vm.state.tableShow, vm.state.choosePaymentmethod, totalPrice, tableHirePriceTotal) //Önceki siparişler state kaydet.
            Modal.success({
              centered:true,
              title: 'Ödemeniz Başarılı!',
              okText: 'Anladım',
              okType: 'success',
              content: vm.state.tableShow == false ? 
              `${totalPrice} TL ödemeniz başarıyla yapıldı. Teşekkür ederiz!` : 
              `${tableHirePriceTotal[0].price}'lik ilk taksidinizi ${tableHirePriceTotal[0].date} tarihine kadar ödeyebilirsiniz. Teşekkür ederiz!`,
              onOk() {
                vm.props.history.push("/")
                localStorage.removeItem("basket")
                localStorage.removeItem("totalPrice")
                localStorage.removeItem("couponCode")
                vm.props.basketClear()
              },
            });
          }, 1000);
        }).catch(() =>false);
      },
    });  
  };
  
  componentWillMount(){
    document.body.classList.add("hide-basket");
  }
  componentWillUnmount(){ 
    document.body.classList.remove("hide-basket");
    tableHirePriceTotal = null
  }

  render() {
    return (
      <div className="payment basket-page">
         <h4 class="basket-title">Ödeme Yap</h4>
         <Form name="nest-messages" validateMessages={validateMessages} onFinish={this.completePayment.bind(this)}>
         <div className="row">
           <div className="col-md-8">
         
            <div className="d-flex justify-content-between">
              <Form.Item name="name" label="Ad-Soyad" rules={[{required: true}]}>
                <Input placeholder="Ad-Soyad" />
              </Form.Item>

              <Form.Item name="number" label="Telefon No" rules={[{required: true,type: "number"}]}>
                <InputNumber placeholder="Telefon No" />
              </Form.Item>
            </div>

            <div className="d-flex justify-content-between">
              <Form.Item name="email"label="E-posta Adresi" rules={[{required: true,type: "email"}]}>
                <Input placeholder="E-posta Adresi"/>
              </Form.Item>
              <Form.Item name="country" label="Yaşadığınız İl" rules={[{required: true}]}>
                <Select placeholder="İl Seçiniz" allowClear>
                  <Option value="istanbul">İstanbul</Option>
                  <Option value="ankara">Ankara</Option>
                  <Option value="izmir">İzmir</Option>
                  <Option value="antalya">Antalya</Option>
                  <Option value="muğla">Muğla</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="d-flex justify-content-between">
              <Form.Item name="iban" label="IBAN Numaranız" rules={[{required: true,type: "number"}]}>
                <InputNumber placeholder="IBAN Numaranız" />
              </Form.Item>

              <Form.Item name="paymentMethod" label="Ödeme Şekliniz" rules={[{required: true}]}>
              <Radio.Group onChange={this.changePaymentMethod}>
                <Radio value="hire">Taksit</Radio>
                <Radio value="cash">Peşin</Radio>
              </Radio.Group>
              </Form.Item>
            </div>

            {this.state.choosePaymentmethod == "hire" &&
              <Form.Item className="w-100" name="hire" label="Taksit">
                <Select value={this.state.hire} defaultValue="2" name="hire" placeholder="Kaç Taksit Yapmak İstiyorsunuz?" allowClear 
                onChange={value => this.selectHireCount(value)}>
                  <Option value="2">2 Taksit</Option>
                  <Option value="3">3 Taksit</Option>
                  <Option value="4">4 Taksit</Option>
                </Select>
              </Form.Item>
            }
            {this.state.tableShow &&
              <Table dataSource={tableHirePriceTotal} columns={columns} />
            }
          </div>

           <div className="col-md-4">
            <div className="basket-summary">
              <h5 className="basket-title mb-3">Sipariş Özeti</h5>
              <BasketSummary basket={this.props.basketList}/>
            </div>
            <button className="button green mt-3 w-100" onClick={this.success}>Ödemeyi Tamamla</button>
           </div>
         </div>
         </Form>  
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    basketList: state.basket.basketList
  };
};

const mapDispatchToProps = {
  basketClear,
  previousOrder
};


export default connect(mapStateToProps,mapDispatchToProps)(payment);
