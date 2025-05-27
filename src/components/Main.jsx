import React from 'react'
import { useState, useReducer } from 'react';

const Main = () => {

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const [addedProducts, dispatchCart] = useReducer(cartReducer, []);

  function cartReducer(addedProducts, action) {
    switch (action.type) {
      case 'ADD_ITEM':
        const addedProduct = addedProducts.find(p => p.name === action.payload.name)
        if (addedProduct) {
          action.payload.quantity = addedProduct.quantity + 1;
        } else {
          return [...addedProducts, {
            ...action.payload,
            quantity: 1
          }]
        }
      case 'UPDATE_QUANTITY':
        if (action.payload.quantity < 1 || isNaN(action.payload.quantity)) {
          return addedProducts;
        }
        return addedProducts.map(p => p.name === action.payload.name ? { ...p, quantity: action.payload.quantity } : p);
      case 'REMOVE_ITEM':
        return addedProducts.filter(p => p.name !== action.payload);
      default:
        return state;
    }
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
                <button className='btn btn-primary' onClick={() => dispatchCart({ type: 'ADD_ITEM', payload: p })}>Aggiungi al carrello</button>
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
                      <input type="number" value={p.quantity} onChange={e => dispatchCart({
                        type: 'UPDATE_QUANTITY',
                        payload: { name: p.name, quantity: parseInt(e.target.value) }
                      })}
                      />
                      <span>{p.name} ({p.price.toFixed(2)}€)</span>
                    </p>
                    <button className='btn btn-danger mb-4' onClick={() => dispatchCart({ type: 'REMOVE_ITEM', payload: p.name })}>Rimuovi dal carrello</button>
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