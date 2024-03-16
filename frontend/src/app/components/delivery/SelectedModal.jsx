'use client'

import { React, useRef, useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, Input, message, Table, List, notification, Button} from 'antd'
import { UserOutlined, BarcodeOutlined, ShoppingCartOutlined, ScanOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { Typography } from 'antd';

const { Text } = Typography;

const SelectedModal = ({open, setModal, selectedRow }) => {
  const [messageApi, contextHolder] = message.useMessage();
    const [modalKey, setModalKey] = useState(0)
    const [serials, setSerials] = useState([])
    const [serial, setSerial] = useState('')	
    
    

    useEffect(() => {
      axios.post('/delivery/id', {id: selectedRow._id}).then(response => {
        if (response.status === 200) {
            setSerials(response.data)
        }else{
         showError("Error al cargar Inventario");  
        }    
      }).catch(error => {
         showError(error.message);
      });
    }, [open]);
  
    

    const handleClose = () => {
        setModal(false)

    }
    const handleEnter = (e) => {

      if(e.key === 'Enter'){
        
        axios.post('/delivery/captureSerial', {serial, id:selectedRow._id}).then(response => {
         
          if (response.data.modifiedCount === 1) {
            const updatedSerials = [...serials];
            const index = updatedSerials.findIndex((x) => (x.serial === serial && x.isSerial) || (x.lote === serial && !x.isSerial));
            updatedSerials[index].status = 'delivered';

            if(updatedSerials.every((x) => x.status === 'delivered')){
              axios.post('/delivery/complete', {id: selectedRow._id}).then(response => {
                if (response.status === 200) {
                  openNotificationWithIcon('success', selectedRow._id)
                  setModal(false)
                }else{
                  showError("Error al actualizar estado");  
                }    
              }).catch(error => {
                 showError(error.message);
              });
            }else{
              setSerials(updatedSerials);     
            }

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
    
      <ShoppingCartOutlined style={{fontSize:'30px', marginRight:'5px'}} />
        <Text style={{ fontSize:'25px'}}>{'Salida'}</Text>
        <br />
        <Text style={{ fontSize:'20px'}}>{selectedRow._id}</Text>
      </div>
     
     
        <Input size="large" 
        prefix={<ScanOutlined/>} value={serial}  onChange={(e) => setSerial(e.target.value)} onKeyDown={handleEnter} style={{marginBottom:'5px'}}/>
        
        <List
      size="small"
      header={<div>
        <div style={{display:'flex', justifyContent:'space-around'}}>
        <div style={{width:'100px'}}>Serial/Lote</div>
        <div style={{width:'100px', marginLeft:'20px'}}>Cantidad</div>
        <div style={{width:'100px', textAlign:'center'}}>Material</div>
        <div style={{width:'100px', textAlign:'center'}}>Ubicación</div>
        </div>
      </div>
    }
     
      bordered
      dataSource={serials}
      renderItem={(item) => 
      <List.Item style={{ background: item.status != 'delivered'? 'rgba(250, 255, 204, 0.8)':'rgba(202, 254, 204, 0.8)'}}>      
        <div>{item.isSerial ? item.serial : item.lote}</div>
        <div style={{marginLeft:item.serial ? '20px': '10px'}}>{item.pieces}</div>
        <div style={{marginLeft:item.serial ? '50px': '45px'}}>{item.material}</div>
        <div style={{marginRight:'25px'}}>{item.ubication}</div>
        </List.Item>}
    />
        
      </Modal>
    </>
  )
}

export default SelectedModal