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
      type: "time"
    },
    y: {
      min: 300,
      max: 450,
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
      text: 'Mauna Lao 1958-2022'
    }
  }
}
export default function KolmasVisualisointi() {
    /*const [data, setData] = */ useState({
        labels:'Mauna Loa 1958-2022',
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
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(25, 90, 13, 0.5)',
          }
        ]
      });
      const [v3AnnualData, setV3AnnualData] = useState();
      const [v3MonthlyData, setV3MonthlyData] = useState();

    useEffect(()=> {
       const fetchData= async()=> {
          const url = 'http://localhost:8080/maunaloadata'
         // const url2 = 'http://localhost:8080/mobergdata'
         // const dataset2 = [];
          
          let annual = new Map([]);

          let monthly = new Map([]);

         await fetch(url).then((data)=> {
            console.log(data)
            const res = data.json();
            return res
         }).then((res) => {
            console.log(res)

          const annualData = [];
          const monthlyData = [];

            for (const val of res) {
            {
                if(val.month === 0) {
                  console.log("Found data for annual!");
                  annual.set(val.year.toString(), val.data);
                  annualData.push({time:val.year.toString(), data: val.data})
                } else {
                  console.log("Found data for monthly!");
                  monthly.set(val.year.toString() + "-" + val.month.toString().padStart(2,"0")+ "-01", val.data);
                  monthlyData.push({time:val.year.toString() + "-" + val.month.toString().padStart(2,"0")+ "-01", data: val.data})
                }
              }
            }
            setV3AnnualData(annualData);
            setV3MonthlyData(monthlyData);
          }).catch(e => {
              console.log("error", e)
          })
        /*
        await fetch(url2).then((data)=> {
            console.log(data)
            const res = data.json();
            return res
         }).then((res) => {
          console.log(res)
          for (const val of res) {
           dataset2.push(val.data);
          }}).catch(e => {
            console.log("error", e)
        })
        */

        }
        
        fetchData();
    },[])


    let graphDataSets = {
      datasets: [
        {
          label: 'Monthly Co2 Measurements',
          data: v3MonthlyData,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          parsing: {
            xAxisKey: "time",
            yAxisKey: "data",
          },
        },

        { 
          label: 'Annual Co2 Measurements',
          data: v3AnnualData,
          fill: false,
          borderColor: 'rgb(255, 192, 192)',
          tension: 0.1,
          parsing: {
            xAxisKey: "time",
            yAxisKey: "data",
          },
        },
   
      ]
    }
   
    return(
      <div>
        <div style={{width:'50%', height:'10%'}}>
            <div><Line options={config} data={graphDataSets}/></div>
        </div>
        <p>Lähde: </p>
        <a href="https://gml.noaa.gov/ccgg/trends/">Mauna Loa</a>
      </div>
         )
}
