'use client'

import React, { useState, useEffect } from 'react';
import { Divider, Radio, Table, Row, Col, Typography  } from 'antd';
const { Title } = Typography;
import ShelfModal from './ShelfModal';

const columns = [
    {
        dataIndex: 'material',
        title: 'Material',
      },
    
      {
        dataIndex: 'description',
        title: 'Descripcion',
      },
      {
        dataIndex: 'pieces',
        title: 'Cantidad',
      },
      {
        dataIndex: 'lote',
        title: 'Lote',
      },
      {
        dataIndex: 'expireDate',
        title: 'Fecha Caducidad',
      },
  ];


  // rowSelection object indicates the need for row selection


const ShelfTable = ({shelf, selectedShelf, setSelectedShelf}) => {


    const [selectionType, setSelectionType] = useState('checkbox');
    const [selectedRow, setSelectedRow] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [inventoryData, setInventoryData] = useState([])
    const [initial, setInitial] = useState(true)

    let data=[]
    shelf.map((item) => {
      const { _id, ...rest } = item; 
      const modifiedItem = {
        key: _id,
        ...rest, 
      };
      data.push(modifiedItem)
  
    });



    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        setSelectedRow(selectedRows);
        setModalVisible(true);
      }
    };




    return (

      <>
        <Row gutter={16}>
        <Col span={12} style={{textAlign:'center'}}>
        <Title level={4}>Inventario en Estante</Title>
        <Table
                   rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                  }}
          columns={columns}
          dataSource={initial ? data : inventoryData}
        />
        </Col>
        <Col span={12} style={{textAlign:'center'}}>
          <Title level={4}>Cantidades seleccionadas</Title>
          <Table
          columns={columns}
          dataSource={selectedShelf}
        />
        </Col>
      </Row>

      <ShelfModal  
      modalVisible={modalVisible} 
      setModalVisible={setModalVisible}
      selectedRow={selectedRow}
      setSelectedShelf={setSelectedShelf}
      inventoryData={inventoryData}
      setInventoryData={setInventoryData}
      data={data}
      initial={initial}
      setInitial={setInitial}
      selectedShelf={selectedShelf}
      />
      </>

    );

    

    
}

export default ShelfTable