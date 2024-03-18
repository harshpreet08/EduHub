import React from 'react';
import NavBar from '../Components/NavBar.jsx';
import LandingBody from '../components/landing-body';
import About from '../components/about';
import Contact from '../components/contact';

const LandingPage = () =>{
    return(
        <div class="landing-page">
        <NavBar/>
        <LandingBody/>
        <About/>
        {/* <Contact/> */}
        </div>
    )
}

export default LandingPage;