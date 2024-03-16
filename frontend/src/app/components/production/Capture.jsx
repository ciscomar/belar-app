'use client'

import { useState } from 'react';
import { Button, Form, Input, DatePicker, InputNumber, Col, Row,message, Switch, Space} from 'antd';
import { Typography, Divider } from 'antd';
const { Title } = Typography;
import axios from 'axios';
import SerialsModal from './SerialsModal'
import MaterialInput from './MaterialInput';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';


export default function Capture () {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [serials, setSerials] = useState([]);
  const [material, setMaterial] = useState(undefined);
  const [materialDescription, setMaterialDescription] = useState(undefined);
  const [printSerials, setPrintSerials] = useState(true);

  const onFinish = (values) => {
    values.material = material;
    values.description = materialDescription;
    values.isSerial = printSerials;
    if(values.material === undefined){
      showError("Material no valido");
      return;
    }
    axios.post('/production/insert', values).then(response => {

      if (response.status === 200) {
       
        if(!printSerials){
          form.resetFields();
          messageApi.open({
            type: "success",
            content: "Guardado Correctamente",
          });
          return;
        }
          let serials =[]
          const data = response.data;
          data.map((value, index) => (
           serials.push(value.serial)
          ))
          setSerials(serials);
          setModalVisible(true);
          form.resetFields();

          async function sendRequests() {
            for (let i = 0; i < serials.length; i++) {
              await sendPrintRequest(serials[i], materialDescription, material, values);
              // Set a timeout before the next iteration (e.g., 1000 milliseconds = 1 second)
              await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust the timeout duration as needed
            }
          }
          sendRequests();


          // for (let i = 0; i < serials.length; i++) {
          //   const dataObject = {
          //     description: materialDescription,
          //     serial: serials[i],
          //     material: material,
          //     productionDate: values.productionDate,
          //     expireDate: values.expireDate,
          //     pieces: values.pieces,
          //     lote: values.lote,
          //   }


            // axios.post('/rest/print', {printer:'3a189696a52a40ed9ed1725a4c8e63d5', 
            // label:'1ec7b6e3211648dea6d5521edf877c5f', data:dataObject}).then(response => {

            // }).catch(error => {
            //   showError(error.message);
            // });

            
          // }
        

      }else{
        showError("Error al generar");  
      }
      setMaterial(undefined);
      setMaterialDescription(undefined);
     
    }).catch(error => {
      showError(error.message);
    });

  };

  async function sendPrintRequest(serial, materialDescription, material, values) {

    const dataObject = {
      description: materialDescription,
      serial: serial,
      material: material,
      productionDate: values.productionDate.toISOString().split('T')[0],
      expireDate: values.expireDate.toISOString().split('T')[0],
      pieces: values.pieces,
      lote: values.lote,
    };
  
    try {
      const response = await axios.post('/rest/print', {
        printer: '3a189696a52a40ed9ed1725a4c8e63d5',
        label: '1ec7b6e3211648dea6d5521edf877c5f',
        data: dataObject
      });
      // Handle successful response if needed
    } catch (error) {
      showError(error.message);
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
        {contextHolder}
      
        <Title level={4}>Entrada de Producto</Title> 
        <Divider />
        <SerialsModal modalVisible={modalVisible} serials={serials} setModalVisible={setModalVisible}/>
      {/* <Title level={4}>Captura de Produccion</Title> */}
      <Form layout={'vertical'} form={form} initialValues={{ layout: 'vertical' }} width='100%' onFinish={onFinish}>
        
        <Row gutter={16}>
          <Col span={8}>
             <Form.Item label="Numero de Material" name='material'>
              {/* <Input /> */}
              <MaterialInput setMaterial={setMaterial} setMaterialDescription={setMaterialDescription}/>
            </Form.Item>
           
          </Col>
          <Col span={8}>
            <Form.Item label="Descripcion" name='description'>
              <Input size='big' value={materialDescription} placeholder={materialDescription} readOnly/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Fecha de Produccion / Entrada" name='productionDate' rules={[{ required: true, message: '' }]}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Fecha de Caducidad" name='expireDate' rules={[{ required: true, message: '' }]}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>

          <Col span={8}>
          </Col>
        </Row>
        
        <Row gutter={16}>
        <Col span={3}>
            <Form.Item label="Generar Seriales">
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked
                  onChange={() => { setPrintSerials(!printSerials)}}
                />
            </Form.Item>
          </Col>
          {
            printSerials ?
            <Col span={4}>
            <Form.Item label="Numero de Cajas" name='boxes' rules={[{ required: true, message: '' }]}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          : null

          }

          <Col span={ printSerials ? 4 : 6}>
            <Form.Item label={printSerials ? "Piezas por Caja" : "Piezas"} name='pieces' rules={[{ required: true, message: '' }]}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          
          <Col span={ printSerials ? 5 : 7}>
            <Form.Item label="Lote"name='lote' rules={[{ required: true, message: '' }]}>
              <Input style={{ width: '100%' }} />
            </Form.Item>
          </Col>

        </Row>
        <Form.Item style={{marginTop:'10px', textAlign:'left'}}>
          <Button type="primary" htmlType="submit" style={{marginTop:'10px', width:'66.5%', height:'40px'}}>Guardar</Button>
        </Form.Item>
      </Form>
    </>
  );
};
