import React, { useEffect, useState } from 'react'
import CardComponent from './CardComponent'
import axios from 'axios'
import { NavLink } from 'react-router-dom';
// import SearchBarComponent from './SearchBarComponent';

const CatalogoComponent = () => {

  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pokemonLimit, setPokemonLimit] = useState(40);

  const getPokemonData = async (url) => {
    try {
      const response = await axios.get(url);
      const data = await response.data;

      return data;
    }
    catch (err) {
      console.log('Ocurrio un errorr este es: '+ err);
    }
  };

  const getAllPokemons = async (limit=40) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=$0`);
      const pokemonDataArray = await Promise.all(response.data.results.map(result => getPokemonData(result.url)));
      setPokemon(pokemonDataArray);
      setLoading(false)
      
    }
    catch(err) {
      console.log('Ocurrio un error: ' + err);
    }
  };

  useEffect(() => {
    getAllPokemons(pokemonLimit)
  }, [pokemonLimit]);
  
  if(loading) {
    return <p className='text-2xl h-screen flex justify-center items-center'>Loading ...</p>
  };
  
  return (
    <div>
      <header className='flex items-center justify-around bg-slate-800 rounded-b flex-col md:flex-row gap-4 p-5 h-48 md:h-28'>
        <div>
          <h1 className='text-white font-bold text-4xl'>Romario Pokedex</h1>
        </div>
        <NavLink to={'/search'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white hover:bg-white hover:text-black border rounded w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </NavLink>
      </header>
      

      <div className='grid grid-cols-2 lg:grid-cols-3 gap-8 w-[95%] mx-auto my-8'>
        {
          pokemon.map(item => (
            <article key={item.id}>
              <CardComponent 
              name={item.name}
              id={item.id}
              img={item?.sprites.versions?.["generation-v"]["black-white"].animated?.front_default ?? pokemon?.sprites.front_default}
              types={item.types.map(item => item.type.name + " ")}
              />
            </article>
          ))
        }
        
      </div>
      <span onClick={() => setPokemonLimit(pokemonLimit + 24)} className='text-3xl flex justify-center bg-slate-800 text-white py-3 rounded-t cursor-pointer'>Cargar mas</span>
    </div>
  )
}

export default CatalogoComponent