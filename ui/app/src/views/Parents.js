import React from 'react';
import ParentsSection from '../components/sections/ParentSection';
import Cta from '../components/sections/Cta';

class Parents extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ParentsSection/>
        {/* <FeaturesTiles /> */}
        {/* <FeaturesTabs topDivider bottomOuterDivider /> */}
        {/* <News className="illustration-section-01" /> */}
        {/* <Pricing hasBgColor pricingSlider /> */}
        <Cta hasBgColor split className="has-bg-color-cut"/>
      </React.Fragment>
    );
  }
}

export default Parents;