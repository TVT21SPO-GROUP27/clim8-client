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
      min: 150,
      max: 400,
      beginAtZero: true
    }
  },
  plugins: {
    /*zoom: {
      zoom: {
        wheel: {
          enabled: true
        },
        mode: "xy",
        speed: 100
      },
      pan: {
        enabled: true,
        mode: "xy",
        speed: 100
      }
    },*/
    title: {
      display: true,
      text: 'V6 Ice core 800k year composite study CO2 measurements'
    },
    onClick(e) {
      const chart = e.chart;
      chart.resetZoom();
    }
  }
}


export default function VitosVisualisointi() {

      const [acoreData, setACoreData] = useState();

    useEffect(()=> {
       const fetchData= async()=> {
          const url = 'http://localhost:8080/acoredata'

         await fetch(url).then((data)=> {
            console.log(data)
            const res = data.json();
            return res
         }).then((res) => {
            console.log(res)

          const acoredata = [];

            for (const val of res) {
            acoredata.push({year:val.year.toString().padStart(4, "0"), data: val.data})        
        }
            setACoreData(acoredata);
            console.log(acoredata);

          }).catch(e => {
              console.log("error", e)
          })

        }
        
        fetchData();
    },[])


    let graphDataSets = {
      datasets: [
        {
          label: 'Antarctic Ice Cores',
          data: acoreData,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          parsing: {
            xAxisKey: "year",
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
        <li><a href="https://www.ncei.noaa.gov/access/paleo-search/study/17975">Antarctic Ice Cores Revised</a></li>
          <ul>
            <p>
                This graph reconstructs CO2 concentrations for the last 800,000 years.
            </p>
          </ul>
        </div>
         )
}
