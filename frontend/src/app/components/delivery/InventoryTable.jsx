'use client'

import React, { useState, useEffect } from 'react';
import { Radio, Table, Switch } from 'antd';
import { Typography, Divider } from 'antd';
import RepackModal from '@/app/components/delivery/RepackModal';
import axios from 'axios';
import { Button, message, Popconfirm } from 'antd';

const { Title } = Typography;




export default function Inventorytable () {

  const columns = [
    {
      title: 'Movimiento',
      key: 'action',
      render: (text, record) => (
        <>
      
          <Button onClick={() =>  handleRowSelection(record)} >Reempacar</Button>
          <Divider type="vertical" />
          <Popconfirm
            title="Mover a Piezas"
            description="Seguro que deseas enviar el material a Piezas?"
            onConfirm={()=>confirmChange(record)}
            okText="Si"
            cancelText="No"
          >
            <Button>Mover a Estante</Button>
           </Popconfirm>
        </>
      ),
    },
    {
      title: 'Material',
      dataIndex: 'material',
    },
    {
      title: 'Descripcion',
      dataIndex: 'description',
    },
  
    {
      title: 'Fecha Produccion',
      dataIndex: 'productionDate',
    },
    {
      title: 'Fecha Caducidad',
      dataIndex: 'expireDate',
    },
    {
      title: 'Piezas',
      dataIndex: 'pieces',
    },
    {
      title: 'Serial',
      dataIndex: 'serial',
    },
    {
      title: 'Lote',
      dataIndex: 'lote',
    },
  ];
  

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRow, setSelectedRow ] = useState(null)
  const [serials, setSerials] = useState([]);
  const [serialChanged, setSerialChanged] = useState(false);

  useEffect(() => {
    axios.post('/production/searchSerials').then(response => {

      if (response.status === 200) {
      
          setSerials(response.data.serials)

      }else{
        showError("Error al cargar Inventario");  
      }
     
    }).catch(error => {
      showError(error.message);
    });

  }, [modalVisible, serialChanged]);

  const handleRowSelection = (record) =>{
    setSelectedRow(record.key)
    setModalVisible(true);
  }

  const confirmChange = (record) => {
    setSerialChanged(!serialChanged)

    axios.post('/production/changePieces', {id:record.key}).then(response => { 
      if (response.status === 200) {
        message.success('Enviado a Estanteria');
        setModalVisible(false);
      }else{
        message.error('Error al mover a Piezas');  
      }
    }).catch(error => {
      showError(error.message);
    });
   

  };

  

  let data=[]
  serials.map((item) => {
    const { _id, ...rest } = item; 
    const modifiedItem = {
      key: _id,
      ...rest, 
    };
    data.push(modifiedItem);
  });

  return (
    <>
      <Title level={4}>Cambiar Serial</Title>
      <Divider />

      <Table
        // rowSelection={{
        //   type: 'radio',
        //   onChange: handleRowSelection,
        // }}
        columns={columns}
        dataSource={data}
      />
          <RepackModal modalVisible={modalVisible} setModalVisible={setModalVisible} id={selectedRow}/>
    </>
  );
};
