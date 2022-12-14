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
      min: 150,
      max: 400,
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
      text: 'V8 CO2 emissions by country'
    },
    onClick(e) {
      const chart = e.chart;
      chart.resetZoom();
    }
  }
}

function getCorrectCountry(country) {
    if(country === "Finland") return "finland";
    else if(country === "Malta") return "malta";
    else if(country === "Morocco") return "morocco";
    else return "";
  }

export default function Visualisointi8() {

      const [emissionData, setEmissionData] = useState();
      const [emissionData1, setEmissionData1] = useState();
      const [emissionData2, setEmissionData2] = useState();

    useEffect(()=> {
       const fetchData= async()=> {
          const url = 'http://localhost:8080/nationalcarbonemissions'

          let country = new Map([
            ["finland", new Map()],
            ["malta", new Map()],
            ["morocco", new Map()]
          ]);

         await fetch(url).then((data)=> {
            console.log(data)
            const res = data.json();
            return res
         }).then((res) => {
            console.log(res)

          const emissiondata = [];
          const emissiondata1 = [];
          const emissiondata2 = [];

          for (const val of res) {
            if(val.country === "Finland") {
              console.log("Found data Finland!");
              country.get(getCorrectCountry(val.country)).set(val.year.toString(), val.data);
              emissiondata.push({time:val.year.toString(), data: val.data})
            } else if(val.country === "Malta") {
              console.log("Found data Malta!");
              country.get(getCorrectCountry(val.country)).set(val.year.toString(), val.data);
              emissiondata1.push({time:val.year.toString(), data: val.data})
            } else if(val.country === "Morocco") {
              console.log("Found data Morocco!");
              country.get(getCorrectCountry(val.country)).set(val.year.toString(), val.data);
              emissiondata2.push({time:val.year.toString(), data: val.data})
            }
          }
            setEmissionData(emissiondata);
            setEmissionData1(emissiondata1);
            setEmissionData2(emissiondata2);

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
          data: emissionData,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          parsing: {
            xAxisKey: "time",
            yAxisKey: "data",
          },
        },
        {
            label: 'Antarctic Ice Cores',
            data: emissionData1,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            parsing: {
              xAxisKey: "time",
              yAxisKey: "data",
            },
        },
        {
        label: 'Antarctic Ice Cores',
        data: emissionData2,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        parsing: {
            xAxisKey: "time",
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
