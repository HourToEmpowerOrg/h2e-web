import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Image from '../elements/Image';
import { Link } from 'react-router-dom';
import SmoothScroll from '../elements/SmoothScroll';

const propTypes = {
  ...SectionSplitProps.types
}

const defaultProps = {
  ...SectionSplitProps.defaults
}

class HeroSplit extends React.Component {

  state = {
    videoModalActive: false
  }  

  openVideoModal = (e) => {
    e.preventDefault();
    this.setState({ videoModalActive: true });
  }

  closeVideoModal = (e) => {
    e.preventDefault();
    this.setState({ videoModalActive: false });
  }  

  render() {

    const {
      className,
      topOuterDivider,
      bottomOuterDivider,      
      topDivider,
      bottomDivider,
      hasBgColor,
      invertColor,
      invertMobile,
      invertDesktop,
      alignTop,
      imageFill,
      ...props
    } = this.props;

    const outerClasses = classNames(
      'h2e-hero section',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );

    const innerClasses = classNames(
      'h2e-hero-inner section-inner',
      topDivider && 'has-top-divider',
      bottomDivider && 'has-bottom-divider'
    );

    const splitClasses = classNames(
      'split-wrap',
      invertMobile && 'invert-mobile',
      invertDesktop && 'invert-desktop',
      alignTop && 'align-top'
    );

    return (
      <section
        {...props}
        className={outerClasses}
      >
        <div className="container">
          <div className={innerClasses}>
            <div className={splitClasses}>
              <div className="split-item">
                <div className="h2e-hero-content split-item-content center-content-mobile reveal-from-top">
                  <h1 className="mt-0 mb-16">
                    Pro Bono Tutoring
                  </h1>
                  <p className="mt-0 mb-32">
                    Partnering with schools to provide supplemental learning support. A virtual pipeline to spend a break giving back to students in need.
                  </p>
                  <ButtonGroup>
                    <SmoothScroll to="how-it-works-section" className="button button-light mr-4 login-button">
                      Learn More
                    </SmoothScroll>                
                  </ButtonGroup>
                  <ButtonGroup className="center-content">
                  <Link to="/login" className="login-link" tag="a" color="secondary">
                      Login
                    </Link>  
                  </ButtonGroup>
                </div>
                <div className="h2e-hero-figure split-item-image split-item-image-fill illustration-section-01 reveal-from-bottom">
                    <Image
                      src={require('./../../assets/images/logo_muted.png')}
                      alt="h2e-hero"
                      width={528}
                      height={396} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

HeroSplit.propTypes = propTypes;
HeroSplit.defaultProps = defaultProps;

export default HeroSplit;