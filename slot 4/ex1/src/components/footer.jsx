import React from "react";
function Footer({ id, name, email, githublink }) {
    return (
        <footer className="py-4 mt-5 text-center border-top bg-white text-muted">
            <p className="mb-1">&copy; ID: {id || "DE191102"}.</p>
            <p className="mb-1">Name: {name || "LinhPH"}</p>
            <p className="mb-1">Email: {email || "benphilip11234@gmail.com"}</p>
            <p className="mb-0">
                <a href={githublink || "https://github.com/fudn-traltb-su26/n-p-b-i-exercise1-PhanHuuLinh"} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-danger fw-semibold">
                    Github Profile
                </a>
            </p>
        </footer>
    );
}

export default Footer;
