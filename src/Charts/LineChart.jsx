import React from 'react';
import {Line} from "react-chartjs-2";
// import "./LineChart.css";

function LineChart() {
 const data= {
        labels: ["January", "February", "March"],
        datasets: [
          {
        label: 'My First dataset',
        // backgroundColor: 'rgb(255, 99, 132)',
        // borderColor: 'rgb(255, 99, 132)',
        data: [10, 5, 2],
        }
      ]
    }

  return (
  <div className='linechart'>
    <p>Hello world</p>
<Line  data={data} />
  </div>
  )
}

export default LineChart;
