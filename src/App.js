import React from 'react';
import Info from './components/info';
import Form from './components/form';
import Weather from './components/weather';
import { async } from 'q';

const API_KEY = "9cc13cad091c7b137e9f92303ce37b72";
 
class App extends React.Component{
   
    state = {
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: undefined,
    }

    gettingWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        
        
        if(city){
            const api_url = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city }&appid=${API_KEY}`);
            const data = await api_url.json();

            var sunset = data.sys.sunset;
            var date = new Date();
            date.setTime(sunset);
            var sunset_date = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(); 

            this.setState({
                temp: data.main.temp,
                city:data.name,
                country: data.sys.country,
                pressure: data.main.pressure,
                sunset: sunset_date,
                error: undefined 
    
            });
        } else {
            this.setState({
                temp: undefined,
                city: undefined,
                country: undefined,
                sunrise: undefined,
                sunset: undefined,
                error: "Ошибка, введите название города",
    
            });

        }
        
    }
    render(){
        return(
            <div>
                <Info />
                <Form weatherMethod={this.gettingWeather} />
                <Weather 
                    temp={this.state.temp}
                    city={this.state.city}
                    country={this.state.country}
                    pressure={this.state.pressure}
                    sunset={this.state.sunset}
                    error={this.state.error}

                 />
            </div>
        );
    }
}

export default App;