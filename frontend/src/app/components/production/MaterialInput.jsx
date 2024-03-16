'use client'

import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import axios from 'axios';

const MaterialInput = ({setMaterial, setMaterialDescription}) => {
    const [materials, setMaterials] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/material/list').then(response => {
            const data = response.data;
            const options = data.map(d => ({
                "value": d.material,
                "label": d.material
            }));
            setMaterials(options);
            setData(data);
        });
    }, []);

    const onChange = (value) => {
       setMaterial(value)
         const material = data.filter(d => d.material === value);
         setMaterialDescription(material[0].description);

      };
    //   const onSearch = (value) => {
    //     console.log('search:', value);
    //   };
      
      // Filter `option.label` match the user type `input`
      const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    return (
        <>
          <Select
    showSearch
    optionFilterProp="children"
    onChange={onChange}
    // onSearch={onSearch}
    filterOption={filterOption}
    options={materials}
  />
            
        </>
    )
}

export default MaterialInput;