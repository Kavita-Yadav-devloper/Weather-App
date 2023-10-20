import React, { useEffect, useState } from 'react'
import './style.css'
import WeatherCards from './weathercards' 

const Temps = () => {
    const [searchValue , setSearchValue] = useState('pune');
    const [tempInfo , setTempInfo] = useState({});
    const getweatherInfo = async()=>{
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=2233f8406f8b5edd83d8a45a007b145c`
            let res = await fetch(url)
            let data =await res.json()

            const { temp , humidity ,pressure} = data.main;
            const {main:weathermood} = data.weather[0];
             const {name} = data;
             const {speed} =data.wind;
             const{ country , sunset} = data.sys;

             const myNewWeatherInfo ={
                temp , humidity , pressure ,weathermood,name,country,speed,sunset,
             }
             setTempInfo(myNewWeatherInfo)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getweatherInfo()
    },[])
  return (
    <>
    <div className='wrap'>
        <div className='search'>
       <input type='search' placeholder='Search...' autoFocus id='search' className='searchTerm'
       value={searchValue } onChange={ (e)=>setSearchValue(e.target.value)}/>
       <button className='searchButton' onClick={getweatherInfo}>Search</button>
        </div>
    </div>  

   <WeatherCards tempInfo={tempInfo}/>
    </>
  )
}

export default Temps
