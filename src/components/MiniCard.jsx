import useDate from '../utils/useDate';
import Styles from '../styles/WeatherCard.module.css';
import {useWeatherState} from './context/WeatherContext';

export default function WeatherCard() {

    const {forecast} = useWeatherState();

    const {day} = useDate();
    return(
        <div id="weeklyForCast" className="weeklyForCast">
            {forecast.map((dayData, index) => (
                <div key={index} className={`${Styles.weatherCard} ${Styles.miniCard}`}>
                <h4>{day}</h4>
                <hr/>
                <img src={dayData.icon} alt="${day.day.condition.text}"/>
                <span>{dayData.maxTemp}°C / {dayData.minTemp}°C</span>
            </div>
            ))}
            
        </div>
        
    )
}