import React, { useState, useEffect, useRef } from 'react';
import banners from '../data/bannerData';

function MyCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const timerRef = useRef(null);

    // Function to move to the next slide
    const nextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    // Function to move to the previous slide
    const prevSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
    };

    // Start auto slide timer
    const startTimer = () => {
        stopTimer();
        timerRef.current = setInterval(nextSlide, 4000); // changes slide every 4 seconds
    };

    // Stop auto slide timer
    const stopTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    useEffect(() => {
        if (!isHovered) {
            startTimer();
        } else {
            stopTimer();
        }

        // Cleanup on unmount or hover state change
        return () => stopTimer();
    }, [isHovered, activeIndex]);

    return (
        <div 
            className="carousel slide carousel-fade custom-carousel"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ position: 'relative' }}
        >
            {/* Carousel Indicators / Dots */}
            <div className="carousel-indicators custom-carousel-indicators">
                {banners.map((banner, index) => (
                    <button
                        key={banner.id}
                        type="button"
                        className={index === activeIndex ? "active" : ""}
                        aria-current={index === activeIndex ? "true" : "false"}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => setActiveIndex(index)}
                    ></button>
                ))}
            </div>

            {/* Carousel Slides */}
            <div className="carousel-inner">
                {banners.map((banner, index) => (
                    <div
                        key={banner.id}
                        className={`carousel-item ${index === activeIndex ? "active" : ""}`}
                    >
                        <img
                            src={banner.imageURL}
                            className="carousel-img"
                            alt={banner.title}
                            onError={(e) => {
                                e.target.onerror = null; // Prevent infinite error loops!
                                const backups = [
                                    'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop',
                                    'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1200&auto=format&fit=crop',
                                    'https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=1200&auto=format&fit=crop'
                                ];
                                e.target.src = backups[index % backups.length];
                            }}
                        />
                        <div className="custom-carousel-caption">
                            <h3 className="animate__animated animate__fadeInUp">{banner.title}</h3>
                            <p className="animate__animated animate__fadeInUp animate__delay-1s">{banner.caption}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Controls */}
            <button
                className="carousel-control-prev custom-carousel-control"
                type="button"
                onClick={prevSlide}
                style={{ left: '15px' }}
            >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next custom-carousel-control"
                type="button"
                onClick={nextSlide}
                style={{ right: '15px' }}
            >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default MyCarousel;
