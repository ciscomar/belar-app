'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { Divider } from 'antd';
import {
  CodeSandboxOutlined,
  FileAddOutlined,
  ShoppingCartOutlined,
  SendOutlined,
  CarryOutOutlined,
  LogoutOutlined,
  CalendarOutlined,
  BarcodeOutlined,
  FolderAddOutlined,
  PlusOutlined,
  AuditOutlined,
  BarsOutlined,
  ScanOutlined,
  DropboxOutlined,
  MobileOutlined,
  DesktopOutlined,
  UserAddOutlined,
  LaptopOutlined,
  IdcardOutlined,
  FileSearchOutlined,
  ExperimentOutlined,
  CodepenOutlined,
  SelectOutlined,
  TableOutlined,
  NumberOutlined 
} from '@ant-design/icons';
import { Layout, Menu, theme, Space, Button  } from 'antd';
import logo from "../../../../public/dermadelLogo.png"
import logoText from "../../../../public/dermadeltext.png"
import Image from "next/image";
const { Content,Sider,Header } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}



import { Typography } from 'antd';
const { Title } = Typography;

const items = [
  getItem('Calendario', 'calendar', <CalendarOutlined />),
  getItem('Entrada', 'capture', <CodeSandboxOutlined />),
  getItem('Movimientos', 'sub1', <SelectOutlined  />, [
    // getItem('Entrada', 'capture', <CodepenOutlined />),
    getItem('Cambiar Serial', 'divide', <DropboxOutlined />),
    // getItem('Generar Piezas', 'pieces', <ExperimentOutlined />),
    // getItem('Nuevo Material', '4'),
  ]),

  getItem('Salida', 'sub2', <SendOutlined />, [
    getItem('Programar', 'delivery', <CarryOutOutlined/>),
    getItem('Capturar', 'menu', <ScanOutlined />),
  ]),
  getItem('Inventario', 'sub4', <BarsOutlined />,[
    getItem('Seriales', 'seriales', <BarcodeOutlined />),
    getItem('Estante', 'estante', <TableOutlined />),
    getItem('Totales', 'total', <NumberOutlined />),
  ]),
  getItem('Configuracion', 'sub3', <FolderAddOutlined />, [
    getItem('Material', 'material', <PlusOutlined />),
    getItem('Destino', 'destination', <AuditOutlined  />),
  ]),
  // getItem('Equipo', 'sub5', <DesktopOutlined />, [
  //   getItem('Empleados', 'employee', <UserAddOutlined /> ),
  //   getItem('Equipos', 'equipment', <LaptopOutlined />),
  //   getItem('Asignar Equipo', 'assignEquipment', <IdcardOutlined />),
  //   getItem('Consultar Empleado', 'searchEmployee', <FileSearchOutlined />),


  // ]),

  // getItem('Files', '9', <FileOutlined />),
];

export default function ContentLayout({ content }) {

  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false);
  const [showSideBar, setShowSideBar] = useState(true);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleClick = (key) => {
    if (key === 'capture') {
      router.push('/capture') 
    }else if(key === 'delivery'){
      router.push('/delivery') 
    }else if(key === 'calendar'){
      router.push('/calendar') 
    }else if(key === 'menu'){
      router.push('/menu') 
    }else if(key === 'material'){
      router.push('/material') 
    }else if(key === 'destination'){
      router.push('/destination') 
    }else if(key === 'seriales'){
      router.push('/inventory') 
    }else if(key === 'divide'){
      router.push('/capture/divide') 
    }else if(key === 'employee'){
      router.push('/employee')
    }else if(key === 'equipment'){
      router.push('/equipment')
    }else if(key === 'pieces'){
      router.push('/equipment')
    }else if(key === 'estante'){
      router.push('/inventory/shelf')
    }
    else if(key === 'total'){
      router.push('/inventory/total')
    }

  };

  const handleLogout = () => {

    axios.post('/api/logout').then(response => {
      if (response.status === 200) {
        router.push('/')
      }else{
        showError("Error al cerrar Sesion");  
      }
    }).catch(error => {
        showError(error.message);
    });
    
  };

  const handleMobile = () => {
    setShowSideBar(!showSideBar)
  }


  return (
    // <Layout style={{ minHeight: '100vh' }}>
    <Layout>
      
      <Header
          style={{
            padding: 0,
            //background: colorBgContainer,
            //background: "rgba(167, 167, 167, 0.4)",            
            height:'45px',borderRadius: '2px',
            background: "linear-gradient(to bottom, rgb(214, 219, 220), rgb(230, 230, 230))"
            //background: "linear-gradient(to bottom, rgb(22, 119, 255), rgb(230, 230, 230))"
         
          }} 
        >

  <div style={{ float: 'right', marginRight:'10px', marginTop:'-10px', }}>
  <Button
    icon={<LogoutOutlined />}
    onClick={handleLogout}
    style={{ background: 'transparent', color: 'black', border: 'none', paddingBottom:'10px', color: 'black' }}
  >
    Cerrar Sesion
  </Button> 
  </div>

  <div style={{ float: 'right', marginRight:'1px', marginTop:'-9px', }}>
    <Button
      icon={<MobileOutlined twoToneColor="#52c41a" />}
      onClick={handleMobile}
      style={{ background: 'transparent', color: 'red', border: 'none', paddingBottom:'10px', color: 'black' }}
    >
    </Button>

  </div>


          <div>
          <Image
            alt="Dermadel"
            src={logo}
            style={{ width: '30px', height: '30px', marginLeft: '25px', marginTop: '5px' }}
          />
          <Image
            alt="Dermadel"
            src={logoText}
            style={{ width: '95px', height: '25px', marginLeft: '10px', marginTop: '7px' }}
          />
        </div>


      </Header>
       
      <Layout>
        { showSideBar && 
        <Sider theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} >

         
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={({ key }) => handleClick(key)} 
          
          />
        </Sider>
    }
{/* 
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            height:'10px'
            

          }}
        /> */}
        <Layout>

          <Content
            style={{
              margin: '0 16px',
            }}
          >
            <Title></Title>
            <div
              style={{
                padding: 24,
                minHeight: '100vh',
                background: colorBgContainer,
              }}
            >
              {content}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

