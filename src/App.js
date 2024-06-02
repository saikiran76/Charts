import './App.css';
import CatCount from './Components/CatCount';
import TimeSeriesChart from './Components/TimeChart';

function App() {
  return (
    <div className="App bg-[#0F172A] text-white grid grid-cols-2 grid-rows-2 gap-2 p-4">
      <div className='col-span-1 row-span-1'>
        <CatCount />
      </div>
      <div className='col-span-1 row-span-1'>
        <TimeSeriesChart />
      </div>
      {/* Add other components or content here if needed */}
    </div>
  );
}

export default App;
