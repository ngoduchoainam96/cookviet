import styled from "styled-components";

export default props => (
  <div className="Row">
    <Row border>
    <h3>{props.title}</h3>
    <img
      src={
        props.connected ? "/static/connected.svg" : "/static/disconnected.svg"
      }
      height={35}
      style={{ paddingRight: 10 }}
    />
  </Row></div>
  
);

const Row = styled.div`
  border-bottom: ${props => (props.border ? "2px solid #222" : "none")};
`;
