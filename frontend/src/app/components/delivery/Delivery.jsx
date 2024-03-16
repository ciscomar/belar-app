'use client'

import { useState, useEffect } from 'react';
import { Button, Form, Input, DatePicker, Col, Row, message, notification} from 'antd';
import { Typography, Divider } from 'antd';
const { Title } = Typography;
import axios from 'axios';
import TransferTable from './TransferTable';
import DestinationInput from '../destination/DestinationInput';
import ShelfTable from './ShelfTable';


export default function Delivery () {
  const [form] = Form.useForm();
  const [serials, setSerials] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [deliverySuccess, setDeliverySuccess] = useState(false);
  const [destination, setDestination] = useState(undefined);
  const [shelf, setShelf] = useState([])
  const [selectedShelf, setSelectedShelf ] = useState([])


  useEffect(() => {
    axios.post('/production/searchSerials').then(response => {

      if (response.status === 200) {
      
          setSerials(response.data.serials)
          setShelf(response.data.shelf)

      }else{
        showError("Error al cargar Inventario");  
      }
     
    }).catch(error => {
      showError(error.message);
    });


  }, [deliverySuccess]);


  const [api, contextHolderSuccess] = notification.useNotification();
  const openNotificationWithIcon = (type,data ) => {
    api[type]({
      message: 'Salida Programada',
      description:
        'Identificador de Salida: '+ data
    });
  }


  const handleSave = () =>{

    const formValues = form.getFieldsValue();
    formValues.destination = destination;
    if(formValues.destination === undefined){
      showError("Destino no valido");
      return;
    }
    formValues.serials = targetKeys;
    if(formValues.destination && formValues.date){
      axios.post('/delivery/insert', {formValues, selectedShelf}).then(response => {
      
        if (response.status === 200) {
          openNotificationWithIcon('success', response.data._id)
            form.resetFields();
            setTargetKeys([]);
            setSelectedShelf([]);
            setDeliverySuccess(!deliverySuccess)
         
        }else{
          showError("Error al generar");  
        }

        setDestination(undefined);
       
      }).catch(error => {
        showError(error.message);
      });

    }else{
      showError("Complete la informacion de salida");
    }

  }

  const [messageApi, contextHolder] = message.useMessage();
  const showError = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  return (
    <>
      {contextHolder}{contextHolderSuccess}
      <Title level={4}>Programar Salida</Title> 
      <Divider />
      <Form layout={'vertical'} form={form} initialValues={{ layout: 'vertical' }} width='100%'>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="Destino" name='destination' rules={[{ required: true, message: '' }]}>
              <DestinationInput setDestination={setDestination} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Fecha" name='date' rules={[{ required: true, message: '' }]}>
            <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <TransferTable serials={serials} targetKeys={targetKeys} setTargetKeys={setTargetKeys}/>
        <Divider />

      <ShelfTable shelf={shelf} selectedShelf={selectedShelf} setSelectedShelf={setSelectedShelf}/>

        <Form.Item style={{marginTop:'10px', textAlign:'center'}}>
          <Button type="primary" onClick={handleSave} style={{marginTop:'10px', width:'100%', height:'40px'}}>Guardar</Button>
        </Form.Item>
      </Form>
    </>
  );
};
