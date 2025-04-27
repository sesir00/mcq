import React from 'react';
import './HeroSection.css';
import { useHistory } from 'react-router-dom';

const HeroSection = () => {
  const history = useHistory();
  const handleButtonClick = () => {
    history.push('/login');
  };
  return (
    <div className='hero'>
     <h1 className='Heading'>Create Multiple Choice <br/>Questions <span className="highlight">(MCQs)</span>online from <br/>any text using AI.</h1>

     <p className='subheading'>MCQGen is an online tool to generate MCQs automatically using <br /> advanced AI techniques. </p>
     <div className="herobtn">
      <button className="button-container miq55g7" style={{padding: 20}} onClick={handleButtonClick}>Get started →</button>
     </div>
     
    </div>
  );
};

export default HeroSection;
