import React from 'react';
import { useHistory } from 'react-router-dom';
import heroImage1 from '../assets/hero-img1.png';
import heroImage2 from '../assets/hero-img2.png';
import heroImage3 from '../assets/hero-img3.png';
import heroImage4 from '../assets/hero-img4.png';
import heroImage5 from '../assets/hero-img5.png';
import heroImage6 from '../assets/hero-img6.png';
import './HeroSection2.css';

const HeroSection2 = () => {
  const history = useHistory();
  const handleButtonClick = () => {
    history.push('/login');
  };
  return (
    <>
      <div className="hero2-overall">
        <h1 className='hero2-heading'>
          A hassle-free MCQ generation experience
        </h1>
        <p className='hero2-subheading'>
          Believing in total automation, MCQGen allows you to turn paragraphs into several multiple-choice questions with ease. All it takes is one click, a few rearrangements and you are good to go. 
        </p>
        <h1 className='hero2-heading'>
          Who is it for?
        </h1>

        <div className="who-container">
        <div className="who-card">
            <img src={heroImage1} alt="Teachers and Schools"/>
            <h3>Teachers and Schools</h3>
            <p>Schools and teachers can make use of MCQGen to automatically generate worksheets and exam papers. MCQGen also helps avoid the use of repetitive questions chosen from a fixed question bank every year.</p>
        </div>
        <div className="who-card">
            <img src={heroImage2} alt="HR Teams"/>
            <h3>HR Teams</h3>
            <p>Assessments for compliance documents are needed by an HR Team whenever there is a change in a company&apos;s policy. MCQGen can quickly generate such assessments using its advanced AI algorithms.</p>
        </div>
        <div className="who-card">
            <img src={heroImage3} alt="Publishers and Edtech Companies"/>
            <h3>Publishers and Edtech Companies</h3>
            <p>Publishers and Edtech companies can save ample amounts of time and costs by having a small in-house team create various assessments using MCQGen, instead of outsourcing or hiring freelancers to do it for them.</p>
        </div>
        </div>

        <h1 className='hero2-heading'>
          How are MCQs made?
        </h1>
        <p className='hero2-subheading' style={{margin: '0 18%'}}>
          The following is a guide on how teachers and tutors create MCQs.
          MCQGen uses AI algorithms to mimic the human MCQ creation process.
        </p>
        <h3 className='mcq-made'>
          1. Identifying Key Sentences
        </h3>
        <p className='mcq-made-paragraph'>
          We start with identifying key sentences that carry key concepts from any given text. 
        </p>
        <img src={heroImage4} alt="Identifying Key Sentences"style={{margin: '4% 0 2% 15%'}}/>
        <h3 className='mcq-made'>
          2. Extracting Keywords from Sentences
        </h3>
        <p className='mcq-made-paragraph'>
          From the key sentences, we identify keywords and key phrases that form the correct answer to which questions are created.
        </p>
        <img src={heroImage5} alt="Extracting Keywords from Sentences" style={{margin: '4% 0 2% 15%'}}/>
        <h3 className='mcq-made'>
          3. Forming an MCQ
        </h3>
        <p className='mcq-made-paragraph'>
          After we extract a keyword or keyphrase (correct answer), we use AI algorithms to generate a question from the key sentence such that the extracted keyword or keyphrase is the right answer. For a given generated question and right answer pair, we generate relevant distractors (wrong answer choices) using another AI algorithm to generate the complete Multiple Choice Question (MCQ).
        </p>
        <img src={heroImage6} alt="Forming an MCQ" style={{margin: '4% 0 2% 15%'}}/>


  

        <div className="hero-last-card">
          <div className="hero-card-content">
            <p className="hero-card-title">
              Ready to try out Questgen for free?
            </p>
            <p className="hero-card-para">
              Its just a click away! 
            </p>
            <p>
              <button className="button-container miq55g7" style={{padding: 20}} onClick={handleButtonClick}>
                Get started →
              </button>
            </p>
          </div>
        </div>

        <div className="empty">&nbsp;</div>

      </div>
      
    </>
  )
}

export default HeroSection2
