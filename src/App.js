import React from 'react';
import Info from './components/info';
import Form from './components/form';
import Weather from './components/weather';
import { async } from 'q';

const API_KEY = "9cc13cad091c7b137e9f92303ce37b72";
 
class App extends React.Component{
   
    gettingWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const api_url = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city }&appid=${API_KEY}`);
        const data = await api_url.json();
        console.log(data);
    }
    render(){
        return(
            <div>
                <Info />
                <Form weatherMethod={this.gettingWeather} />
                <Weather />
            </div>
        );
    }
}

export default App;