'use client'

import { Button, Form, Input, Card, Col, Row, message} from "antd";
import logo from "../../../../public/dermadelLogo.png";
import Image from "next/image";
import axios from "axios";
import { useRouter } from 'next/navigation'
import logoText from "../../../../public/dermadeltext.png"


export default function Login () {
  const router = useRouter()

  const onFinish = (values) => {
    console.log(values);
 
    axios.post('/user/login', values).then(response => {
      if (response.status === 200) {
        router.push('/calendar')
      }else{
        showError("Error al Iniciar Sesion");  
      }

    }).catch(error => {
      showError(error.message);
    });

  };

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
          <div className="site-card-border-less-wrapper">
            <Row>
              <Col span={24}>
              <Card
              hoverable
              bordered={false}
              style={{
                width: 350,
                marginTop: 50
              }}
              cover={
                <div style={{textAlign:"center", marginTop:"10%"}}>

                <Image
                  alt="dermadl"
                  src={logo}
                  style={{ width: "25%", marginTop:"10%", height: "35%"}}
                />
              <br />
                  <Image
                  alt="dermadl"
                  src={logoText}
                  style={{ width: "30%", marginTop:"2%", height: "35%"}}
                />

                </div>

                
              }
            >
              <Form
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
                
              >
                <Form.Item
                 
                  name="user"
                  rules={[
                    {
                      required: true,
                      message: "",
                    },
                  ]}
                >
                  <Input placeholder="Usuario"/>
                </Form.Item>

                <Form.Item
                  
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "",
                    },
                  ]}
                >
                  <Input.Password placeholder="Contraseña"/>
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Iniciar Sesion
                  </Button>
                </Form.Item>
              </Form>
            </Card>
              </Col>
            </Row>

          </div>
    </>
  );
};

