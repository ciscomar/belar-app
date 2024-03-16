'use client'

import React from 'react';
import { Badge, Calendar } from 'antd';
const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        // {
        //   type: 'warning',
        //   content: 'Salida Programada',
        // },
        // {
        //   type: 'success',
        //   content: 'Salida Capturada',
        // },
      ];
      break;
    case 10:
      listData = [
        // {
        //   type: 'warning',
        //   content: 'Salida Programada',
        // },
        // {
        //   type: 'success',
        //   content: 'Salida Capturada',
        // },
        // {
        //   type: 'error',
        //   content: 'Salida Cancelada',
        // },
      ];
      break;
    case 15:
      listData = [
        // {
        //   type: 'warning',
        //   content: 'This is warning event',
        // },
        // {
        //   type: 'success',
        //   content: 'This is very long usual event......',
        // },
        // {
        //   type: 'error',
        //   content: 'This is error event 1.',
        // },
        // {
        //   type: 'error',
        //   content: 'This is error event 2.',
        // },
        // {
        //   type: 'error',
        //   content: 'This is error event 3.',
        // },
        // {
        //   type: 'error',
        //   content: 'This is error event 4.',
        // },
      ];
      break;
    default:
  }
  return listData || [];
};
const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};
export default function CalendarInfo () {
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };
  return <Calendar cellRender={cellRender} />;
};
