import { LineChart, Line ,CartesianGrid, XAxis, YAxis} from 'recharts';
import axios from 'axios';
import { useState
 } from 'react';
import { useEffect } from 'react';


export default function LineGraph() {


    const [data, setData] = useState([]);

    axios.get('http://fetest.pangeatech.net/data')
    .then(response => setData(response.data))
    .catch(error => {
        console.log('There was an error',error);
    })

    // const graphData = data.map(data => data.acv,data.product,data.month);
            // set(filter);
    const sch1Data = data.filter((d) => {
        return d.product === "Product - 17";
      });
      const sch2Data = data.filter((d) => {
        return d.product === "Product - 32";
      });

      const finalGraphData = sch1Data.map((d, index) => {
        const sch2CurrentData = sch2Data.find((d2) => d.month === d2.month);
    
        const finalData = {
          ...d,
          sch_1: d.acv,
          sch_2: sch2CurrentData?.acv
        };
        return finalData;
      });

      

    return(

        <LineChart width={1200} height={600} data={finalGraphData}>
        <XAxis dataKey="month" allowDuplicatedCategory={false} />
        <YAxis dataKey = "acv" />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
        <Line type="monotone" dataKey="sch_1" stroke="#8884d8" />
        <Line type="monotone" dataKey="sch_2" stroke="#82ca9d" />
      </LineChart>
 

   
    )
}