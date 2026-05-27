import React, { useState } from 'react';
import NavBar from './components/NavBar';
import MyCarousel from './components/MyCarousel';
import PizzaList from './components/pizzaList';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [activeTab, setActiveTab] = useState('home');

    // Function to dynamically render the active view component
    const renderActiveComponent = () => {
        switch (activeTab) {
            case 'home':
                return (
                    <>
                        {/* Promotional Banner Carousel */}
                        <MyCarousel />
                        {/* Pizza List Grid matching the sample */}
                        <PizzaList />
                    </>
                );
            case 'about':
                return <About />;
            case 'contact':
                return <Contact />;
            default:
                return (
                    <>
                        <MyCarousel />
                        <PizzaList />
                    </>
                );
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            {/* Sleek Full-Width Sticky Header */}
            <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Dynamic View Injection */}
            <main className="flex-grow-1">
                {renderActiveComponent()}
            </main>

            {/* Persistent Footer Canned inside Container */}
            <div className="container">
                <Footer 
                    id="DE191102"
                    name="LinhPH"
                    email="benphilip11234@gmail.com"
                    githublink="https://github.com/PhanHuuLinh/FER202-_SU26_LinhPH"
                />
            </div>
        </div>
    );
}

export default App;