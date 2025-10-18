
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/NotFound.css'

const NotFound = () => {
    const [stars, setStars] = useState([]);

    const navigate = useNavigate();

useEffect(() => {
    const generatedStars = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
    }));
    setStars(generatedStars);
}, []);

    const handleGoHome = () => {
    navigate('/')
};

    const handleGoBack = () => {
    navigate("/contacto")
};

return (
    <div className="not-found-wrapper">
        <div className="stars-container">
            {stars.map((star) => (
        <div
            key={star.id}
            className="star"
            style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                animationDelay: `${star.delay}s`,
            }}
        />
        ))}
    </div>

        <div className="not-found-container">
        <div className="sad-face">😕</div>
        <div className="error-code">404</div>
        
        <h1>¡Página no encontrada!</h1>
        
        <p>
            Lo sentimos, la página que buscas no existe o ha sido eliminada. 
            Pero no te preocupes, ¡estamos aquí para ayudarte!
        </p>

        <div className="button-group">
            <button 
                className="btn-home" 
                onClick={handleGoHome}
                type="button"
        >
                Ir al inicio
            </button>
            <button 
                className="btn-back" 
                onClick={handleGoBack}
                type="button"
            >
                Contactános 
            </button>
        </div>
    </div>
    </div>
);
};

export default NotFound;