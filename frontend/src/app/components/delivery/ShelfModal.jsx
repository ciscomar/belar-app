'use client'

import { Divider, Table, Modal, Button } from 'antd';
import { useEffect, useState } from "react";
import axios from 'axios';
import { InputNumber, notification, message } from 'antd';
import { Typography } from 'antd';
import { DropboxOutlined } from '@ant-design/icons';
const { Text } = Typography;

export default function ShelfModal({modalVisible, setModalVisible, selectedRow, setInventoryData, 
  inventoryData, initial, setInitial, data, setSelectedShelf, selectedShelf}) {
  const [serialData, setSerialData ] = useState(null)
  const [pieces, setPieces] = useState(1)


    const handleCancel = () => {
        setModalVisible(false);
    };


    const [api, contextHolderSuccess] = notification.useNotification();
    const openNotificationWithIcon = (type,data ) => {
      api[type]({
        message: 'Serial Reempacado',
        description: `Serial Actualizado: ${serialData.serial}
        Serial Generado: ${data}`

      });
    }

    const [messageApi, contextHolder] = message.useMessage();
    const showError = (message) => {
      messageApi.open({
        type: "error",
        content: message,
      });
    };

    const handleAccept = () => {

      const newRow ={
        ...selectedRow[0],
        pieces: pieces
      }


      let found = selectedShelf.find(item => item.key === newRow.key)
      if (found) {
        let newShelf = selectedShelf.map((item) => {
          if (item.key === newRow.key) {
            item.pieces = parseInt(item.pieces) + parseInt(pieces)
          }
          return item
        })
        setSelectedShelf(newShelf)
      } else {
        setSelectedShelf([...selectedShelf, newRow])
      }

      let modifydata = initial ? data : inventoryData
      let datam = modifydata.map((item) => {

        if (item.key === selectedRow[0].key) {
          item.pieces = parseInt(item.pieces) - parseInt(pieces)
          // if item.pieces === 0 delete item
          if (item.pieces === 0) {
            return null
          }      
        }

        return item
      })



      setInventoryData(datam)
      setModalVisible(false);
      setInitial(false)



    }
  
    return (
      <>
      {contextHolder}
      {contextHolderSuccess}
        <Modal
        open={modalVisible}
        onCancel={handleCancel}
        footer={[
            <Button type="primary" style={{textAlign:'center'}} onClick={handleAccept}>Aceptar</Button>
          ]}>
                  <div style={{textAlign:'center'}}>
    
    <DropboxOutlined style={{fontSize:'30px', marginRight:'5px'}} />
      <Text style={{ fontSize:'25px', marginBottom:'30px'}}>{'Seleccionar Cantidad'}</Text>
      <br />
      <Text style={{ fontSize:'20px'}}>{'Piezas Requeridas'}</Text>
    </div>
    <InputNumber style={{ display: 'block', margin: 'auto', width:'80%'}} size='large' min={1} max={selectedRow ? selectedRow[0].pieces: 0} defaultValue={1} 
    onChange={setPieces}
    />

        </Modal>
      </>
    );
  }