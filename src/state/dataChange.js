import React, { useState, useEffect } from 'react';
import { setGlobalState, useGlobalState } from "." 

export default function SetDataChange (type){

    const [datad, setdatad] = useState([])
    const [dataChange] = useGlobalState("dataChange")

    if(!dataChange.includes(type)){
        const data = [...dataChange]
        data.push(type)
        setGlobalState('dataChange', data);
}
    return type
}