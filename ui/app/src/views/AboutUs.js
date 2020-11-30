import React from 'react';
// import section header
import SectionHeader from '../components/sections/partials/SectionHeader';
// import sections
import Testimonial from '../components/sections/Testimonial';
import Clients from '../components/sections/Clients';
import Team from '../components/sections/Team';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import GenericSection from '../components/sections/GenericSection';
import Cta from '../components/sections/Cta';
// import some required elements
import Image from '../components/elements/Image';
import Input from '../components/elements/Input';
import ButtonGroup from '../components/elements/ButtonGroup';
import Button from '../components/elements/Button';
import Modal from '../components/elements/Modal';
import Accordion from '../components/elements/Accordion';
import AccordionItem from '../components/elements/AccordionItem';
import ReactGA from 'react-ga';

class AboutUs extends React.Component {

  state = {
    demoModalActive: false
  }

  openModal = (e) => {
    e.preventDefault();
    this.setState({ demoModalActive: true });
  }

  closeModal = (e) => {
    e.preventDefault();
    this.setState({ demoModalActive: false });
  }

  render() {

    ReactGA.pageview('AboutUs');

    const genericSection01Header = {
      title: 'Newsletter modal is a component commonly used'
    }    

    const genericSection02Header = {
      title: 'Button is a component commonly used'
    }

    const genericSection03Header = {
      title: 'Input form is a component commonly used'
    }

    const genericSection04Header = {
      title: 'Frequently asked questions'
    }    

    const missionSectionData = {
      title: 'Our Mission'
    }

    return (
      <React.Fragment>

      <Testimonial hasBgColor className="illustration-section-02" />

        <GenericSection>
          <div className="center-content">

          <h2>Our Mission</h2>

          </div>

          <div className="container">
            <p className="mt-12">
              Hour to Empower is a 501c(3) organization that partners with schools to effectively provide free tutoring for under-resourced schools. 
              By leveraging a network of college-educated, volunteer tutors, students enrolled at participating schools can choose from a series of available 
              times that best suits their schedules, provide feedback by rating their tutors, and receive vital support that complements what they are learning 
              in the classroom. 
            </p>
            <br/>
            <p className="mt-24">
              Covid-19 has brought upon unprecedented times for the economy, classrooms, and households. A quality education is an essential service that 
              should be provided to ALL students regardless of income, race, or creed. The responsibility to enrich students’ learning experiences is one 
              of not only teachers, administrators, or parents, but also society at large.
            </p>
            <br/>
            <p className="mt-24">
              We challenge educational inequities in the pursuit of bridging the achievement gap.
            </p>
            <br/>
            <p className="mt-24">
              Covid-19 is a global pandemic. It has impacted all of us in numerous ways—that we all share. Let’s share more than the devastation, 
              let’s share learning. This is the hour, for our communities and our next generations, to contribute to something greater than just our own lives.
              This is the hour to empower.
            </p>
          </div>
        </GenericSection>


        {/* <Clients topDivider bottomDivider /> */}
        <Team />
        {/* <FeaturesSplit invertMobile imageFill topDivider /> */}     

        <Cta invertColor split className="has-bg-color-cut" />
      </React.Fragment>
    );
  }
}

// inline style
const formStyle = {
  maxWidth: '420px',
  margin: '0 auto'
}

const modalFormStyle = {
  maxWidth: '320px',
  margin: '0 auto'
}

export default AboutUs;