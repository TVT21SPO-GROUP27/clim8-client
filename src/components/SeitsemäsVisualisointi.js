import zoomPlugin from 'chartjs-plugin-zoom';
import {useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    TimeScale,
    Title,
    Tooltip,
    PointElement,
    Legend,
    Filler,
    LineElement,
  } from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    TimeScale,
    PointElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    zoomPlugin
  );

const config = {
  scales: {
    x: {
        reverse: true,
    },
    y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
            display: true,
            text: 'CO2 ppm'
        }
    },
    y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
            display: true,
            text: 'Temperature anomaly C°'
        }
    },
  },
  plugins: {
    title: {
      display: true,
      text: 'V7 Evolution of global temperature over the past two million years'
    }
  }
}


export default function SeitsemäsVisualisointi() {

      const [evData, setEvData] = useState();
      const [evTemp, setEvTemp] = useState();

    useEffect(()=> {
       const fetchData= async()=> {
          const url = 'http://localhost:8080/snyderco2'
          const url2 = 'http://localhost:8080/snydertemp'

         await fetch(url).then((data)=> {
            console.log(data)
            const res = data.json();
            return res
         }).then((res) => {
            console.log(res)

          const evdata = [];

            for (const val of res) {
            evdata.push({year:val.year.toString(), data: val.data})        
        }
            setEvData(evdata);

          }).catch(e => {
              console.log("error", e)
          })

          await fetch(url2).then((data)=> {
            console.log(data)
            const res = data.json();
            return res
         }).then((res) => {
            console.log(res)

          const evtemp = [];

            for (const val of res) {
            evtemp.push({data: val.data})        
        }
            setEvTemp(evtemp);

          }).catch(e => {
              console.log("error", e)
          })

        }
        
        fetchData();
    },[])


    let graphDataSets = {
      datasets: [
        {
          label: 'CO2 measurements',
          data: evData,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          yAxisID: 'y',
          parsing: {
            xAxisKey: "year",
            yAxisKey: "data",
          },
        },
        {
          label: 'Temperature',
          data: evTemp,
          yAxisID: 'y1',
          parsing: {
            yAxisKey: "data",
          },
        }
      ]
    }
   
    return(
      <div>
        <div style={{width:'70%', height:'20%'}}>
            <div><Line options={config} data={graphDataSets}/></div>
        </div>
        <p>Source(s): </p>
        <li><a href="https://climate.fas.harvard.edu/files/climate/files/snyder_2016.pdf">Evolution of global temperature over the past two million years</a></li>
          <ul>
            <p>
                This graph shows the evolution of the climate from the last 2 million years. It also shows CO2 concentrations from the last 800 000 years.
            </p>
          </ul>
        </div>
         )
}
