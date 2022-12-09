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

function getCorrectSummarySeries(summarySeries) {
  if(summarySeries === "HADCRUT_GLOBAL") return "global";
  else if(summarySeries === "HADCRUT_NORTHERN_HEMISPHERE") return "northern";
  else if(summarySeries === "HADCRUT_SOUTHERN_HEMISPHERE") return "southern";
  else return "";
}

const config = {
  scales: {
    x: {
      type: "time"
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
          {
            label: 'Dataset 2',
            data:[],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(25, 90, 13, 0.5)',
          }
        ]
      });
      const [v1globalannual, setv1Globalannual] = useState();
      const [v1globalmonthly, setv1Globalmonthly] = useState();
      const [v1globalannualnorth, setv1Globalannualnorth] = useState();
      const [v1globalmonthlynorth, setv1Globalmonthlynorth] = useState();
      const [v1globalannualsouth, setv1Globalannualsouth] = useState();
      const [v1globalmonthlysouth, setv1Globalmonthlysouth] = useState();
      const [tempReconstruction, settempReconstruction] = useState();

    useEffect(()=> {
       const fetchData= async()=> {
          const url = 'http://localhost:8080/hadcrutdata'
          const url2 = 'http://localhost:8080/mobergdata'
          
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

          const globalannual = [];
          const globalmonthly = [];
          const globalannualnorth = [];
          const globalmonthlynorth = [];
          const globalannualsouth = [];
          const globalmonthlysouth = [];

            for (const val of res) {
              if(val.summarySeries === "HADCRUT_GLOBAL"){
                if(val.month === 0) {
                  console.log("Found data for annual!");
                  anual.get(getCorrectSummarySeries(val.summarySeries)).set(val.year.toString(), val.data);
                  globalannual.push({time:val.year.toString(), data: val.data})
                } else {
                  console.log("Found data for monthly!");
                  monthly.get(getCorrectSummarySeries(val.summarySeries)).set(val.year.toString() + "-" + val.month.toString().padStart(2,"0")+ "-01", val.data);
                  globalmonthly.push({time:val.year.toString() + "-" + val.month.toString().padStart(2,"0")+ "-01", data: val.data})
                }
              } else if (val.summarySeries === "HADCRUT_NORTHERN_HEMISPHERE"){
                if(val.month === 0) {
                  console.log("Found data for annual!");
                  anual.get(getCorrectSummarySeries(val.summarySeries)).set(val.year.toString(), val.data);
                  globalannualnorth.push({time:val.year.toString(), data: val.data})
                } else {
                  console.log("Found data for monthly!");
                  monthly.get(getCorrectSummarySeries(val.summarySeries)).set(val.year.toString() + "-" + val.month.toString().padStart(2,"0")+ "-01", val.data);
                  globalmonthlynorth.push({time:val.year.toString() + "-" + val.month.toString().padStart(2,"0")+ "-01", data: val.data})
                }
            } else if (val.summarySeries === "HADCRUT_SOUTHERN_HEMISPHERE"){
              if(val.month === 0) {
                console.log("Found data for annual!");
                anual.get(getCorrectSummarySeries(val.summarySeries)).set(val.year.toString(), val.data);
                globalannualsouth.push({time:val.year.toString(), data: val.data})
              } else {
                console.log("Found data for monthly!");
                monthly.get(getCorrectSummarySeries(val.summarySeries)).set(val.year.toString() + "-" + val.month.toString().padStart(2,"0")+ "-01", val.data);
                globalmonthlysouth.push({time:val.year.toString() + "-" + val.month.toString().padStart(2,"0")+ "-01", data: val.data})
              }
        }}
            setv1Globalannual(globalannual);
            setv1Globalmonthly(globalmonthly);
            setv1Globalannualnorth(globalannualnorth);
            setv1Globalmonthlynorth(globalmonthlynorth);
            setv1Globalannualsouth(globalannualsouth);
            setv1Globalmonthlysouth(globalmonthlysouth);
          }).catch(e => {
              console.log("error", e)
          })

        await fetch(url2).then((data)=> {
            console.log(data)
            const res = data.json();
            return res
         }).then((res) => {
          console.log(res)

          const temp = [];

          for (const val of res) {
           temp.push({time: val.year.toString(), data: val.data});
          }
          settempReconstruction(temp);
        }).catch(e => {
            console.log("error", e)
        })


        }
        
        fetchData();
    },[])


    let graphDataSets = {
      datasets: [
        {
          label: 'Monthly - Global',
          data: v1globalmonthly,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          parsing: {
            xAxisKey: "time",
            yAxisKey: "data",
          },
        },
        {
          label: 'Monthly - Northern',
          data: v1globalmonthlynorth,
          fill: false,
          borderColor: 'rgb(0, 234, 255)',
          tension: 0.1,
          parsing: {
            xAxisKey: "time",
            yAxisKey: "data",
          }
        },
        {
          label: 'Monthly - Southern',
          data: v1globalmonthlysouth,
          fill: false,
          borderColor: 'rgb(0, 0, 255)',
          tension: 0.1,
          parsing: {
            xAxisKey: "time",
            yAxisKey: "data",
          }
        },
        {
          label: 'Annual - Global',
          data: v1globalannual,
          fill: false,
          borderColor: 'rgb(255, 192, 192)',
          tension: 0.1,
          parsing: {
            xAxisKey: "time",
            yAxisKey: "data",
          }
        },
        {
          label: 'Annual - Northern',
          data: v1globalannualnorth,
          fill: false,
          borderColor: 'rgb(0, 234, 255)',
          tension: 0.1,
          parsing: {
            xAxisKey: "time",
            yAxisKey: "data",
          }
        },
        {
          label: 'Annual - Southern',
          data: v1globalannualsouth,
          fill: false,
          borderColor: 'rgb(0, 0, 255)',
          tension: 0.1,
          parsing: {
            xAxisKey: "time",
            yAxisKey: "data",
          }
        },
        {
          label: 'Northern Hemisphere 2,000-year temperature reconstruction',
          data: tempReconstruction,
          fill: false,
          borderColor: 'rgb(0, 234, 255)',
          tension: 0.1,
          parsing: {
            xAxisKey: "time",
            yAxisKey: "data",
          }
        }
      ]
    }
   
    return(
      <div>
        <div style={{width:'50%', height:'10%'}}>
            <div><Line options={config} data={graphDataSets}/></div>
        </div>
        <p>Lähde: </p>
        <p><a href="https://www.metoffice.gov.uk/hadobs/hadcrut5/">HadCRUT5</a></p>
        <p><a href="https://www.nature.com/articles/nature03265">nature.com</a></p>
      </div>
         )
}
