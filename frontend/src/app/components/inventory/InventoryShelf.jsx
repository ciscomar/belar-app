'use client'

import React from 'react'
import InventoryTableShelf from './InventoryTableShelf'
import { Divider } from 'antd'
import { Typography } from 'antd'
const { Title } = Typography

const Inventory = () => {
  return (
    <div>
      <Title level={4}>Inventario de Estante</Title>
      <Divider/>
      <InventoryTableShelf />
    </div>
  )
}

export default Inventory