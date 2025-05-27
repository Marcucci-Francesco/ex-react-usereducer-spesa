import React from 'react'
import { useState } from 'react';

const Main = () => {

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const [addedProducts, setAddedProducts] = useState([]);
  console.log(addedProducts);


  const addToCart = (product) => {
    const isProductAlreadyAdded = addedProducts.some(p => p.name === product.name);
    if (isProductAlreadyAdded) {
      return;
    }
    setAddedProducts(curr => [...curr, {
      ...product,
      quantity: 1
    }])
  }

  return (
    <main>
      <div className='container my-4'>
        <h1 className='text-danger mb-4'>Lista della spesa</h1>
        <ul>
          {products.map((p, i) => {
            return (
              <li key={i} className='my-4'>
                <p>{p.name}: {p.price.toFixed(2)}€</p>
                <button className='btn btn-primary' onClick={() => addToCart(p)}>Aggiungi al carrello</button>
              </li>
            )
          })}
        </ul>
      </div>
      {addedProducts.length > 0 && (
        <>
          <div className='container my-5'>
            <h1 className='text-danger'>Prodotti aggiunti al carrello</h1>
            <ul>
              {addedProducts.map((p, i) => {
                return (
                  <li key={i}>
                    <p>{p.quantity} x {p.name} ({p.price}€)</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </>
      )}

    </main>
  )
}

export default Main