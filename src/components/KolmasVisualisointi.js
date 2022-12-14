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

  function getCorrectSeries(series) {
    if(series === "DE08") return "de08";
    else if(series === "DE08-2") return "de08-2";
    else if(series === "DSS") return "dss";
    else return "";
  }

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
      text: 'Mauna Loa 1958-2022'
    },
    onClick(e) {
      const chart = e.chart;
      chart.resetZoom();
    }
  }
}
export default function KolmasVisualisointi() {
      const [v3AnnualData, setV3AnnualData] = useState();
      const [v3MonthlyData, setV3MonthlyData] = useState();
      const [v1icecore, setv1IceCore] = useState();
      const [v2icecore, setv2IceCore] = useState();
      const [v3icecore, setv3IceCore] = useState();

    useEffect(()=> {
       const fetchData= async()=> {
          const url = 'http://localhost:8080/maunaloadata'
          const url2 = 'http://localhost:8080/icecoredata'

          let series = new Map([
            ["de08", new Map()],
            ["de08-2", new Map()],
            ["dss", new Map()]
          ]);

         await fetch(url).then((data)=> {
            console.log(data)
            const res = data.json();
            return res
         }).then((res) => {
            console.log(res)

          const annualData = [];
          const monthlyData = [];

            for (const val of res) {
            
                if(val.month === 0) {
                  console.log("Found data for annual!");
                  annualData.push({time:val.year.toString(), data: val.data})
                } else {
                  console.log("Found data for monthly!");
                  monthlyData.push({time:val.year.toString() + "-" + val.month.toString().padStart(2,"0")+ "-01", data: val.data})
                }
              
            }
            setV3AnnualData(annualData);
            setV3MonthlyData(monthlyData);
          }).catch(e => {
              console.log("error", e)
          })

          const icecore1 = [];
          const icecore2 = [];
          const icecore3 = [];

          await fetch(url2).then((data)=> {
            console.log(data)
            const res = data.json();
            return res
         }).then((res) => {
          console.log(res)

          for (const val of res) {
              if(val.series === "DE08") {
                console.log("Found data DE08!");
                series.get(getCorrectSeries(val.series)).set(val.year.toString(), val.data);
                icecore1.push({time:val.year.toString(), data: val.data})
              } else if(val.series === "DE08-2") {
                console.log("Found data DE08-02!");
                series.get(getCorrectSeries(val.series)).set(val.year.toString(), val.data);
                icecore2.push({time:val.year.toString(), data: val.data})
              } else if(val.series === "DSS") {
                console.log("Found data DSS!");
                series.get(getCorrectSeries(val.series)).set(val.year.toString(), val.data);
                icecore3.push({time:val.year.toString(), data: val.data})
              }
            }
            console.log(series);
            setv1IceCore(icecore1);
            setv2IceCore(icecore2);
            setv3IceCore(icecore3);
        }).catch(e => {
          console.log("error", e)
        })
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
        { 
          label: 'DE08 Ice Core Data',
          data: v1icecore,
          fill: false,
          borderColor: 'rgb(255, 192, 192)',
          tension: 0.1,
          parsing: {
            xAxisKey: "time",
            yAxisKey: "data",
          },
        },
        { 
          label: 'DE08-02 Ice Core Data',
          data: v2icecore,
          fill: false,
          borderColor: 'rgb(160, 15, 66)',
          tension: 0.1,
          parsing: {
            xAxisKey: "time",
            yAxisKey: "data",
          },
        },
        { 
          label: 'DSS Ice Core Data',
          data: v3icecore,
          fill: false,
          borderColor: 'rgb(26, 19, 192)',
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
        <div style={{width:'50%', height:'10%'}}>
            <div><Line options={config} data={graphDataSets}/></div>
        </div>
        <p>Source(s): </p>
        <li><a href="https://gml.noaa.gov/ccgg/trends/">Mauna Loa</a></li>
        <ul><p>The graphs show monthly and annual mean carbon dioxide measured at Mauna Loa Observatory, Hawaii. The carbon dioxide data on Mauna Loa constitute the longest record of direct measurements of CO2 in the atmosphere.</p></ul>
      </div>
         )
}
