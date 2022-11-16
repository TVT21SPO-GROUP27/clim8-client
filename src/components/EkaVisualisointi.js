import {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    PointElement,
    Legend,
    Filler,
    LineElement,
  } from 'chart.js';

import { Line } from 'react-chartjs-2';
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

export default function EkaVisualisointi() {
    const [data, setData] = useState({
        labels:'Ilmasto 1850-2022',
        datasets: [
          {
            label: 'Dataset 1',
            data:[],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(25, 90, 13, 0.5)',
          },
        ],
      });
    useEffect(()=> {
       const fetchData= async()=> {
           const url = 'http://localhost:8080/hadcrutdata'
           const temp = [];
           const year = [];
         await fetch(url).then((data)=> {
             console.log(data)
             const res = data.json();
             return res
         }).then((res) => {
             console.log(res)
            for (const val of res) {
                temp.push(val.data);
                year.push(val.year)
            }
            setData({
                labels:year,
                datasets: [
                  {
                    label: 'Dataset',
                    data:temp,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                    indexAxis: 'x'
                  }
                ],
              })
            console.log(temp, year)
         }).catch(e => {
                console.log("error", e)
            })
        }
        
        fetchData();
    },[])
   
    return(
        <div style={{width:'80%', height:'50%'}}>
            <div><Line data={data}/></div>
        </div>
         )
         /*
         <div style={{display: 'flex', alingItems: 'center', flexWrap: 'wrap'}}>
            <div><Line data={chartData}/></div>
        </div>
        <div style={{width:'80%', height:'50%'}}>
            {
                console.log(data)
            }
            <Bar data={data} options={options}/>
         </div>
         */
}
