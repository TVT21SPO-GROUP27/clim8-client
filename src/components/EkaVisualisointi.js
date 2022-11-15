import {bar, Line, Pie} from 'react-chartjs-2';
import { Chart as ChartJs } from 'chart.js';
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EkaVisualisointi() {
    /*const [data, setData] = useState(0);
    const [month, setMonth] = useState(0);
    const [SSeries, setSSeries] = useState('');
    const [year, setYear] = useState(0);*/
/*
    const climate = [axios.get("http://localhost:8080/hadcrutdata")
    .then((response) => {
        console.log(response.data);
        setData(response.data[0].data);
        setMonth(response.data[0].month);
        setYear(response.data[0].year);
        setSSeries(response.data[0].summarySeries);
    }).catch (error => {
        alert(error);
    })]

    const [chartData, setchartData] = useState({
        labels: climate.map(d => d.year),
        datasets: [
            {
                label: "Climate",
                data: climate.map(d => d.data)
            }
        ]
    })*/
    const [chartData, setChartData]  = useState({});
    /*const [data, setData] = useState([]);
    const [month, setMonth] = useState([]);
    const [SSeries, setSSeries] = useState([]);
    const [year, setYear] = useState([]);*/
    
    const Chart = () => {
        let data = [];
        let year = [];
        let month = [];

        axios.get("http://localhost:8080/hadcrutdata")
        .then(res => {
            console.log(res);
            for(const dataObj in res.data.data){
                data.push(parseInt(dataObj.data));
                year.push(parseInt(dataObj.year));
                month.push(parseInt(dataObj.month));
        }
        setChartData({
            datasets: [{
                label: 'Climate',
                    data: data
            }]
        });
        })
        .catch (error => {
        alert(error);
        })
    }



    useEffect(() => {
        Chart();
      }, []);
    return (
        <div style={{display: 'flex', alingItems: 'center', flexWrap: 'wrap'}}>
            <div><Line data={chartData}/></div>
            
        </div>
    )
}
