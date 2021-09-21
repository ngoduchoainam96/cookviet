import React from "react"
import { Link } from 'react-router-dom';
import LoginModal from "./LoginModal"


class Navbar extends React.Component{
  state = {
     modalOpen: false
  }

  handleModalOpen = () => {
     this.setState((prevState) => {
        return{
           modalOpen: !prevState.modalOpen
        }
     })
  }

  render(){
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark px-sm-5">
            <div className="container">
                <Link to='/'>
                    <div className="navbar-brand">
                        <i class="fas fa-globe fa-2x"></i>
                    </div>
                </Link>

                <ul className="navbar-nav align-items-right">
                    <li className="nav-item ml-5">
                        <a onClick={this.handleModalOpen} className="nav-link">
                            Log In
                        </a>
                    </li>
                    <li className="nav-item ml-5">
                        <a onClick={this.handleModalOpen} className="nav-link">
                            Sign Up
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        <LoginModal
           modalOpen={this.state.modalOpen}
           handleModalOpen={this.handleModalOpen}
        />
      </div>
    )
  }
}

export default Navbar;