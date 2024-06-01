import { scales } from "chart.js";
import { Data } from "../utils/Data";
import { Chart } from "react-chartjs-2";

const CatChart = () =>{
    const datacollection = [];
    Data.map((item, index)=>datacollection[index] = {
        category: item.event_type,
        value: item.dest_port
    })
    const categories = []
    datacollection.map((cat, index)=>categories[index]={
        label: cat.category
    })
    const data = []
    datacollection.map((val, index)=>data[index]={
        val: val.value
    })
    
    const updatedData = {
        labels: categories,
        datasets:[{
            label:"# categories",
            data: data,
            borderWidth: 2
        }]
    }

    console.log(updatedData);

    // console.log(datacollection)
    return(
        // creating a best possible react chart suitable to visualize a numeric parameter 'rev' based on the several categories in the data (with axis corresponding to each)
        <div className="cat-chart">
            <h1>Cat Chart</h1>
            <Chart
            type="bar"
            data={updatedData}/>
            </div>
        )
};

export default CatChart;
            
    