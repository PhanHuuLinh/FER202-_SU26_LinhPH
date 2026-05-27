import React from 'react';

function NavBar({ activeTab, setActiveTab }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top shadow-sm px-4 py-3" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderBottom: '2px solid #ff385c', zIndex: '1000' }}>
            <div className="container-fluid" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <span className="navbar-brand fw-bold fs-3 d-flex align-items-center" style={{ cursor: 'pointer', color: '#ff385c', letterSpacing: '-0.5px' }} onClick={() => setActiveTab('home')}>
                    🍕 <span className="text-white ms-2">PIZZA NGON</span>
                </span>
                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav gap-2 mt-3 mt-lg-0">
                        <li className="nav-item">
                            <button 
                                className={`nav-link btn px-4 py-2 fw-semibold text-start border-0 ${activeTab === 'home' ? 'text-white' : 'text-secondary'}`}
                                onClick={() => setActiveTab('home')}
                                style={{
                                    backgroundColor: activeTab === 'home' ? '#ff385c' : 'transparent',
                                    color: activeTab === 'home' ? '#fff' : '#94a3b8',
                                    borderRadius: '8px',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                            >
                                Home
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className={`nav-link btn px-4 py-2 fw-semibold text-start border-0 ${activeTab === 'about' ? 'text-white' : 'text-secondary'}`}
                                onClick={() => setActiveTab('about')}
                                style={{
                                    backgroundColor: activeTab === 'about' ? '#ff385c' : 'transparent',
                                    color: activeTab === 'about' ? '#fff' : '#94a3b8',
                                    borderRadius: '8px',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                            >
                                About Us
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className={`nav-link btn px-4 py-2 fw-semibold text-start border-0 ${activeTab === 'contact' ? 'text-white' : 'text-secondary'}`}
                                onClick={() => setActiveTab('contact')}
                                style={{
                                    backgroundColor: activeTab === 'contact' ? '#ff385c' : 'transparent',
                                    color: activeTab === 'contact' ? '#fff' : '#94a3b8',
                                    borderRadius: '8px',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                            >
                                Contact
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
