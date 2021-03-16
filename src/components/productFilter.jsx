import React, { PureComponent } from 'react';
import { Radio, Collapse } from "antd";
import { connect } from "react-redux";
import { CaretRightOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

//Actions
import {filterProducts,getProductList} from '../actions/products'
const { Panel } = Collapse;

class ProductFilter extends PureComponent {
  state = {
    series:'all',
    size:'all',
    ram:'all'
  }
  //seriler
  filterSeries = (e) => {
    if(e.target.value != "all"){
      this.props.filterProducts("series", e.target.value)
      this.setState({series: e.target.value, size: "all", ram: "all"})
    }
    else{
      this.props.getProductList();
      this.setState({series: "all"})
    }
  }
  //boyutlar
  filterSize = (e) => {
    if(e.target.value != "all"){
      this.props.filterProducts("screenSize", e.target.value)
      this.setState({size: e.target.value, series: "all", ram: "all"})
    }
    else{
      this.props.getProductList();
      this.setState({size: "all"})
    }
  }
  //ramlar
  filterRam = (e) => {
    if(e.target.value != "all"){
      this.props.filterProducts("ram", e.target.value)
      this.setState({ram: e.target.value, size: "all", series: "all"})
    }
    else{
      this.props.getProductList();
      this.setState({ram: "all"})
    }
  }

  render(){
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
      marginBottom: "16px",
    };
  return (
    <div>
      <Collapse bordered={false} defaultActiveKey={["1"]} expandIcon={({ isActive }) => (<CaretRightOutlined rotate={isActive ? 90 : 0} />)} className="site-collapse-custom-collapse" expandIconPosition="right">

        {/* Series */}
        <Panel header="Ürün Serisi" key="1" className="site-collapse-custom-panel">
          <Radio.Group onChange={this.filterSeries} value={this.state.series}>
            <Radio style={radioStyle} value="all">
              Tüm Seriler
            </Radio>
            <Radio style={radioStyle} value="A">
              Galaxy A Serisi
            </Radio>
            <Radio style={radioStyle} value="S">
              Galaxy S Serisi
            </Radio>
            <Radio style={radioStyle} value="Note">
              Galaxy Note Serisi
            </Radio>
          </Radio.Group>
        </Panel>

        {/* Size */}
        <Panel header="Ekran Boyutu" key="2" className="site-collapse-custom-panel">
          <Radio.Group onChange={this.filterSize} value={this.state.size}>
          <Radio style={radioStyle} value="all">
              Tüm Boyutlar
            </Radio>
            <Radio style={radioStyle} value={6.2}>
              6.2
            </Radio>
            <Radio style={radioStyle} value={6.3}>
              6.3
            </Radio>
            <Radio style={radioStyle} value={6.4}>
              6.4
            </Radio>
            <Radio style={radioStyle} value={6.5}>
              6.5
            </Radio>
          </Radio.Group>
        </Panel>

        {/* Ram */}
        <Panel header="RAM" key="3" className="site-collapse-custom-panel">
          <Radio.Group onChange={this.filterRam} value={this.state.ram}>
          <Radio style={radioStyle} value="all">
              Tüm RAM'ler
            </Radio>
            <Radio style={radioStyle} value={3}>
              3 GB
            </Radio>
            <Radio style={radioStyle} value={4}>
              4 GB
            </Radio>
            <Radio style={radioStyle} value={6}>
              6 GB
            </Radio>
            <Radio style={radioStyle} value={8}>
              8 GB
            </Radio>
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
}
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  filterProducts,
  getProductList
};

export default connect(mapStateToProps,mapDispatchToProps)(ProductFilter);


