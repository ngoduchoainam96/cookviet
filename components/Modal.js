import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import styles from '../styles/Home.module.css'


const Modal = ({ show, onClose, children, title }) => {
    const [isBrowser, setIsBrowser] = useState(false);
  
    useEffect(() => {
      setIsBrowser(true);
    }, []);
  
    const handleCloseClick = (e) => {
      e.preventDefault();
      onClose();
    };
  
    const modalContent = show ? (
      <StyledModalOverlay>
        <StyledModal>
          <StyledModalHeader>
            <a href="#" onClick={handleCloseClick}>
              x
            </a>
          </StyledModalHeader>
          {title && <StyledModalTitle>{title}</StyledModalTitle>}
          <StyledModalBody>
            <div>
              <b>Món này đến từ vùng miền nào</b><br />
              <input type="text" placeholder="Tìm vùng miền" className={styles.country_search}/>&nbsp;<button>Tìm kiếm</button><br />
              <b>Thêm nơi xuất xứ của món</b><br />
              Hãy để các bạn bếp khác biết món của bạn đến từ thành phố, vùng miền, hoặc đất nước nào?
            </div>
          </StyledModalBody>
        </StyledModal>
      </StyledModalOverlay>
    ) : null;
  
    if (isBrowser) {
      return ReactDOM.createPortal(
        modalContent,
        document.getElementById("modal")
      );
    } else {
      return null;
    }
  };
  
  const StyledModalBody = styled.div`
    padding-top: 10px;
  `;
  
  const StyledModalHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    font-size: 25px;
  `;
  
  const StyledModal = styled.div`
    background: white;
    width: 500px;
    height: 300px;
    border-radius: 10px;
    padding: 15px;
  `;
  const StyledModalOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(117,117,116,255);
  `;
  
  export default Modal;