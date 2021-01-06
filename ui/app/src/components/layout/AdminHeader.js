import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bulma-components';
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

const brandClasses = classNames('header-brand')


const BrandLogo = () => {
  return (
      <div className={brandClasses}>
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>Hour to Empower</Link>
      </div>
  )
}


class AdminHeader extends React.Component {

  state = {
    isActive: false,
    userName: (localStorage.getItem('h2eUserInfo') ? JSON.parse(localStorage.getItem('h2eUserInfo')).display : '')
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

    const userName = this.state.userName;

    return (
      <nav className="navbar is-fixed-top is-success" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item">
            Hour to Empower
          </a>
          <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">  

          <div className="navbar-end">
            <span className="navbar-item">
              {userName}
            </span>
            <div className="navbar-item">
              <Link style={{color: '#fff'}} to="/login" onClick={() => this.logout()}>
                  Log Out
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

AdminHeader.propTypes = propTypes;
AdminHeader.defaultProps = defaultProps;

export default AdminHeader;