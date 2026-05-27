import React, { useState } from 'react';

function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // In dữ liệu ra màn hình Console của trình duyệt để kiểm tra
        console.log("=== DỮ LIỆU ĐÃ NHẬN TỪ TRANG CONTACT ===");
        console.log("Họ tên:", formData.name);
        console.log("Email:", formData.email);
        console.log("Chủ đề:", formData.subject);
        console.log("Nội dung tin nhắn:", formData.message);
        console.log("=========================================");

        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div className="container py-5 mb-5 animate__animated animate__fadeIn">
            <div className="row g-5">
                {/* Contact Information Card */}
                <div className="col-lg-5">
                    <div className="p-4 p-md-5 rounded-3 text-white h-100 shadow-sm" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
                        <span className="badge mb-3 text-dark bg-light px-3 py-2" style={{ fontSize: '0.8rem', fontWeight: '700' }}>GET IN TOUCH</span>
                        <h2 className="fw-bold mb-4">We'd Love to Hear From You</h2>
                        <p className="text-white-50 mb-5" style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>
                            Have feedback on your dining experience, a catering request, or a general question? Contact our kitchen directly or drop us a line using this contact form!
                        </p>
                        
                        <div className="d-flex align-items-center mb-4">
                            <span className="fs-3 me-3">📍</span>
                            <div>
                                <h6 className="mb-0 fw-bold">Our Kitchen</h6>
                                <p className="mb-0 small text-white-50">123 Artisan Boulevard, Food District</p>
                            </div>
                        </div>

                        <div className="d-flex align-items-center mb-4">
                            <span className="fs-3 me-3">📞</span>
                            <div>
                                <h6 className="mb-0 fw-bold">Call to Order</h6>
                                <p className="mb-0 small text-white-50">+1 (555) 749-9233</p>
                            </div>
                        </div>

                        <div className="d-flex align-items-center">
                            <span className="fs-3 me-3">✉️</span>
                            <div>
                                <h6 className="mb-0 fw-bold">Email Support</h6>
                                <p className="mb-0 small text-white-50">hello@sliceanddice.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form Card */}
                <div className="col-lg-7">
                    <div className="p-4 p-md-5 bg-white rounded-3 shadow-sm border border-light-subtle h-100">
                        <h3 className="fw-bold text-dark mb-4">Send a Message</h3>
                        
                        {submitted && (
                            <div className="alert alert-success border-0 shadow-sm mb-4" role="alert" style={{ backgroundColor: '#ecfdf5', color: '#065f46', borderRadius: '8px' }}>
                                🎉 Thank you! Your message has been sent successfully. Our team will reach back shortly.
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label text-muted small fw-semibold">Your Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control py-2 border-light-subtle" 
                                        placeholder="Full Name" 
                                        required 
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        style={{ borderRadius: '6px' }}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted small fw-semibold">Email Address</label>
                                    <input 
                                        type="email" 
                                        className="form-control py-2 border-light-subtle" 
                                        placeholder="name@example.com" 
                                        required 
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        style={{ borderRadius: '6px' }}
                                    />
                                </div>
                                <div className="col-12">
                                    <label className="form-label text-muted small fw-semibold">Subject</label>
                                    <input 
                                        type="text" 
                                        className="form-control py-2 border-light-subtle" 
                                        placeholder="How can we help?" 
                                        required 
                                        value={formData.subject}
                                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                        style={{ borderRadius: '6px' }}
                                    />
                                </div>
                                <div className="col-12">
                                    <label className="form-label text-muted small fw-semibold">Message</label>
                                    <textarea 
                                        className="form-control border-light-subtle" 
                                        rows="5" 
                                        placeholder="Type your message here..." 
                                        required 
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        style={{ borderRadius: '6px' }}
                                    ></textarea>
                                </div>
                                <div className="col-12 mt-4">
                                    <button type="submit" className="btn btn-secondary px-4 py-2 text-white border-0" style={{ backgroundColor: '#ff385c', borderRadius: '6px', fontWeight: '600' }}>
                                        Submit Feedback
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
