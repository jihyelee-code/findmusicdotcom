import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {PropTypes} from 'prop-types'
class Album extends React.Component {
  render() {
    
    return (
      <Link
        to={`/album/${this.props.album}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Container>
          <Poster poster={this.props.poster}></Poster>
          <Name>{this.props.title}</Name>
        </Container>
      </Link>
    );
  }
}

Album.propTypes = {
  album : PropTypes.string.isRequired,
  poster : PropTypes.string.isRequired,
  title : PropTypes.string.isRequired
}

export default Album;

const Container = styled.div`
  width: 100%;
  font-size: 1.1rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  background-color: rgba(240, 240, 240, 0.85);
`;
const Name = styled.div`
  padding: 10px;
`;
const Poster = styled.div`
  background-image: url(${props => props.poster});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 120px;
  height: 120px;
`;
