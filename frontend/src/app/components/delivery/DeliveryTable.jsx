'use client'

import {React, useEffect, useState} from 'react'
import axios from 'axios'
import { Table, Row, Col, Divider } from 'antd'
import { SyncOutlined, StopOutlined } from '@ant-design/icons'
import SelectedModal from './SelectedModal'

import { Typography } from 'antd';
const { Title } = Typography;







const DeliveryTable = () => {

  const columns = [

    {
      title: 'Numero',
      dataIndex: 'numero',
      render: (text) => <a>{text}</a>,
      width:'10%',
      onCell: (record) => ({
        onClick: () => handleRowSelection(record),
      }),
    },
    {
      title: 'Destino',
      dataIndex: 'destino',
      width:'10%'
    
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      width:'10%'
    },
  
  ]
  

  const [production, setProduction] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [modalSource, setModalSource] = useState(null)
  const [selectedRadio, setSelectedRadio] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/delivery/active');
      
        const data = res.data
        const deliveries = []
        data.map((item) => {

          item.key = item._id,
          item.numero = item._id,
          item.destino = item.destination,
          item.fecha = item.date,
          item.serials = item.serials,

          deliveries.push(item)
        })

        setProduction(deliveries)

    
      } catch(err) {
        console.log(err)
      }
    }

      fetchData(); 
  }, [isModalOpen]);



  const handleRowSelection = (row) => {
    console.log(row);
    setIsModalOpen(true)
    setSelectedRow(row)
    setSelectedRadio(row.key);
    setModalSource('row')
  }

  // const handleButtonClick = () => {
  //   setIsModalOpen(true)
  //   setSelectedRow(null)
  //   setSelectedRadio(null);
  //   setModalSource('button')
  // }



  return (

    <>
     <Title level={4}>Salidas Programadas</Title> 
     <Divider />
     <div className="responsive-table">
       
       <Row gutter={16} style={{textAlign:'center'}}>
         <Col xs={24} sm={24} md={24} lg={24} xl={24}>
           <Table
            //  rowSelection={{
            //    type: 'radio',
            //    selectedRowKeys: [selectedRadio],
            //    onChange: handleRowSelection,
 
            //  }}
             columns={columns}
             dataSource={production}
             scroll={{
               x: 'calc(700px + 50%)',
              
             }}
           />
         </Col>
       </Row>
       { selectedRow ? (
           <SelectedModal open={isModalOpen} setModal={setIsModalOpen} selectedRow={selectedRow} modalSource={modalSource}/>
       ) : ''
        
       }
      
     </div>
    </>

  );
}
export default DeliveryTable