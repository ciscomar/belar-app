'use client'

import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
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
    sorter: (a, b) => a.material.localeCompare(b.material),
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


  {
    title: 'Fecha Produccion',
    dataIndex: 'productionDate',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.productionDate.localeCompare(b.productionDate),
  },
  {
    title: 'Fecha Caducidad',
    dataIndex: 'expireDate',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.expireDate.localeCompare(b.expireDate),
  },
  {
    title: 'Piezas',
    dataIndex: 'pieces',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.pieces - b.pieces,
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
    title: 'Ubicacion',
    dataIndex: 'ubication',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.ubication.localeCompare(b.ubication),
  },

  {
    title: 'Lote',
    dataIndex: 'lote',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.serial - b.serial,
  },

];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
const InventoryTableShelf = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    let serials = [];
      axios.post('/production/searchSerials').then(response => {
  
        if (response.status === 200) {
        
            let dataResponse = response.data.shelf;
            console.log(dataResponse);
            dataResponse.map((item) => {
              const { _id, ...rest } = item; 
              const modifiedItem = {
                key: _id, 
                ...rest, 
              };
              serials.push(modifiedItem);
            });
            setData(serials);
            
  
        }else{
         // showError("Error al cargar Inventario");  
        }
       
      }).catch(error => {
        showError(error.message);
      });
  

  
  }, []);

  return (
    <>
      <Table columns={columns} dataSource={data} onChange={onChange} />;
    </>
  
  )

}


export default InventoryTableShelf;