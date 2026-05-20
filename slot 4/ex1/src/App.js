import React from 'react';
import PizzaList from './components/pizzaList';
import Footer from './components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div className="container py-4">
            {/* Pizza List Grid matching the sample */}
            <PizzaList />

            {/* Footer with student details */}
            <Footer 
                id="DE191102"
                name="LinhPH"
                email="benphilip11234@gmail.com"
                githublink="https://github.com/PhanHuuLinh/FER202-_SU26_LinhPH"
            />
        </div>
    );
}

export default App;