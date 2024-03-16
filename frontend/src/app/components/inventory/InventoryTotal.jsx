'use client'

import React from 'react'
import InventoryTableTotal from './InventoryTableTotal'
import { Divider } from 'antd'
import { Typography } from 'antd'
const { Title } = Typography

const Inventory = () => {
  return (
    <div>
      <Title level={4}>Totales por Ubicacion</Title>
      <Divider/>
      <InventoryTableTotal />
    </div>
  )
}

export default Inventory