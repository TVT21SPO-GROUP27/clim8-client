import {bar, Line, Pie} from 'react-chartjs-2';
import { Chart as ChartJs } from 'chart.js';

export default function EkaVisualisointi() {
    
    const [chartData, setchartData] = useState({
        labels: climate.map(d => d.year),
        datasets: [
            {
                label: "Climate",

            }
        ]
    })

    return (
        <div style={{display 'flex', alingItems: 'center', flexWrap: 'wrap'}}>
            <div><Line data={chartData}/></div>
        </div>
    )
}
