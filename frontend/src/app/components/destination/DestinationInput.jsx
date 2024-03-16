'use client'

import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import axios from 'axios';

const DestinationInput = ({setDestination}) => {
    const [destinations, setDestinations] = useState([]);
    // const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/delivery/destinationList').then(response => {
            const data = response.data;
            const options = data.map(d => ({
                "value": d.destination,
                "label": d.destination
            }));
            setDestinations(options);
            // setData(data);
        });
    }, []);

    const onChange = (value) => {
      setDestination(value)
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
    options={destinations}
  />
            
        </>
    )
}

export default DestinationInput;