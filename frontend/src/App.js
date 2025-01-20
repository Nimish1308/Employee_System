import logo from './logo.svg';
import './App.css';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router'
import Records from './Records';
import Details from './Details';
import Update from './Update';
import PieChart from './PieChart';

function App() {
  return (
    <BrowserRouter>
    {/* <Home/> */}
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/records' element={<Records />} />
      <Route path='/graph' element={<PieChart />} />
      <Route path='/findbyid/:id' element={<Details />} />
      <Route path='/update/:id' element={<Update />} />
    </Routes>


  </BrowserRouter>
  );
}

export default App;
