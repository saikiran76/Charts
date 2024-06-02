import './App.css';
import BarChart from './Components/BarChart';
import CatCount from './Components/CatCount';
import AreaChartComponent from './Components/AreaChart';
import Dashboard from './Components/Dashes';
// import HeatmapChart from './Components/HeatMap';
import CategoryChart from './Components/SubBarChart';

function App() {
  return (
    <div className='border-[#1B3D58] border-l-[0.25rem] border-r-[0.25rem] border-t-[0.25rem] border-b-[0.25rem] p-[2em] lg:p-[5em] rounded-lg shadow-[#F472B6] shadow-lg bg-[#0F172A] m-2 font-poppins'>
      <Dashboard/>
      <h1 className='text-white font-bold m-1'>Distribution of Categories of Alert</h1>
      <div className='flex gap-2 justify-center'>
        <CatCount/>
      </div>
      <div className='mt-10'>
        <h1 className='text-white font-bold m-1'>Severity Over time (Time in Hour & Minute Format)</h1>
        <AreaChartComponent/>
      </div>
      <div className='mt-4'>
        <h1 className='text-white font-bold m-1'>Categorical Distribution</h1>
        <BarChart/>
      </div>
      {/* <HeatmapChart/> */}
      <CategoryChart/>
    </div>
  );
}

export default App;


