import React from 'react'
import './Team.css'
import profile1 from '../assets/pp1.jpg'
import profile2 from '../assets/pp2.jpg'
import profile3 from '../assets/pp.jpg'
const Team = () => {
  return (
    <>
       <section id="team" className="team-area">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="site-heading text-center">
                        <h2>Our <span>Team</span></h2>
                        <h4>Meet our awesome and expert team members</h4>
                    </div>
                </div>
            </div>
                <div className="row team-items">
                    <div className="col-md-4 single-item">
                        <div className="item">
                            <div className="thumb">
                                <img className="img-fluid" src={profile1} alt="Thumb" />
                                <div className="overlay">
                                    <h4>Aswikar Khanal</h4>
                                    <p>
                                        Team Member
                                    </p>
                                    <div className="social">
                                        <ul>
                                            <li className="twitter">
                                                <a href="#"><i className="fab fa-twitter"></i></a>
                                            </li>
                                            <li className="facebook">
                                                <a href="https://www.facebook.com/profile.php?id=61566883000867"><i className="fab fa-facebook-f"></i></a>
                                            </li>

                                            <li className="instagram">
                                                <a href="https://www.instagram.com/hei_senberg100/"><i className="fab fa-instagram"></i></a>
                                            </li>
                                            <li className="linkedin">
                                                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="info">
                                <span className="message">
                                    <a href="#"><i className="fas fa-envelope-open"></i></a>
                                </span>
                                <h4>Aswikar Khanal</h4>
                                <span>Team Member</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 single-item">
                        <div className="item">
                            <div className="thumb">
                                <img className="img-fluid" src={profile2} style={{width: '600px'}} alt="Thumb" />
                                <div className="overlay">
                                    <h4>Kiran Maharjan</h4>
                                    <p>
                                        Team Member
                                    </p>
                                    <div className="social">
                                        <ul>
                                            <li className="twitter">
                                                <a href="#"><i className="fab fa-twitter"></i></a>
                                            </li>
                                            <li className="facebook">
                                                <a href="https://www.facebook.com/profile.php?id=100007305318464"><i className="fab fa-facebook-f"></i></a>
                                            </li>

                                            <li className="instagram">
                                                <a href="https://www.instagram.com/kiran_maharjjan/"><i className="fab fa-instagram"></i></a>
                                            </li>
                                            <li className="linkedin">
                                                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="info">
                                <span className="message">
                                    <a href="#"><i className="fas fa-envelope-open"></i></a>
                                </span>
                                <h4>Kiran Maharjhan</h4>
                                <span>Team Member</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 single-item">
                        <div className="item">
                            <div className="thumb">
                                <img className="img-fluid" src={profile3} alt="Thumb"/>
                                <div className="overlay">
                                    <h4>Shishir Chapagain</h4>
                                    <p>
                                        Team Member
                                    </p>
                                    <div className="social">
                                        <ul>
                                            <li className="twitter">
                                                <a href="#"><i className="fab fa-twitter"></i></a>
                                            </li>
                                            <li className="facebook">
                                                <a href="https://www.facebook.com/shishir.chapagain.999/"><i className="fab fa-facebook-f"></i></a>
                                            </li>

                                            <li className="instagram">
                                                <a href="https://www.instagram.com/see_sir00/"><i className="fab fa-instagram"></i></a>
                                            </li>
                                            <li className="linkedin">
                                                <a href="https://www.linkedin.com/in/shishir-chapagain-198683226/"><i className="fab fa-linkedin-in"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="info">
                                <span className="message">
                                    <a href="#"><i className="fas fa-envelope-open"></i></a>
                                </span>
                                <h4>Shishir Chapagain</h4>
                                <span>Team Member</span>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </section>
    </>
  )
}

export default Team
