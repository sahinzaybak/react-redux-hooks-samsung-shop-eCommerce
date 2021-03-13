import React, { PureComponent } from "react";
import { Form, Input, InputNumber, Select, Table } from "antd";
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
class payment extends PureComponent {
  state = {
    dataSource:[]
  }
  selectHireCount = (count) => { //taksit seçeneği
    let today = new Date()
    totalPrice = localStorage.getItem('totalPrice')
    tableHirePriceTotal = [...this.state.dataSource];
    for (let index = 1; index <= count; index++) {
      const date = today.getDate() + '-' + "0" + (today.getMonth() + index +1) + '-' + today.getFullYear();
      tableHirePriceTotal.push({key: '1', hire: index, date: date, price: (totalPrice / count).toFixed(3) + " " + "TL"});
      this.setState({ tableHirePriceTotal });
    }
  }
  render() {
    return (
      <div className="payment basket-page">
         <h4 class="basket-title">Ödeme Yap</h4>
         <div className="row">
           <div className="col-md-8">
            <Form name="nest-messages" validateMessages={validateMessages}>
            <div className="d-flex justify-content-between">
              <Form.Item name={["user", "name"]} label="Ad-Soyad" rules={[{required: true}]}>
                <Input placeholder="Ad-Soyad" />
              </Form.Item>

              <Form.Item  name={["user", "number"]} label="Telefon No" rules={[{required: true,type: "number"}]}>
                <InputNumber placeholder="Telefon No" />
              </Form.Item>
            </div>

            <div className="d-flex justify-content-between">
              <Form.Item  name={["user", "email"]} label="E-posta Adresi" rules={[{required: true,type: "email"}]}>
                <Input placeholder="E-posta Adresi"/>
              </Form.Item>
              <Form.Item  name={["user", "country"]} label="Yaşadığınız İl" rules={[{required: true}]}>
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
              <Form.Item  name={["user", "iban"]} label="IBAN Numaranız" rules={[{required: true,type: "number"}]}>
                <InputNumber placeholder="IBAN Numaranız" />
              </Form.Item>

              <Form.Item  name={["user", "hire"]} label="Taksit" rules={[{required: true}]}>
                <Select placeholder="Kaç Taksit Ödeme İstiyorsunuz?" allowClear onChange={this.selectHireCount} >
                  <Option value="2">2 Taksit</Option>
                  <Option value="3">3 Taskit</Option>
                  <Option value="4">4 Taksit</Option>
                </Select>
              </Form.Item>
              
            </div>

          <Table dataSource={tableHirePriceTotal} columns={columns} />
            
          <div className="d-flex justify-content-end">
            <button className="button green mt-3">Ödemeyi Tamamla</button>
          </div>

          </Form>  
           </div>
           <div className="col-md-4">
            <div className="basket-summary">
                <h5 class="basket-title mb-3">Sipariş Özeti</h5>
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
