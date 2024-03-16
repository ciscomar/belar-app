import React, { useState } from 'react';
import { Table, Transfer,  Typography, Row, Col } from 'antd';
const { Title } = Typography;

const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;
      const rowSelection = {
        getCheckboxProps: (item) => ({
          disabled: listDisabled || item.disabled,
        }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          onItemSelectAll(treeSelectedKeys, selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };
      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{
            pointerEvents: listDisabled ? 'none' : undefined,
          }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);



const leftTableColumns = [
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
    dataIndex: 'serial',
    title: 'Serial',
  },
  {
    dataIndex: 'expireDate',
    title: 'Fecha Caducidad',
  },
];

const rightTableColumns = [
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
    dataIndex: 'serial',
    title: 'Serial',
  },
  {
    dataIndex: 'expireDate',
    title: 'Fecha Caducidad',
  },
];

export default function TransferTable({serials, targetKeys, setTargetKeys}) {
  const serialsWithKeys = serials.map((item) => ({
    ...item,
    key: item.serial, // Use 'serial' as the key
  }));
  

  const onChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  return (
    <>
     <Row gutter={16}>
      <Col span={12} style={{textAlign:'center'}}>
        <Title level={4}>Seriales en Inventario</Title>
      </Col>
      <Col span={12} style={{textAlign:'center'}}>
        <Title level={4}>Seriales Seleccionados</Title>
      </Col>
    </Row>
      <TableTransfer
        dataSource={serialsWithKeys}
        targetKeys={targetKeys}
        showSearch={true}
        onChange={onChange}
        filterOption={(inputValue, item) =>
          item.material.indexOf(inputValue) !== -1 || item.serial.indexOf(inputValue) !== -1 
          || item.description.indexOf(inputValue) !== -1 || item.expireDate.indexOf(inputValue) !== -1 
        }
        leftColumns={leftTableColumns}
        rightColumns={rightTableColumns}
      />
    </>
  );
}
