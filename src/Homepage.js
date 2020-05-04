import React from 'react';
import { useHistory } from 'react-router-dom';


function Home() {
    const history = useHistory();
    const routeToPizza = event => {
        history.push("/Pizza");
    };

    return (
        <div className="home-wrapper">
            <button className="form-button" onClick={routeToPizza}>
                Pizza
            </button>
        </div>

    )
}

export default Home;