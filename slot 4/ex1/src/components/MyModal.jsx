import React from 'react';
import ReactDOM from 'react-dom';

function MyModal({ show, onClose, title, children }) {
    if (!show) return null;

    return ReactDOM.createPortal(
        <div 
            className="modal-overlay" 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(15, 23, 42, 0.65)',
                backdropFilter: 'blur(5px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1050,
                padding: '1rem',
                transition: 'all 0.3s ease'
            }}
            onClick={onClose} // Close modal when clicking on the backdrop
        >
            <div 
                className="modal-dialog w-100 shadow-lg" 
                style={{ 
                    maxWidth: '550px', 
                    backgroundColor: '#fff', 
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    animation: 'zoomIn 0.3s ease'
                }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                {/* Modal Header */}
                <div className="modal-header d-flex justify-content-between align-items-center px-4 py-3 border-bottom border-light-subtle bg-light">
                    <h5 className="modal-title fw-bold text-dark mb-0 fs-5">{title}</h5>
                    <button 
                        type="button" 
                        className="btn-close shadow-none border-0" 
                        aria-label="Close"
                        onClick={onClose}
                        style={{ cursor: 'pointer' }}
                    ></button>
                </div>

                {/* Modal Body */}
                <div className="modal-body p-4" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                    {children}
                </div>

                {/* Modal Footer */}
                <div className="modal-footer px-4 py-3 border-top border-light-subtle bg-light d-flex justify-content-end">
                    <button 
                        type="button" 
                        className="btn px-4 py-2 text-white border-0 fw-semibold" 
                        onClick={onClose}
                        style={{ backgroundColor: '#ff385c', borderRadius: '8px', fontSize: '0.9rem' }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default MyModal;
