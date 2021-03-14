import React, { PureComponent } from "react";
import { Form, Input, InputNumber, Select, Table, Radio, Modal} from "antd";
import { connect } from "react-redux";

//Components
import BasketSummary from '../components/basket-page/basketSummary'
const { Option } = Select;
const validateMessages = {
  required: "Bu alan zorunludur!",
  types: {
    email: "Doğru format değil!",
    number: "Numara giriniz!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
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


let tableHirePriceTotal;
let totalPrice;
let today;
class payment extends PureComponent {
  state = {
    dataSource:[],
    choosePaymentmethod:'',
    hire:''
  }

  selectHireCount = (count) => { //taksit seçeneği
    today = new Date()
    totalPrice = localStorage.getItem('totalPrice')
    tableHirePriceTotal = [...this.state.dataSource];
    for (let index = 1; index <= count; index++) {
      const date = today.getDate() + '-' + "0" + (today.getMonth() + index +1) + '-' + today.getFullYear();
      tableHirePriceTotal.push({key: '1', hire: index, date: date, price: (totalPrice / count).toFixed(3) + " " + "TL"});
      this.setState({ tableHirePriceTotal });
    }
  }

  changePaymentMethod = (e) => { //ödeme seçeneği
    this.setState({choosePaymentmethod : e.target.value})
    if(e.target.value == "cash")
      tableHirePriceTotal = null
  };

  completePayment = () => { // Ödemeyi Tamamla
    const vm = this.props;
    const todayDate = today.getDate() + '-' + "0" + (today.getMonth() +1) + '-' + today.getFullYear();
    localStorage.setItem("myPreviousOrder", JSON.stringify( //Siparişi localStorage kaydet.
      [...this.props.basketList.concat({
        orderDate: todayDate, 
        orderPrice: tableHirePriceTotal == null ? totalPrice : tableHirePriceTotal
      })]
    )); 

    Modal.success({
      centered:true,
      title: 'Ödemeniz Başarılı!',
      okText: 'Anladım',
      okType: 'success',
      content: tableHirePriceTotal == null ? 
      `${totalPrice} TL ödemeniz başarıyla yapıldı. Teşekkür ederiz!` : 
      `${tableHirePriceTotal[0].price}'lik ilk taksidinizi ${tableHirePriceTotal[0].date} tarihine kadar ödeyebilirsiniz. Teşekkür ederiz!`,
      onOk() {
        // vm.history.push("/")
      },
    });
  };
  
  componentWillMount(){
    document.body.classList.add("hide-basket");
  }
  componentWillUnmount(){ 
    document.body.classList.remove("hide-basket");
    tableHirePriceTotal = ""
  }

  render() {
    return (
      <div className="payment basket-page">
         <h4 class="basket-title">Ödeme Yap</h4>
         <div className="row">
           <div className="col-md-8">
            <Form name="nest-messages" validateMessages={validateMessages} onFinish={this.completePayment.bind(this)}>
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
                  <Option value="istanbul">Antalya</Option>
                  <Option value="ankara">Muğla</Option>
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
              <Form.Item className="w-100" name="hire" label="Taksit" rules={[{required: true}]}>
                <Select value={this.state.hire} name="hire" placeholder="Kaç Taksit Ödeme İstiyorsunuz?" allowClear 
                onChange={value => this.selectHireCount(value)}>
                  <Option value="2">2 Taksit</Option>
                  <Option value="3">3 Taksit</Option>
                  <Option value="4">4 Taksit</Option>
                </Select>
              </Form.Item>
            }
            {tableHirePriceTotal != null &&
              <Table dataSource={tableHirePriceTotal} columns={columns} />
            }
            <div className="d-flex justify-content-end">
              <button className="button green mt-3" onClick={this.success}>Ödemeyi Tamamla</button>
            </div>
           </Form>  
          </div>

           <div className="col-md-4">
            <div className="basket-summary">
                <h5 className="basket-title mb-3">Sipariş Özeti</h5>
                <BasketSummary basket={this.props.basketList}/>
              </div>
           </div>
         </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    basketList: state.basket.basketList
  };
};

export default connect(mapStateToProps)(payment);
