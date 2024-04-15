import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import CardComponent from '../component/CardComponent';

const SearchPage = () => {

  const [search, setSearch] = useState('');
  const [globalPokemons, setGlobalPokemons] = useState([]);


  const getGlobalPokemons = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');

      const data = await response.data;

      const promises = data.results.map(async pokemon => {
        const pResponse = await axios.get(pokemon.url)
        const pData = pResponse.data;

        return pData;
      })

      const results = await Promise.all(promises)

      setGlobalPokemons(results)

    }
    catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getGlobalPokemons()
  },[])

  const filteredPokemons = globalPokemons.filter(item => (
    item.name.toLowerCase().includes(search.toLowerCase())
  ));

  console.log();


  return (
    <div>
      <header className='flex items-center justify-around bg-slate-800 rounded-b flex-col md:flex-row gap-4 p-5 h-48 md:h-28'>
        <div>
          <NavLink to={'/'}>
            <h1 className='text-white font-bold text-4xl'>Romario Pokedex</h1>
          </NavLink>
        </div>
        <div>
          <input 
          type="text" 
          placeholder='Ingresa tu Pokemon' 
          className='rounded p-1 outline-none'
          onChange={(e) => setSearch(e.target.value)} />
        </div>
      </header>
      <main className='w-[90%] h-[85vh] flex flex-col justify-around mx-auto'>
        {
          filteredPokemons.slice(0, 5).map(pokemon => (
            <CardComponent
            name={pokemon.name}
            id={pokemon.id}
            img={pokemon.sprites.other.dream_world.front_default}
            types={pokemon.types.map(item => item.type.name + " ")} />
          ))
        }
      </main>
    </div>
  )
}

export default SearchPage
