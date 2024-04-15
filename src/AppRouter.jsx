import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Page/HomePage'
import SearchPage from './Page/SearchPage'
import PokemonPage from './Page/PokemonPage'

const AppRouter = () => {
  return (
    <>
       <Routes>
         <Route path='/' element={<HomePage />} />
         <Route path='/search' element={<SearchPage />} />
         <Route path='/pokemon/:id' element={<PokemonPage />} />
       </Routes>
    </>
  )
}

export default AppRouter