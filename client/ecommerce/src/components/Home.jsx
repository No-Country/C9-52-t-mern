import React from 'react'
import CardPromociones from './CardPromociones'
import CardDestacados from './CardDestacados'
import CardOfertas from './CardOfertas'


const Home = () => {
  return (
    <div>
      <p className="text-sm font-medium leading-4 ml-4 my-8">PROMOCIONES</p>
      <div className="flex flex-no-wrap overflow-x-scroll scrolling-touch scrollbar-hide items-start mb-8">
        <CardPromociones />
        <CardPromociones />
        <CardPromociones />
      </div>
      <p className="text-sm font-medium leading-4 ml-4 my-8">DESTACADOS</p>
      <div className="flex flex-col md:flex-row">
        <CardDestacados />
        <CardDestacados />
        <CardDestacados />
      </div>
      <p className="text-sm font-medium leading-4 ml-4 my-8">OFERTAS</p>
      <div className="flex flex-no-wrap overflow-x-scroll scrolling-touch scrollbar-hide items-start mb-8">
        <CardOfertas />
        <CardOfertas />
        <CardOfertas />
      </div>
    </div>
  )
}

export default Home