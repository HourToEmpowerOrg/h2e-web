import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Input from '../elements/Input';
import Button from '../elements/Button';
import { toast } from "react-toastify";


import axios from "axios";

const api_url = '/api/v1'

const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool
}

const defaultProps = {
  ...SectionProps.defaults,
  split: false
}

class Cta extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      'email': null,
      'submitted': false
    }
  }


  submitJoinMailingList = (e) => {
    e.preventDefault();;

    const signupData = {'email':this.state.email};    
    const self = this;
    axios.post(`${api_url}/mailing/join`, signupData)
            .then(function (response) {
              if (response.status == 200) {
                self.setState({submitted: true})
                toast('You\'ve been added to our mailing list!');
              }
            })
            .catch(function (error) {
                console.log(error);
                toast.error(error)
            });

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
      split,
      ...props
    } = this.props;

    const outerClasses = classNames(
      'cta section center-content-mobile',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );

    const { submitted } = this.state;

    const innerClasses = classNames(
      'cta-inner section-inner',
      topDivider && 'has-top-divider',
      bottomDivider && 'has-bottom-divider',
      split && 'cta-split'
    );

    //simplest email validator ever!
    const fieldsValid = (this.state.email && this.state.email.indexOf('@') > 0 && this.state.email.indexOf('.') >= 0);

    return (
      <section
        {...props}
        className={outerClasses}
      >
        <div className="container mt-5">

          { !submitted && (
              <div className={innerClasses}>
                <div className="cta-slogan">
                  <h3 className="m-0" style={{color:'#fff'}}>
                    Want to get involved?
                  </h3>
                </div>
                <div className="cta-action">
                  <Input id="newsletter" type="email" label="Subscribe" 
                    labelHidden 
                    placeholder="Your best email"
                    onChange = {e => this.setState({'email': e.target.value})}>
                  </Input>
                </div>
                <Button disabled={!fieldsValid} onClick={this.submitJoinMailingList}>Hear From Us</Button>
              </div>
            )
          }
          { !!submitted && (
              <div className={innerClasses}>
                <div className="cta-slogan">
                  <h3>You'll hear from us on our progress!</h3>
                </div>
              </div>
            )}
        </div>
      </section>
    );
  }
}

Cta.propTypes = propTypes;
Cta.defaultProps = defaultProps;

export default Cta;