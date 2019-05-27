import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const[countries, updateCountries] = useState([]);

  useEffect(() => {
    axios.get('/countries') // next page => ?page=2
    .then((response) => {
      console.log(response.data);
      updateCountries(response.data.data);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>List of countries</h1>
        <ul>
          {countries.map(countrie => {
            return <li key={countrie} className='list'>{countrie}</li>
          })}
        </ul>
      </header>
    </div>
  );
}

export default App;
