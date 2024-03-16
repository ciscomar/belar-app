'use client'
import { Card, Button, Row, Col } from 'antd';
import { useRouter } from 'next/navigation'
import RackModal from './RackModal';
import { useState } from 'react';

export default function Rack() {
  const router = useRouter()
  const [modal, setModal] = useState()

  return (
    <>
        <RackModal open={true} setModal={setModal} />

    </>
  );
}
