import styled from "styled-components";
import React from 'react'

export default class extends React.Component {
  state = {
    form: 1
  };

  startChannel = (address, transactions, deposit) => {
    this.setState({ form: 0 });
    setTimeout(() => {
      this.props.setChannel();
    }, 500);
  };

  render() {
    var { form } = this.state;
    return (
      <AnimatedLeftBox active={form === 1}>
        <Button active={true} onClick={() => this.startChannel()}>
          {`Tạo kênh trò chuyện`}
        </Button>
      </AnimatedLeftBox>
    );
  }
}

const AnimatedLeftBox = styled.span`
  position: absolute;
  margin-left: -500px;
  margin-top: -155px;
  padding: 0px;
  transition: all 0.5s ease;
  transform: ${props =>
    props.active ? "translateY(0px)" : "translateY(20px)"};
  visibility: ${props => (props.active ? "visible" : "hidden")};
  opacity: ${props => (props.active ? "1" : "0")};
`;
const Button = styled.button`
  padding: 15px 20px;
  background: ${props =>
    !props.active ? "grey" : "linear-gradient(135deg, #ef7564, #f06263)"};
  border: none;
  color: white;
  font-weight: 600;
  &:focus {
    outline: none;
  }
`;
