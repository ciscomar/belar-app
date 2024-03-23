'use client'

import React, { useEffect, useState } from 'react';
import { Table, DatePicker, Divider } from 'antd';
import axios from 'axios';
const columns = [
  // {
  //   title: 'Material',
  //   dataIndex: 'material',
  //   filters: [
  //     {
  //       text: 'Joe',
  //       value: 'Joe',
  //     },
  //     {
  //       text: 'Jim',
  //       value: 'Jim',
  //     },

  //   ],
  //   // specify the condition of filtering result
  //   // here is that finding the name started with `value`
  //   onFilter: (value, record) => record.material.indexOf(value) === 0,
  //   sorter: (a, b) => a.material.length - b.material.length,
  //   sortDirections: ['descend'],
  // },

  {
    title: 'Material',
    dataIndex: 'material',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.material.localeCompare(b._id),
  },


  // {
  //   title: 'Descripcion',
  //   dataIndex: 'description',
  //   filters: [
  //     {
  //       text: 'London',
  //       value: 'London',
  //     },
  //     {
  //       text: 'New York',
  //       value: 'New York',
  //     },
  //   ],
  //   onFilter: (value, record) => record.description.indexOf(value) === 0,
  // },

  
  {
    title: 'Descripcion',
    dataIndex: 'description',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.description.localeCompare(b.description),
  },


  // {
  //   title: 'Fecha Produccion',
  //   dataIndex: 'productionDate',
  //   defaultSortOrder: 'descend',
  //   sorter: (a, b) => a.productionDate.localeCompare(b.productionDate),
  // },
  // {
  //   title: 'Fecha Caducidad',
  //   dataIndex: 'expireDate',
  //   defaultSortOrder: 'descend',
  //   sorter: (a, b) => a.expireDate.localeCompare(b.expireDate),
  // },
  {
    title: 'Total Piezas',
    dataIndex: 'totalPieces',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.totalPieces - b.totalPieces,
  },

  // {
  //   title: 'Ubicacion',
  //   dataIndex: 'ubication',
  //   filters: [
  //     {
  //       text: 'London',
  //       value: 'London',
  //     },
  //     {
  //       text: 'New York',
  //       value: 'New York',
  //     },
  //   ],
  //   onFilter: (value, record) => record.description.indexOf(value) === 0,
  // },

  {
    title: 'Destino',
    dataIndex: 'destination',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.destination.localeCompare(b.destination),
  },

  {
    title: 'Fecha',
    dataIndex: 'date',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.date.localeCompare(b.date),
  },

  // {
  //   title: 'Lote',
  //   dataIndex: 'lote',
  //   defaultSortOrder: 'descend',
  //   sorter: (a, b) => a.serial - b.serial,
  // },

];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};


const DeliveriesReport = () => {

  const [data, setData] = useState([]);
  const [startDate, setDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const onChangeInit = (dateString) => {
    setDate(dateString);
  };

  const onChangeEnd = (dateString) => {
    setEndDate(dateString);
  
  }

  useEffect(() => {
    let serials = [];
      axios.post('/delivery/totalDelivery', {startDate, endDate}).then(response => {

        if (response.status === 200) {
          console.log(response.data);

          setData(response.data);
        }else{
         // showError("Error al cargar Inventario");  
        }
       
      }).catch(error => {
       
      });
  

  
  }, [endDate]);

  return (
    <>
      <div style={{ display: 'flex'}}>
        <div style={{ marginRight: '100px' }}>
          <p>Fecha Inicial:</p>
          <DatePicker onChange={onChangeInit} />
        </div>
        <div>
          <p>Fecha Final:</p>
          <DatePicker onChange={onChangeEnd} />
        </div>
      </div>
      <Divider/>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </>
  );
}


export default DeliveriesReport;