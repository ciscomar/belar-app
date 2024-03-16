
import { Divider, Table, Modal, Button } from 'antd';
import { useEffect, useState } from "react";
import axios from 'axios';
import { InputNumber, notification, message } from 'antd';
import { Typography } from 'antd';
import { DropboxOutlined } from '@ant-design/icons';
const { Text } = Typography;

export default function RepackModal({modalVisible, setModalVisible, id}) {
  const [serialData, setSerialData ] = useState(null)
  const [pieces, setPieces] = useState(1)

  useEffect(() => {
      axios.post('/material/serial', {id}).then(response => {
        setSerialData(response.data);
        
      }).catch(error => {
       // showError(error.message);
      });

  }, [modalVisible]);


    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleRepack = () => {
      axios.post('/production/repack', {id, pieces }).then(response => {
        openNotificationWithIcon('success', response.data.serial)
        let serials = []
        let pieces = []
        serials.push(response.data.serial)
        serials.push(serialData.serial)
        pieces.push(response.data.pieces)
        pieces.push(parseInt(serialData.pieces)-parseInt(response.data.pieces))
        for (let i = 0; i < serials.length; i++) {
          const dataObject = {
            description: response.data.description,
            serial: serials[i],
            material: response.data.material,
            productionDate: response.data.productionDate.toISOString().split('T')[0],
            expireDate: response.data.expireDate.toISOString().split('T')[0],
            pieces: pieces[i],
          }
          axios.post('/rest/print', {printer:'3a189696a52a40ed9ed1725a4c8e63d5', 
          label:'1ec7b6e3211648dea6d5521edf877c5f', data:dataObject}).then(response => {

          }).catch(error => {
            showError(error.message);
          });
          
        }


        setModalVisible(false);



      }).catch(error => {})   
    }
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
  
    return (
      <>
      {contextHolder}
      {contextHolderSuccess}
        <Modal
        open={modalVisible}
        onCancel={handleCancel}
        footer={[
            <Button type="primary" style={{textAlign:'center'}} onClick={handleRepack}>Reempacar</Button>
          ]}>
                  <div style={{textAlign:'center'}}>
    
    <DropboxOutlined style={{fontSize:'30px', marginRight:'5px'}} />
      <Text style={{ fontSize:'25px', marginBottom:'30px'}}>{'Reempacar Material'}</Text>
      <br />
      <Text style={{ fontSize:'20px'}}>{'Piezas Requeridas'}</Text>
    </div>
    <InputNumber style={{ display: 'block', margin: 'auto', width:'80%'}} size='large' min={1} max={serialData?.pieces-1} defaultValue={1} 
    onChange={setPieces}
    />

        </Modal>
      </>
    );
  }