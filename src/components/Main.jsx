import React from 'react'

const Main = () => {

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];





  return (
    <main>
      <div className='container my-4'>
        <h1 className='text-danger mb-4'>Lista della spesa</h1>
        <ul>
          {products.map((p, i) => {
            return (
              <li key={i} className='my-2'>
                {p.name}: {p.price.toFixed(2)}€
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  )
}

export default Main