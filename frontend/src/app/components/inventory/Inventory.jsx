'use client'

import React from 'react'
import InventoryTable from './InventoryTable'
import { Divider } from 'antd'
import { Typography } from 'antd'
const { Title } = Typography

const Inventory = () => {
  return (
    <div>
      <Title level={4}>Inventario de Seriales</Title>
      <Divider/>
      <InventoryTable />
    </div>
  )
}

export default Inventory