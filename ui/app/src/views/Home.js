import React from 'react';
import HeroSplit from '../components/sections/HeroSplit';
import Roadmap from '../components/sections/Roadmap';
import Cta from '../components/sections/Cta';
import ReactGA from 'react-ga';
import FeaturesSplit from '../components/sections/FeaturesSplit';

class Home extends React.Component {
  render() {
    ReactGA.pageview('Landing');
    return (
      <React.Fragment>
        <HeroSplit hasBgColor invertColor />
        <Roadmap/>
        <FeaturesSplit></FeaturesSplit>
        {/* <FeaturesTiles /> */}
        {/* <FeaturesTabs topDivider bottomOuterDivider /> */}
        {/* <News className="illustration-section-01" /> */}
        {/* <Pricing hasBgColor pricingSlider /> */}
        <Cta hasBgColor split className="has-bg-color-cut"/>
      </React.Fragment>
    );
  }
}

export default Home;