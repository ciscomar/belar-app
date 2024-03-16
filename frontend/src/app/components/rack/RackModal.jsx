'use client'

import { React, useRef, useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, Input, message, Table, List, notification, Button} from 'antd'
import { UserOutlined, BarcodeOutlined, SelectOutlined , ScanOutlined, CodeSandboxOutlined  } from '@ant-design/icons'
import Image from 'next/image'
import { Typography } from 'antd';
import { useRouter } from 'next/navigation'

const { Text } = Typography;

const RackModal = ({open, setModal }) => {
  const router = useRouter()

  const [messageApi, contextHolder] = message.useMessage();
    const [modalKey, setModalKey] = useState(0)
    const [serials, setSerials] = useState([])
    const [serial, setSerial] = useState('')
    const [ubication, setUbication] = useState('')
    
    


    

    const handleClose = () => {
        router.push('/menu')

    }
    const handleEnter = (e) => {

      if(e.key === 'Enter'){
        if(ubication === ''){
          setUbication(e.target.value)
          setSerial('')
         }else{

          let serial = e.target.value
          axios.post('/production/serial_rack', {serial,ubication }).then(response => {
         
            if (response.data?._id) {
              success("Serial Ubicado: "+response.data.ubication);
              setSerial('')         
            }else{
              setSerial('')
              showError("Serial no encontrado");  
            }
           
          }).catch(error => {
            showError(error.message);
          });

        }
        

   
      }
    }
  

    const showError = (error) => {
      messageApi.open({
        type: 'error',
        content: error,
      });
    };

    const success = (success) => {
      messageApi.open({
        type: 'success',
        content: success,
      });
    };

    const [api, contextHolderSuccess] = notification.useNotification();
    const openNotificationWithIcon = (type,data ) => {
      api[type]({
        message: 'Salida Capturada',
        description:
          'Identificador de Salida: '+ data
      });
    }

  

  return (
    <>
    {contextHolder}{contextHolderSuccess}
      <Modal title="" open={open} key={modalKey} footer={[<Button type="primary" onClick={handleClose}>
            Regresar
          </Button>]} centered
    
      >
      <div style={{textAlign:'center'}}>
    
    {ubication == '' ? 
    <SelectOutlined style={{fontSize:'30px', marginRight:'5px'}} /> :
    <CodeSandboxOutlined style={{fontSize:'30px', marginRight:'5px'}} />
    
    }
     
        <Text style={{ fontSize:'25px'}}>{ubication == '' ? 'Ubicacion' : 'Ubicar Seriales'}</Text>
        <br />
        <Text style={{ fontSize:'25px'}}>{ubication == '' ? '' : ubication}</Text>
        <br />
        {/* <Text style={{ fontSize:'20px'}}>{}</Text> */}
      </div>
     
     
        <Input size="large" 
        prefix={<ScanOutlined/>} value={serial}  onChange={(e) => setSerial(e.target.value)} onKeyDown={handleEnter} style={{marginBottom:'5px'}}/>
        
        {/* <List
      size="small"
      header={<div>
        <div style={{display:'flex', justifyContent:'space-around'}}>
        <div style={{width:'100px'}}>Serial</div>
        <div style={{width:'100px', textAlign:'center'}}>Material</div>
        <div style={{width:'100px', textAlign:'center'}}>Ubicación</div>
        </div>
      </div>
    }
     
      bordered
      dataSource={serials}
      renderItem={(item) => 
      <List.Item style={{ background: item.status != 'delivered'? 'rgba(250, 255, 204, 0.8)':'rgba(202, 254, 204, 0.8)'}}>      
        <div style={{textAlign:'center'}}>{item.serial}</div>
        <div>{item.material}</div>
        <div style={{marginRight:'25px'}}>{item.ubication}</div>
        </List.Item>}
    /> */}
        
      </Modal>
    </>
  )
}

export default RackModal