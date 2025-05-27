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

  const updateProductQuantity = (name, quantity) => {
    if (quantity < 1 || isNaN(quantity)) {
      return;
    }
    setAddedProducts(curr => curr.map(p => p.name === name ? { ...p, quantity } : p));
  }

  const addToCart = (product) => {
    const addedProduct = addedProducts.find(p => p.name === product.name);
    if (addedProduct) {
      updateProductQuantity(addedProduct.name, addedProduct.quantity + 1);
      return;
    }
    setAddedProducts(curr => [...curr, {
      ...product,
      quantity: 1
    }])
  }

  const remuveFromCart = (product) => {
    setAddedProducts(curr => curr.filter(p => p.name !== product.name));
  }

  const totalPrice = addedProducts.reduce((acc, p) => acc + (p.price * p.quantity), 0);

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
                    <p>
                      <input type="number" value={p.quantity} onChange={e => updateProductQuantity(p.name, parseInt(e.target.value))} />
                      <span>{p.name} ({p.price.toFixed(2)}€)</span>
                    </p>
                    <button className='btn btn-danger mb-4' onClick={() => remuveFromCart(p)}>Rimuovi dal carrello</button>
                  </li>
                )
              })}
            </ul>
            <h3>Totale da pagare: {totalPrice.toFixed(2)}€</h3>
          </div>
        </>
      )}

    </main>
  )
}

export default Main