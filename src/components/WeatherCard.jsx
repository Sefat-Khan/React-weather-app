import useDate from '../utils/useDate';
import {useWeatherState} from './context/WeatherContext';
import Styles from '../styles/WeatherCard.module.css';

export default function WeatherCard() {

    const { temp,
            areaName,
            cityName,
            countryName,
            windSpeed,
            humidity,
            weatherDetails,
            rainChance,
            icon } = useWeatherState();

    const {date, time} = useDate();
    return(
        <div className={Styles.weatherCard}>
            <div className={`${Styles.temp} flex`}>
                <img src={icon} alt=""/>
                <span>{temp}</span>
            </div>
            <div className={`${Styles.location} flex`}>
                <p>{cityName}</p>
                <p>{areaName}</p>
                <p>{countryName}</p>
            </div>
            <div className={`${Styles.timeline} flex`}>
                <p>{date}</p>
                <p>{time}</p>
            </div>
            <div className={`${Styles.weatherInfo} flex`}>
                <div className={`${Styles.windInfo} infoBox`}>
                    <h3 className={Styles.smallHeading}>Wind Speed</h3>
                    <span className={Styles.smallHeading}>{windSpeed}</span>
                </div>
                <div className={`${Styles.humidityInfo} infoBox`}>
                    <h3 className={Styles.smallHeading}>Humidity</h3>
                    <span className={Styles.smallHeading}>{humidity}</span>
                </div>
            </div>
            <div className={`${Styles.weather} flex`}>
                <div className={Styles.rain}>
                    <i className={`material-icons ${Styles.cloud}`}>cloud</i>
                    <p>weather Details</p>
                </div>
                <p>{weatherDetails}</p>
            </div>
            <hr/>
            <div className={`${Styles.rainDetails} flex`}>
                <div className={Styles.rain}>
                    <i className={`material-icons ${Styles.icon}`}>water_drop</i>
                    <p>Rain Chance</p>
                </div>
                <p>{rainChance}</p>
            </div>
        </div>
    )
}