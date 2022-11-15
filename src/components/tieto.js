import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Tieto() {
   // const [ok, setOK] = useState("");
    const API_URL = 'http://localhost:8080/hadcrutdata';

    const [data, setData] = useState(0);
    const [month, setMonth] = useState(0);
    const [SSeries, setSSeries] = useState('');
    const [year, setYear] = useState(0);
/*
  useEffect(()=>{
        axios.get("http://localhost:8080/hadcrutdata")
        .then(response => console.log(response.data[0]))
        .then((result)=>{
            setOK(result);
        })
    }, [])
*/

useEffect(() => {
    const address = API_URL

    console.log(address);

    axios.get(address)
        .then((response) => {
            console.log(response.data);
            setData(response.data[0].data);
            setMonth(response.data[0].month);
            setYear(response.data[0].year);
            setSSeries(response.data[0].summarySeries);
        }).catch (error => {
            alert(error);
        });
    }, [])

    return (
        <>
            <h3>Climate</h3>
            <p>{data}</p>
            <p>{month}</p>
            <p>{SSeries}</p>
            <p>{year}</p>
        </>
    )
/*
    return (
        <div>
        <h3>Tieto</h3>
            <div>
                {ok}
            </div>
        </div>
      );
      */
}