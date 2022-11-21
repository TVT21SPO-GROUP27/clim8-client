import zoomPlugin from 'chartjs-plugin-zoom';
import {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
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

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    zoomPlugin
  );

function getCorrectSummarySeries(summarySeries) {
  if(summarySeries === "HADCRUT_GLOBAL") return "global";
  else if(summarySeries === "HADCRUT_NORTHERN_HEMISPHERE") return "northern";
  else return "southern";
}

const config = {
  scales: {
    x: {
      min: 1,
      max: 100,
      suggestedMax: 40,
      suggestedMin: 1
    },
    y: {
      min: -1,
      max: 1,
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
      text: 'Ilmasto 1850-2022'
    }
  }
}

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
        ]
      });

      const [data2, setData2] = useState({
        labels:'Ilmasto 1850-2022 Vuosittain',
        datasets: [
          {
            label: 'Dataset 2',
            data:[],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(25, 90, 13, 0.5)',
          },
        ]
      });

    useEffect(()=> {
       const fetchData= async()=> {
          const url = 'http://localhost:8080/hadcrutdata'

          let anual = new Map([
            ["global", new Map()],
            ["northern", new Map()],
            ["southern", new Map()]
          ]);

          let monthly = new Map([
            ["global", new Map()],
            ["northern", new Map()],
            ["southern", new Map()]
          ]);
         await fetch(url).then((data)=> {
            console.log(data)
            const res = data.json();
            return res
         }).then((res) => {
            console.log(res)
            for (const val of res) {
              if(val.month === 0) {
                console.log("Found data for annual!");
                anual.get(getCorrectSummarySeries(val.summarySeries)).set(val.year, val.data);
              } else {
                console.log("Found data for monthly!");
                monthly.get(getCorrectSummarySeries(val.summarySeries)).set(val.month + "/" + val.year, val.data);
              }
            }

            setData({
                labels: Array.from(monthly.get("global").keys()),
                datasets: [
                  {
                    label: 'Monthly - Global',
                    data: Array.from(monthly.get("global").values()),
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                    indexAxis: 'x'
                  },
                  {
                    label: 'Monthly - Northern',
                    data: Array.from(monthly.get("northern").values()),
                    fill: false,
                    borderColor: 'rgb(0, 234, 255)',
                    tension: 0.1,
                    indexAxis: 'x'
                  },
                  {
                    label: 'Monthly - Southern',
                    data: Array.from(monthly.get("southern").values()),
                    fill: false,
                    borderColor: 'rgb(0, 0, 255)',
                    tension: 0.1,
                    indexAxis: 'x'
                  }
                ]
              })
              setData2({
                labels: Array.from(anual.get("global").keys()),
                datasets: [
                  {
                    label: 'Annual - Global',
                    data: Array.from(anual.get("global").values()),
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                    indexAxis: 'x'
                  },
                  {
                    label: 'Annual - Northern',
                    data: Array.from(anual.get("northern").values()),
                    fill: false,
                    borderColor: 'rgb(0, 234, 255)',
                    tension: 0.1,
                    indexAxis: 'x'
                  },
                  {
                    label: 'Annual - Southern',
                    data: Array.from(anual.get("southern").values()),
                    fill: false,
                    borderColor: 'rgb(0, 0, 255)',
                    tension: 0.1,
                    indexAxis: 'x'
                  }
                ]
              })
            //console.log(temp, year)
         }).catch(e => {
                console.log("error", e)
            })
        }
        
        fetchData();
    },[])
   
    return(
      <div>
        <div style={{width:'50%', height:'10%'}}>
            <div><Line options={config} data={data}/></div>
        </div>
        <div style={{width:'50%', height:'10%'}}>
            <div><Line options={config} data={data2}/></div>
        </div>
        <p>Lähde: </p>
        <a href="https://www.metoffice.gov.uk/hadobs/hadcrut5/">HadCRUT5</a>
      </div>
         )
}
