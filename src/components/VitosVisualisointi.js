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
      type: "time",
    },
    y: {
      min: 180,
      max: 300,
      beginAtZero: true
    }
  },
  plugins: {
    zoom: {
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
    },
    title: {
      display: true,
      text: 'Vostok Ice Core Co2 measurements, 417160 BC - 2342 AD'
    },
    onClick(e) {
      const chart = e.chart;
      chart.resetZoom();
    }
  }
}


export default function VitosVisualisointi() {

      const [vostokData, setVostokData] = useState();

    useEffect(()=> {
       const fetchData= async()=> {
          const url = 'http://localhost:8080/vostokcoredata'

         await fetch(url).then((data)=> {
            console.log(data)
            const res = data.json();
            return res
         }).then((res) => {
            console.log(res)

          const vostokcoredata = [];

            for (const val of res) {
            vostokcoredata.push({year:val.year.toString(), data: val.data})
           }
            setVostokData(vostokcoredata);
            console.log(vostokcoredata);

          }).catch(e => {
              console.log("error", e)
          })

        }
        
        fetchData();
    },[])


    let graphDataSets = {
      datasets: [
        {
          label: 'Vostok Ice Core Co2 Measurements',
          data: vostokData,
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
        <div style={{width:'50%', height:'10%'}}>
            <div><Line options={config} data={graphDataSets}/></div>
        </div>
        <p>Source(s): </p>
        <li><a href="https://cdiac.ess-dive.lbl.gov/trends/co2/vostok.html">Vostok</a></li>
          <ul>
            <p>

            </p>
          </ul>
        </div>
         )
}
