import React from 'react';
import { Modal, Button } from 'antd';
import { CheckCircleOutlined, PrinterOutlined, ArrowRightOutlined, BarcodeOutlined } from '@ant-design/icons';

export default function SerialsModal({ modalVisible, serials, setModalVisible }) {
  // Check if there are any serials to display
  if (serials.length === 0) {
    return (
      <Modal
        title="Seriales Generados"
        open={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button type="primary" onClick={() => setModalVisible(false)}>
            Ok
          </Button>
        ]}
      >
        No serials available.
      </Modal>
    );
  }

  const firstSerial = serials[0]; // Get the first serial
  const lastSerial = serials[serials.length - 1]; // Get the last serial

  return (
    <Modal
      title={
        <span style={{fontSize:'25px'}}>
          Seriales Generados
          <CheckCircleOutlined style={{ color: 'green', marginLeft: '8px' }} />
        </span>
      }
      visible={modalVisible}
      onOk={() => setModalVisible(false)}
      onCancel={() => setModalVisible(false)}
      footer={[
        <Button type="primary" onClick={() => setModalVisible(false)}>
          Ok
        </Button>
      ]}
    >
            <div style={{textAlign:'center', fontSize:'40px'}}>
        <PrinterOutlined /> 
      </div>
      <div style={{textAlign:'center', fontSize:'25px'}}>
        <span style={{ display: 'inline-block', marginRight: '8px' }}>
           {firstSerial}
        </span>
        <ArrowRightOutlined />
        <span style={{ display: 'inline-block', marginLeft: '8px' }}>
          {/* <CheckCircleOutlined style={{ color: 'green' }} />  */}
          {lastSerial}
        </span>

      </div>


    </Modal>
  );
}
