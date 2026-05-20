import React from 'react';

function Pizza({ pizza }) {
    // Correct image paths to use the 'image' directory instead of 'images'
    const pizzaImg = pizza?.imageUrl ? pizza.imageUrl.replace('./images', './image').replace('images/', 'image/') : '';

    return (
        <div className="card h-100 border border-light-subtle rounded-3 shadow-sm bg-white">
            <div className="overflow-hidden">
                <img 
                    src={pizzaImg} 
                    className="card-img-top object-fit-cover w-100" 
                    alt={pizza?.name}
                    style={{ height: '220px' }}
                    onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop';
                    }}
                />
            </div>
            <div className="card-body d-flex flex-column p-4">
                <h5 className="card-title fw-bold text-dark mb-2">{pizza?.name}</h5>
                <p className="card-text text-muted flex-grow-1 mb-4" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                    {pizza?.description}
                </p>
                <div className="mt-auto align-self-start">
                    <button className="btn btn-secondary px-3 py-2 text-white" style={{ backgroundColor: '#5c6f84', border: 'none', borderRadius: '5px', fontSize: '0.85rem' }}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Pizza;

