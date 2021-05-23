import React, { useContext } from 'react';
import { LoginContext } from '../../contexts/loginContext';

const Home = () => {
    const { userData } = useContext(LoginContext);

    return (
        <div className="home">
            {
                !userData.token ?
                    <div className="home">
                        <h1>Welcome</h1>
                        <h2>Please Login</h2>
                        <h6>in the top right :)</h6>
                    </div>
                    :
                    <div className="homeConnected">
                        <h1>Hey</h1>
                        <h2>I Hope You Study Hard...</h2>
                    </div>
            }
        </div>
    )
}

export default Home;