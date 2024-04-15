import React from 'react'
import { NavLink } from 'react-router-dom'

const CardComponent = ({ id, name, img, types}) => {

  return (
    <>
      <NavLink to={`/pokemon/${id}`}>
         <article className='flex p-4 bg-slate-700 rounded flex-col sm:flex-row shadow-[0px_0px_5px_2px_#667eea] hover:shadow-[0px_0px_8px_5px_#667eea] transition cursor-pointer' id={id}>
            <picture>
               <img className='aspect-video object-contain w-48' src={img} alt={`${name} image`} />
            </picture>
            <div>
               <h1 className='text-2xl font-bold text-white'>Pokemon {name} # {id}</h1>
               <h2 className='font-bold text-white'>
                  Types: 
               </h2>
               <span className='text-white capitalize'>{types}</span>
               <div>

               </div>
            </div>
         </article>
      </NavLink>
    </>
  )
}

export default CardComponent