import React from "react";
import styled, { css } from "styled-components";

export const Layout = props => (
  <Main>
    {props.children}
  </Main>
);

export const SingleBox = props => (
  <MainBox {...props}>{props.children}</MainBox>
);
const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  padding-top: 10rem;
  padding-bottom: 5rem;
  box-sizing: border-box;
  @media screen and (max-width: 640px) {
    flex-direction: column;
    padding: 0rem;
  }
`;

const MainBox = styled.div`
  display: flex;
  flex-direction: ${props => (props.row ? "row" : "column")};
  align-items: flex-start;
  height: 25rem;
  max-width: ${props => (props.wide ? "50rem" : "35rem")};
  width: 100%;
  box-sizing: border-box;
  word-wrap: break-word;
  background: ${props => (props.noBg ? "none" : "#fff")};
  color: ${props => (props.noBg ? "none" : "#222")};
  transition: all 0.5s ease;
  transform: ${props =>
    props.active ? "translateY(0px)" : "translateY(20px)"};
  visibility: ${props => (props.active ? "visible" : "hidden")};
  opacity: ${props => (props.active ? "1" : "0")};
  @media screen and (max-width: 640px) {
    min-width: 100vw;
    flex-direction: column;
    height: 100vh;
    ${props =>
      props.noBg
        ? css`
            padding: 1rem;
          `
        : null};
  }
  z-index: 2;
`;
