import { Progress } from '@material-tailwind/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

const PokemonPage = () => {

   const { id } = useParams()
   const [pokemon, setPokemon] = useState(null)

   const getPokemons = async () => {
      try {
         const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
         setPokemon(response.data)
      }
      catch(err) {
         console.log('Ocurrio un error'+err);
      }
   }

   useEffect(() => {
      getPokemons()
   },[])

   console.log(pokemon);


   


  return (
   <div className='text-white'>
      <header className='flex items-center justify-around bg-slate-800 rounded-b flex-col md:flex-row gap-4 p-5 h-48 md:h-28'>
        <NavLink to={'/'}>
         <div className='hover:bg-slate-600 transition rounded p-4 cursor-pointer'>
            <h1 className='text-white font-bold text-4xl'>Romario Pokedex</h1>
         </div>
        </NavLink>
      </header>
      {pokemon && (
         <div className=' bg-slate-700 w-[85%] mx-auto my-7 shadow-[5px_20px_20px_10px_#667eea] rounded-lg p-8'>
            <picture className='flex justify-center mb-5'>
               <img src={pokemon.sprites.other.home.front_default} alt={`${pokemon.name} image`} />
            </picture>
            <div className='flex justify-between items-center'>
               <div className='font-bold'>
                  <h1 className='capitalize text-3xl'>Name: {pokemon.name}</h1>
               </div>
               <div className='flex justify-around w-32'>
                  <span className='text-xl font-bold'>{pokemon.weight}KG</span>
                  <span className='text-xl font-bold'>{pokemon.height}FT</span>
               </div>
               </div>
            <div className='mt-4'>
               <div className='flex'>
               <h2 className='text-xl font-semibold mb-2'>Types:</h2>
                  {pokemon.types.map((type, index) => (
                     <span key={index} className='px-2 py-1 rounded-lg mr-2 capitalize'>
                        {type.type.name}
                     </span>
                  ))}
               </div>
            </div>
            <div className='flex justify-between'>
               <div>
                  <h1 className='text-2xl w-80 my-4'>Stats</h1>
                  <div className='flex flex-col'>
                     {
                        pokemon.stats.map(stat => (
                           <div className='flex justify-between'>
                              <span className='capitalize'>{stat.stat.name}: {stat.base_stat} </span>


                           </div>
                        ))
                     }
                  </div>
               </div>
               <div>
                  <h1 className='text-2xl my-4'>Abilities</h1>
                  <div className='flex flex-col'>
                     {
                        pokemon.abilities.map(ability => (
                           <span className='capitalize'>{ability.ability.name}</span>
                        ))
                     }
                  </div>
               </div>
            </div>
         </div>
      )}
   </div>
  )
}

export default PokemonPage