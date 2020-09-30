import React from 'react';
import Cta from '../components/sections/Cta';

class Parents extends React.Component {
  render() {
    return (
      <React.Fragment>

<section
        {...props}
        className={outerClasses}
      >
        <div className="container">
          <div className={innerClasses}>
          </div>
          </div>

          </section>

        


        <Cta hasBgColor split className="has-bg-color-cut"/>
      </React.Fragment>
    );
  }
}

export default Parents;