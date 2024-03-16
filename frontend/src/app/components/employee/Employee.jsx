'use client'

import { useState } from 'react';
import { Button, Form, Input, DatePicker, InputNumber, Col, Row,message} from 'antd';
import { Typography, Divider } from 'antd';
const { Title } = Typography;
import axios from 'axios';



export default function Employee() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
     
        axios.post('/equipment/newEmployee', values)
        .then((res) => {
          
            message.success('Empleado Registrado');
            form.resetFields();
        })
        .catch((error) => {
          
            message.error('Error al registrar empleado');
        })
    }
        

    return (
        <>
            {/* {contextHolder} */}
          
            <Title level={4}>Registrar Empleado</Title> 
            <Divider />
          {/* <Title level={4}>Captura de Produccion</Title> */}
          <Form layout={'vertical'} form={form} initialValues={{ layout: 'vertical' }} width='100%' onFinish={onFinish}>
            
            <Row gutter={16}>
              <Col span={8}>
                 <Form.Item label="Nombre Completo" name='name'>
                  <Input />
                </Form.Item>
               
              </Col>
              <Col span={8}>
                 <Form.Item label="Puesto" name='role'>
                  <Input />
                </Form.Item>
               
              </Col>

            </Row>

            <Row gutter={16}>
              <Col span={8}>
                 <Form.Item label="Ubicacion" name='ubication'>
                  <Input />
                </Form.Item>
               
              </Col>
              <Col span={8}>
                 <Form.Item label="Telefono" name='phone'>
                  <Input />
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
