import React from 'react';
import Pizza from './pizza';
import pizzaList from '../data/pizzaData';

function PizzaList() {
    return (
        <div className="container my-5">
            <div className="row g-4">
                {pizzaList.map((pizza) => (
                    <div className="col-12 col-md-6 col-lg-4 d-flex" key={pizza.id}>
                        <Pizza pizza={pizza} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PizzaList;
