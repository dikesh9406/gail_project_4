import React from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/LandingPage';
import { Textfit } from 'react-textfit';
import Logo from "../components/Logo.js"
import Logo2 from "../components/Logo2.js"

const Landing = () => {
  const { user } = useAppContext();

  return (
    <React.Fragment>
      {user && <Navigate to='/' />}
     
      <Wrapper>
      <nav style={{ display: 'flex', justifyContent: 'space-between', boxShadow: '0 2px 0px rgba(0, 0, 0, 0.2)' }}>
          <Logo />
          <Logo2 />
        </nav>
      <br />
      <br />
        
        <div className='container page'>
          <div className='info'>
            <Textfit>
              <h1>
                Motor <span>Condition</span> Monitoring
              </h1>
              <h4>
                
                Project under: <br />
                Gas India Ltd (GAIL)
              </h4>
            </Textfit>

            <Link to='/register' className='btn btn-hero'>
              Login/Register
            </Link>
          </div>
          
          <img 
      src="https://cdn-icons-png.flaticon.com/512/6292/6292175.png"
      alt="new"
      />
        </div>
      </Wrapper>
    </React.Fragment>
  );
};

export default Landing;
