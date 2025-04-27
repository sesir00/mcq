import React from 'react';
import "./footer.css";


const Footer = () => {
  return (
    <>
    <footer className="site-footer">
      <div className="horizontal-line"></div>

      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>About</h6>
            <p className="text-justify">MCQGen.com <i> – YOUR AI-POWERED MCQ CREATOR </i> is a cutting-edge tool that uses AI to help educators, students, and content creators generate multiple-choice questions (MCQs) quickly and effectively. With MCQGen, our mission is to streamline the question-creation process by generating accurate, concept-focused MCQs from any text.</p>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Legal</h6>
            <ul className="footer-links">
              <li><a href="http://scanfcode.com/category/c-language/">Terms of Service</a></li>
              <li><a href="http://scanfcode.com/category/front-end-development/">Privacy Policy</a></li>
            </ul>

            <h6>Comparisons</h6>
            <ul className="footer-links">
              <li><a href="http://scanfcode.com/category/c-language/">MCQGen vs Quillionz</a></li>
              <li><a href="http://scanfcode.com/category/front-end-development/">MCQGen Features in Depth</a></li>
            </ul>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul className="footer-links">
              <li><a href="http://scanfcode.com/about/">About Us</a></li>
              <li><a href="http://scanfcode.com/contact/">Contact Us</a></li>
              <li><a href="http://scanfcode.com/contribute-at-scanfcode/">Contribute</a></li>
              <li><a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a></li>
            </ul>

            <h6>FAQs</h6>
            <ul className="footer-links">
              <li><a href="http://scanfcode.com/about/">MCQGen FAQs</a></li>
            </ul>
          </div>
        </div>
        <hr/>
      </div>
        <div className="container">
          <div className="row">
              <div className="col-md-8 col-sm-6 col-xs-12">
                <p className="copyright-text">Copyright &copy; 2024 All Rights Reserved by 
                  <a href="#"> MCQGen</a>.
                </p>
              </div>

              <div className="col-md-4 col-sm-6 col-xs-12">
                <ul className="social-icons">
                <li><a className="facebook" href="#"><i className="fab fa-facebook"></i></a></li>
                <li><a className="twitter" href="#"><i className="fab fa-twitter"></i></a></li>
                <li><a className="dribbble" href="#"><i className="fab fa-dribbble"></i></a></li>
                <li><a className="linkedin" href="#"><i className="fab fa-linkedin"></i></a></li> 
                </ul>
              </div>
            </div>
        </div>
      </footer>
    </>
  )
}

export default Footer;