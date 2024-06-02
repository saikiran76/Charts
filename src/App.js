import './App.css';
import BarChart from './Components/BarChart';
import CatCount from './Components/CatCount';
import AreaChartComponent from './Components/AreaChart';

function App() {
  return (
    <div className='border-[#1B3D58] border-l-[0.25rem] border-r-[0.25rem] border-t-[0.25rem] border-b-[0.25rem] p-[2em] lg:p-[5em] rounded-lg shadow-[#F472B6] shadow-lg bg-[#0F172A] m-2'>
      <h1 className='text-white font-bold m-1'>Alert Category Distribution</h1>
      <div className='flex gap-2 justify-center'>
        <CatCount/>
      </div>
      <div className='mt-10'>
        <h1 className='text-white font-bold m-1'>Severity Over time</h1>
        <AreaChartComponent/>
      </div>
      <div className='mt-4'>
        <h1 className='text-white font-bold m-1'>Categorical Distribution</h1>
        <BarChart/>
      </div>
    </div>
  );
}

export default App;


