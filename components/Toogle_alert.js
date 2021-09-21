import SlideToggle from "react-slide-toggle";
import React from 'react'
import styles from '../styles/Home.module.css'
import $ from 'jquery'; 
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';


class Toogle extends React.Component {
  constructor() {
      super();
      this.state = {
          dropdown: false,
      };
  }
  handleClick = () => {
      if (!this.state.dropdown) {
          // attach/remove event handler
          document.addEventListener('click', this.handleOutsideClick, false);
      } else {
          document.removeEventListener('click', this.handleOutsideClick, false);
      }

      this.setState(prevState => ({
          dropdown: !prevState.dropdown,
      }));
  }

  handleOutsideClick = (e) => {
      // ignore clicks on the component itself
      if (this.node.contains(e.target)) {
          return;
      }
      this.handleClick();
  }

  render() {
      return (
          <li ref={node => { this.node = node; }}>
              <div className={styles.selected_language}>
              <div className={styles.current_lang}>
              <a href="#" onClick={this.handleClick}>Ngôn ngữ: <strong>Tiếng Việt</strong> </a>
              </div>
              <div className="component-container">
  <CSSTransitionGroup
    transitionName="slide"
    transitionEnterTimeout={300}
    transitionLeaveTimeout={300}
  >
              {this.state.dropdown && 
              (
                
                  <ul className="nav-dropdown" ref={node => { this.node = node; }}>
                    <div className={styles.languages_choose }>
                        <li><a href="/alert/Cảnh%20giác">Tiếng Việt</a></li>
                  <li><a href="/english3/alert">Tiếng Anh</a></li></div>
                    
                  
                  </ul>
              )}
              </CSSTransitionGroup>
</div>
</div>
          </li>
      )
  }
}
export default Toogle;