import {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import { Bar, Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Ilmasto 1850-2022',
      },
    },
  };


export default function EkaVisualisointi() {
    const [data, setData] = useState({
        labels:['Temperature'],
        datasets: [
          {
            label: 'Dataset 1',
            data:[],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(25, 90, 13, 0.5)',
          },
          {
            label: 'Dataset 2',
            data:[],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      });
    useEffect(()=> {
       const fetchData= async()=> {
           const url = 'http://localhost:8080/hadcrutdata'
           const dataSet1 = [];
           const dataSet2 = [];
         await fetch(url).then((data)=> {
             console.log(data)
             const res = data.json();
             return res
         }).then((res) => {
             console.log(res)
            for (const val of res) {
                dataSet1.push(val.data);
                dataSet2.push(val.year)
            }
            setData({
                labels:dataSet1,
                datasets: [
                  {
                    label: 'Dataset ID',
                    data:dataSet2,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(99, 132, 0.5)',
                  }/*,
                  {
                    label: 'Dataset ID2',
                    data:dataSet2,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 235, 0.5)',
                  },*/
                ],
              })
            console.log(dataSet1, dataSet2)
         }).catch(e => {
                console.log("error", e)
            })
        }
        
        fetchData();
    },[])
   
    return(
      <div style={{width:'80%', height:'50%'}}>
            {
                console.log(data)
            }
            <Bar data={data} options={options}/>
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
