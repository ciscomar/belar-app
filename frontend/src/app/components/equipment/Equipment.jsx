'use client'

import { useState } from 'react';
import { Button, Form, Input, DatePicker, InputNumber, Col, Row,message, Rate} from 'antd';
import { Typography, Divider } from 'antd';
const { Title } = Typography;
import axios from 'axios';



export default function Equipment() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        
          axios.post('/equipment/newEquipment', values)
          .then((res) => {
            
              message.success('Equipo Registrado');
              form.resetFields();
          })
          .catch((error) => {
            
              message.error('Error al registrar equipo');
          })
    }
        

    return (
        <>
            {/* {contextHolder} */}
          
            <Title level={4}>Registrar Equipo</Title> 
            <Divider />
          {/* <Title level={4}>Captura de Produccion</Title> */}
          <Form layout={'vertical'} form={form} initialValues={{ layout: 'vertical' }} width='100%' onFinish={onFinish}>
            
            <Row gutter={16}>
              <Col span={8}>
                 <Form.Item label="Descripcion" name='description'>
                  <Input />
                </Form.Item>
               
              </Col>
              <Col span={8}>
                 <Form.Item label="Categoria" name='category'>
                  <Input />
                </Form.Item>
               
              </Col>

            </Row>

            <Row gutter={16}>
              <Col span={8}>
                 <Form.Item label="Marca" name='brand'>
                  <Input />
                </Form.Item>
               
              </Col>
              <Col span={8}>
                 <Form.Item label="Modelo" name='model'>
                  <Input />
                </Form.Item>
               
              </Col>

            </Row>
            <Row gutter={16}>
              <Col span={8}>
                 <Form.Item label="Numero Serie" name='serie'>
                  <Input />
                </Form.Item>
               
              </Col>
              <Col span={8}>
                 <Form.Item label="Estado" name='state'>
                 <Rate allowHalf defaultValue={2.5} />
                </Form.Item>
               
              </Col>

            </Row>
            <Form.Item style={{marginTop:'10px', textAlign:'left'}}>
              <Button type="primary" htmlType="submit" style={{marginTop:'10px', width:'66.5%', height:'40px'}}>Guardar</Button>
            </Form.Item>
          </Form>
        </>
      );
}
