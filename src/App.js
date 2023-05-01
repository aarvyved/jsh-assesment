import './App.css';
import RoverList from './components/RoverList';
import RoverDetail from './components/RoverDetail';
import { useEffect, useState } from 'react';
import api from './api'
import { RoversContext } from './contexts';
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header';

function App() {
  const [rovers, setRovers] = useState([]);
  const [selectedRover, setSelectedRover] = useState(null);

  useEffect(() => {
    const getRoverData = async () => {
      const resp = await api.getRovers();
      setRovers(resp)
    }
    getRoverData();
  }, [])


  return (
    <div className="App">
      <Header />
      <RoversContext.Provider value={{ rovers, selectedRover, setSelectedRover }}>
        <Routes>
          <Route path="/" element={<RoverList />} />
          <Route path="/rover-detail" element={<RoverDetail />} />
        </Routes>
      </RoversContext.Provider>
    </div>
  );
}

export default App;
