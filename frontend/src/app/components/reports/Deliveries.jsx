'use client'

import React from 'react'
import DeliveriesReport from './DeliveriesReport'
import { Divider } from 'antd'
import { Typography } from 'antd'
const { Title } = Typography

const Inventory = () => {
  return (
    <div>
      <Title level={4}>Salidas Totales por Destino y Fecha</Title>
      <Divider/>
        <DeliveriesReport />
    
    </div>
  )
}

export default Inventory