import React from 'react';
import CheckAuth from '../components/auth/CheckAuth.tsx'
import styles from '../styles/Home.module.css';
// import NavBar from '../components/Navigation/NavBar.tsx';
import ResetPassword from '../components/Auth/ResetPassword';

export default class ResetPasswordFinal extends React.Component {
  render() {
    return (
      <div>
        <CheckAuth>
          
          <div
            className={[styles.container, styles['centered-container']].join(
              ' '
            )}
          >
            <ResetPassword />
          </div>
        </CheckAuth>
      </div>
    );
  }
}