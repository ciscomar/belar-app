'use client'
import { Card, Button, Row, Col } from 'antd';
import { useRouter } from 'next/navigation'

export default function Menu() {
  const router = useRouter()

  // const buttonStyle = {
  //   marginTop: '5px',
  //   fontSize: '1.5em', // Increase text size
  //   transform: 'scale(5)' // Scale the button size
  // };

  return (
    <Row justify="center" align="middle" style={{ height: '50vh' }}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card
          title="Movimientos de Almacen"
          bordered={false}
          style={{ textAlign: 'center' }}
        >
          <Button type="primary" block style={{ marginTop: '5px', height:'50px'  }} onClick={()=>router.push("/deliveries")}>
            Capturar Salida
          </Button>
          <Button type="primary" block style={{ marginTop: '30px', height:'50px' }} onClick={()=>router.push("/rack")}>
            Ubicar en Rack
          </Button>
          {/* <Button type="primary" block style={{ marginTop: '30px', height:'50px' }}>
            Conteo Ciclico
          </Button> */}
        </Card>
      </Col>
    </Row>
  );
}
