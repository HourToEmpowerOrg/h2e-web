import React from 'react';
import Button from '../components/elements/Button'
import {Link} from 'react-router-dom'
import classNames from 'classnames';

class NotFound extends React.Component {
  render() {

    const {
      className,
      topOuterDivider,
      bottomOuterDivider,      
      topDivider,
      bottomDivider,
      hasBgColor,
      invertColor,
      ...props
    } = this.props;

    const outerClasses = classNames(
      'signin section',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );

    const innerClasses = classNames(
      'signin-inner section-inner',
      topDivider && 'has-top-divider',
      bottomDivider && 'has-bottom-divider'
    );

    return (
      <section
        {...props}
        className={outerClasses}
      >
        <div className="container">
          <div className={innerClasses}>
            <h4>Hm, we couldn't find that page.... sorry about that!</h4>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button className="button button-primary">Go Home</Button>
            </Link>
          </div>
        
      </div>
      </section>
    );
  }
}

export default NotFound;