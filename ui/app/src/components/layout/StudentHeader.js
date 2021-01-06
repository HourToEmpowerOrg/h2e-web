/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

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


class StudentHeader extends React.Component {

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

  logout = () => {
    axios.post('/logout')
  }

  render() {
    const {
      config,
    } = this.props;


    return (
      <nav 
        className="navbar is-fixed-top is-dark" 
        role="navigation" 
        aria-label="main navigation"
        style={{backgroundColor: !!config && config.secondary ? config.secondary : '#3273dc'}}>
        <div className="navbar-brand">
          <a className="navbar-item" href='/'>
            {!!config && !!config.logo_url ? (
              <img src={config.logo_url} alt="School Header" className="header-logo"/>
            ) : "Hour to Empower"}
          </a>
          <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">

            <Link to="/student/dashboard" className="navbar-item">
                Dashboard
            </Link>

              <Link to="/student/book-session" className="navbar-item">
                Book a Session!
              </Link>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                More
              </a>

              <div className="navbar-dropdown">
                <a className="navbar-item">
                  Get Help
                </a>
                <hr className="navbar-divider"/>
                <a className="navbar-item">
                  Report an issue
                </a>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
            <Link className="is-light" to="/login" onClick={() => this.logout()}>
                  Log Out
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

StudentHeader.propTypes = propTypes;
StudentHeader.defaultProps = defaultProps;

export default StudentHeader;