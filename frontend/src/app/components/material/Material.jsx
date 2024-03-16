'use client'

import { useState } from 'react';
import { Button, Form, Input, DatePicker, notification, Col, Row,message} from 'antd';
import { Typography, Divider } from 'antd';
const { Title } = Typography;
import axios from 'axios';



const Material = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        axios.post('/material/insert', values).then(response => {
    
          if (response.status === 200) {
           
            openNotificationWithIcon('success')
              form.resetFields();
    
          }else{
               message.error("Error al generar");  
          }
         
        }).catch(error => {
            message.error(error.message);
        });
    
      };

      const [api, contextHolderSuccess] = notification.useNotification();
      const openNotificationWithIcon = (type ) => {
        api[type]({
          message: 'Material Generado',
        });
      }
    return (
        <>
          {contextHolderSuccess}
          
            <Title level={4}>Material</Title> 
            <Divider />

          <Form layout={'vertical'} form={form} initialValues={{ layout: 'vertical' }} width='100%' onFinish={onFinish}>
            
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="Numero de Material" name='material' rules={[{ required: true, message: '' }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Descripcion" name='description' rules={[{ required: true, message: '' }]}>
                  <Input size='big' />
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

export default Material