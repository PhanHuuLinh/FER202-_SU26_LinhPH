import React from 'react';

function About() {
    return (
        <div className="container py-5 bg-white rounded-3 shadow-sm px-4 px-md-5 mb-5 border border-light-subtle animate__animated animate__fadeIn">
            <div className="row align-items-center">
                <div className="col-lg-6 mb-4 mb-lg-0">
                    <span className="badge mb-3 text-white px-3 py-2" style={{ backgroundColor: '#ff385c', fontSize: '0.8rem' }}>OUR STORY</span>
                    <h2 className="fw-bold mb-4 text-dark" style={{ fontSize: '2.5rem', letterSpacing: '-0.5px' }}>Crafting Pizza Perfection Since 2012</h2>
                    <p className="text-muted leading-relaxed mb-4" style={{ fontSize: '1.02rem', lineHeight: '1.8' }}>
                        Welcome to <strong>Slice & Dice</strong>, where authentic culinary traditions meet modern taste. Our journey began with a simple passion: to serve the most delicious, hand-stretched, wood-fired pizzas using only the finest ingredients.
                    </p>
                    <p className="text-muted leading-relaxed mb-4" style={{ fontSize: '1.02rem', lineHeight: '1.8' }}>
                        Every pizza is created as a masterpiece, from our slow-fermented organic sourdough crusts to our rich San Marzano tomato sauce and locally sourced premium toppings. We believe in high quality, outstanding service, and the joy of sharing great food.
                    </p>
                    <div className="d-flex gap-4 mt-5">
                        <div>
                            <h4 className="fw-bold text-dark mb-1" style={{ fontSize: '1.8rem' }}>100%</h4>
                            <p className="text-muted small mb-0">Organic Flour</p>
                        </div>
                        <div className="border-start ps-4">
                            <h4 className="fw-bold text-dark mb-1" style={{ fontSize: '1.8rem' }}>48 Hours</h4>
                            <p className="text-muted small mb-0">Slow Dough Ferment</p>
                        </div>
                        <div className="border-start ps-4">
                            <h4 className="fw-bold text-dark mb-1" style={{ fontSize: '1.8rem' }}>450°C</h4>
                            <p className="text-muted small mb-0">Wood-Fired Oven</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <img 
                        src="https://images.unsplash.com/photo-1579751626657-72bc17010498?q=80&w=800&auto=format&fit=crop" 
                        alt="Pizza Chef cooking in wood oven" 
                        className="img-fluid rounded-3 shadow-sm object-fit-cover w-100" 
                        style={{ height: '400px' }}
                    />
                </div>
            </div>
        </div>
    );
}

export default About;
