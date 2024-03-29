import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const propTypes = {
  active: PropTypes.bool,
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool
}

const defaultProps = {
  active: false,
  navPosition: '',
  hideNav: false,
  hideSignin: false,
  bottomOuterDivider: false,
  bottomDivider: false
}

const brandClasses = classNames('header-brand')


const BrandLogo = () => {
  return (
      <div className={brandClasses}>
        <Link to="/" style={{ textDecoration: 'none' }}>Hour to Empower</Link>
      </div>
  )
}


class Header extends React.Component {

  state = {
    isActive: false
  };

  nav = React.createRef();
  hamburger = React.createRef();

  componentDidMount() {
    this.props.active && this.openMenu();
    document.addEventListener('keydown', this.keyPress);
    document.addEventListener('click', this.clickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyPress);
    document.addEventListener('click', this.clickOutside);
    this.closeMenu();
  }

  openMenu = () => {
    document.body.classList.add('off-nav-is-active');
    this.nav.current.style.maxHeight = this.nav.current.scrollHeight + 'px';
    this.setState({ isActive: true });
  }

  closeMenu = () => {
    document.body.classList.remove('off-nav-is-active');
    this.nav.current && (this.nav.current.style.maxHeight = null);
    this.setState({ isActive: false });
  }

  keyPress = (e) => {
    this.state.isActive && e.keyCode === 27 && this.closeMenu();
  }

  clickOutside = (e) => {
    if (!this.nav.current) return
    if (!this.state.isActive || this.nav.current.contains(e.target) || e.target === this.hamburger.current) return;
    this.closeMenu();
  }

  render() {
    const {
      className,
      active,
      navPosition,
      hideNav,
      hideSignin,
      bottomOuterDivider,
      bottomDivider,
      ...props
    } = this.props;

    const classes = classNames(
      'site-header',
      bottomOuterDivider && 'has-bottom-divider',
      className
    );

    return (
      <header
        {...props}
        className={classes}
      >
        <div className="container">
          <div className={
            classNames(
              'site-header-inner',
              bottomDivider && 'has-bottom-divider'
            )}>
            <BrandLogo />
            {!hideNav &&
              <React.Fragment>
                <button
                  ref={this.hamburger}
                  className="header-nav-toggle"
                  onClick={this.state.isActive ? this.closeMenu : this.openMenu}
                >
                  <span className="screen-reader">Menu</span>
                  <span className="hamburger">
                    <span className="hamburger-inner"></span>
                  </span>
                </button>
                <nav
                  ref={this.nav}
                  className={
                    classNames(
                      'header-nav',
                      this.state.isActive && 'is-active'
                    )}>
                  <div className="header-nav-inner">
                    <ul className={
                      classNames(
                        'list-reset text-xs',
                        navPosition && `header-nav-${navPosition}`
                      )}>
                    </ul>
                    {!hideSignin &&
                      <ul
                        className="list-reset header-nav-right"
                      >
                        <li>
                          <Link to="/about">About</Link>
                        </li>
                        <li>
                          <Link to="/parents">For Parents</Link>
                        </li>
                        <li>
                          <Link to="/signup/schools">For Schools</Link>
                        </li>
                        <li>
                          <Link to="/signup/student" className="button button-primary button-wide-mobile button-sm mr-4">Student Sign up</Link>
                        </li>
                        <li>
                          <Link to="/signup/tutor" className="button button-secondary button-wide-mobile button-sm ml-4">Tutor Sign up</Link>
                        </li>
                      </ul>}
                  </div>
                </nav>
              </React.Fragment>}
          </div>
        </div>
      </header>
    )
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;