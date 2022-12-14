import { useEffect, useState } from 'react';
import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJs.register(
  Tooltip, Title, ArcElement, Legend
);


const data = {
    datasets: [{
        data: [10, 20, 30],
        backgroundColor:[
          'red',
          'blue',
          'yellow'
        ]
    },
  ],

  labels: [
      'Red',
      'Yellow',
      'Blue'
  ], 
};
export default function Visualisointi9() {
  const [data, setData] = useState({
    datasets: [{
        data: [10, 20, 30],
        backgroundColor:[
          'red',
          'blue',
          'yellow'
        ]
    },
  ],
  labels: [
      'Red',
      'Yellow',
      'Blue'
  ], 
});
  useEffect(()=> {
    const fetchData = () =>  {
      fetch('http://localhost:8080/globalghg').then((data) => {
        const res = data.json();
        return res
      }).then((res) => {
        console.log("resss", res)
        const label = [];
        const data = [];
        for(var i of res) {
            label.push(i.country);
            data.push(i.greenhouseGas)
        }
        setData(
          {
            datasets: [{
                data:data,
                backgroundColor:[
                  'red',
                  'blue',
                  'yellow'
                ]
            },
          ],
          labels:label, 
        }
        )

      }).catch(e => {
        console.log("error", e)
      }) 
    }
  fetchData();
  }, [])
  return (
    <div className="App" style={{width:'30%', height:'30%'}}>
      <Doughnut data={data}/>
    </div>
  );
}
