import React, { useState, useMemo } from 'react';
import MyModal from './MyModal';

function Pizza({ pizza }) {
    const [showModal, setShowModal] = useState(false);

    // Correct image paths to use the 'image' directory instead of 'images'
    const pizzaImg = pizza?.imageUrl ? pizza.imageUrl.replace('./images', './image').replace('images/', 'image/') : '';

    // Generate a fixed random price for each pizza card to avoid flickering on re-renders
    const randomPrice = useMemo(() => {
        // Generates a price between 9.99 and 18.99
        return (Math.random() * (18.99 - 9.99) + 9.99).toFixed(2);
    }, []);

    // Generate a higher original price to simulate a discount
    const originalPrice = useMemo(() => {
        return (parseFloat(randomPrice) * 1.3).toFixed(2);
    }, [randomPrice]);

    return (
        <div className="card h-100 border border-light-subtle rounded-3 shadow-sm bg-white pizza-card position-relative overflow-hidden">
            {/* Dynamic Tag Badge (Sale, Hot, New, Best Seller) */}
            {pizza?.tag && (
                <span 
                    className="position-absolute top-0 start-0 m-3 badge rounded-pill text-white px-3 py-2 shadow"
                    style={{ 
                        zIndex: '5', 
                        fontSize: '0.75rem', 
                        textTransform: 'uppercase', 
                        letterSpacing: '1px',
                        background: pizza.tag === 'Sale' ? 'linear-gradient(45deg, #ff385c, #ff5e3a)' : 
                                    pizza.tag === 'Hot' ? 'linear-gradient(45deg, #f59e0b, #ef4444)' :
                                    pizza.tag === 'New' ? 'linear-gradient(45deg, #10b981, #059669)' : 
                                    'linear-gradient(45deg, #6366f1, #4f46e5)'
                    }}
                >
                    {pizza.tag}
                </span>
            )}

            <div className="overflow-hidden pizza-img-container">
                <img 
                    src={pizzaImg} 
                    className="card-img-top object-fit-cover w-100 pizza-img" 
                    alt={pizza?.name}
                    style={{ height: '220px', transition: 'all 0.5s ease', cursor: 'pointer' }}
                    onClick={() => setShowModal(true)} // Clicking image also triggers View Details Modal!
                    onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop';
                    }}
                />
            </div>
            <div className="card-body d-flex flex-column p-4">
                <h5 className="card-title fw-bold text-dark mb-2" style={{ cursor: 'pointer' }} onClick={() => setShowModal(true)}>
                    {pizza?.name}
                </h5>
                <p className="card-text text-muted flex-grow-1 mb-3" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                    {pizza?.description}
                </p>

                {/* Modern Dynamic Price Tag */}
                <div className="d-flex align-items-center mb-4">
                    <span className="fw-extrabold text-danger fs-4 fw-bold">${randomPrice}</span>
                    {pizza?.tag === 'Sale' && (
                        <span className="text-muted text-decoration-line-through ms-2 small">${originalPrice}</span>
                    )}
                </div>

                <div className="mt-auto align-self-start w-100">
                    <button 
                        className="btn order-btn w-100 py-2.5 text-white fw-bold rounded-2"
                        onClick={() => setShowModal(true)} // Open detailed information Modal
                    >
                        View Details
                    </button>
                </div>
            </div>

            {/* Reusable Common Modal to show full pizza details */}
            <MyModal 
                show={showModal} 
                onClose={() => setShowModal(false)} 
                title={`${pizza?.name} Details`}
            >
                <div className="text-center mb-4">
                    <img 
                        src={pizzaImg} 
                        alt={pizza?.name} 
                        className="img-fluid rounded-3 shadow-sm object-fit-cover w-100" 
                        style={{ height: '260px' }}
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop';
                        }}
                    />
                </div>
                <div className="px-1">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span 
                            className="badge rounded-pill text-white px-3 py-2 shadow-sm"
                            style={{ 
                                fontSize: '0.75rem', 
                                textTransform: 'uppercase', 
                                letterSpacing: '0.5px',
                                background: pizza?.tag === 'Sale' ? 'linear-gradient(45deg, #ff385c, #ff5e3a)' : 
                                            pizza?.tag === 'Hot' ? 'linear-gradient(45deg, #f59e0b, #ef4444)' :
                                            pizza?.tag === 'New' ? 'linear-gradient(45deg, #10b981, #059669)' : 
                                            'linear-gradient(45deg, #6366f1, #4f46e5)'
                            }}
                        >
                            {pizza?.tag || 'Gourmet Selection'}
                        </span>
                        <div className="d-flex align-items-center">
                            <span className="fw-extrabold text-danger fs-4 fw-bold">${randomPrice}</span>
                            {pizza?.tag === 'Sale' && (
                                <span className="text-muted text-decoration-line-through ms-2 small">${originalPrice}</span>
                            )}
                        </div>
                    </div>
                    <p className="text-muted mb-4 fs-6" style={{ lineHeight: '1.7' }}>
                        {pizza?.description}
                    </p>
                    <hr className="my-4 border-light-subtle" />
                    <h6 className="fw-bold text-dark mb-3">👩‍🍳 Ingredients & Recipe Secrets:</h6>
                    <ul className="text-muted small ps-3 mb-0" style={{ lineHeight: '1.8' }}>
                        <li>100% organic sourdough crust aged for 48 hours for rich flavor.</li>
                        <li>Signature house marinara sauce using ripe San Marzano tomatoes.</li>
                        <li>Fresh local mozzarella cheese and extra virgin olive oil drizzle.</li>
                        <li>Hand-tossed and baked at 450°C in our volcanic stone oven.</li>
                    </ul>
                </div>
            </MyModal>
        </div>
    );
}

export default Pizza;
