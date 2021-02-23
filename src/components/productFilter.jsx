import React, { useState } from "react";
import { Radio, Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

const { Panel } = Collapse;

const ProductFilter = () => {
  const [series, setValueSeries] = useState(1);
  const [size, setValueSize] = useState(1);
  const [memory, setMemory] = useState(1);
  function onFilter(e) {
    setValueSeries(e.target.value);
  }
  function onFilterSize(e) {
    setValueSize(e.target.value);
  }
  function onFilterMemory(e) {
    setMemory(e.target.value);
  }
  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
    marginBottom: "16px",
  };
  return (
    <div>
      <Collapse bordered={false} defaultActiveKey={["1","2","3"]} expandIcon={({ isActive }) => (<CaretRightOutlined rotate={isActive ? 90 : 0} />)} className="site-collapse-custom-collapse" expandIconPosition="right">

        {/* Series */}
        <Panel header="Ürün Serisi" key="1" className="site-collapse-custom-panel">
          <Radio.Group onChange={onFilter} value={series}>
            <Radio style={radioStyle} value={1}>
              Galaxy A Serisi
            </Radio>
            <Radio style={radioStyle} value={2}>
              Galaxy S Serisi
            </Radio>
            <Radio style={radioStyle} value={3}>
              Galaxy Note Serisi
            </Radio>
          </Radio.Group>
        </Panel>

        {/* Size */}
        <Panel header="Ekran Boyutu" key="2" className="site-collapse-custom-panel">
          <Radio.Group onChange={onFilterSize} value={size}>
            <Radio style={radioStyle} value={4}>
              6.2
            </Radio>
            <Radio style={radioStyle} value={5}>
              6.5
            </Radio>
            <Radio style={radioStyle} value={6}>
              6.7
            </Radio>
            <Radio style={radioStyle} value={7}>
              6.9
            </Radio>
          </Radio.Group>
        </Panel>

        {/* Memory */}
        <Panel header="Hafıza" key="3" className="site-collapse-custom-panel">
          <Radio.Group onChange={onFilterMemory} value={memory}>
            <Radio style={radioStyle} value={8}>
              128 GB
            </Radio>
            <Radio style={radioStyle} value={9}>
              256 GB
            </Radio>
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
};
export default ProductFilter;
