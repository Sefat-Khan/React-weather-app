
import {StateContextProvider, useWeatherState} from './context/WeatherContext';
import WeatherCard from './WeatherCard';
import MiniCard from './MiniCard';
import '../styles/app.css';
import { useEffect } from 'react';



function App() {

  return (
    <StateContextProvider>
      <div className='container'>
        <MainContent />
        <MiniCard />
      </div>
    </StateContextProvider>
  
  )
}

function MainContent() {
  const {image} = useWeatherState();

  useEffect(() => {
    //set the background style on the body
    document.body.style.background = `url(${image}) no-repeat center center fixed`;
    document.body.style.backgroundSize = 'cover';
  })

  return (
    <div>
        <WeatherCard />
    </div>
  );
}

export default App
