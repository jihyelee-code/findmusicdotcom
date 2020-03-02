import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {PropTypes} from 'prop-types';
class Artist extends React.Component {
  render() {
    const {props} = this;
    return (
      <Link
        to={`/artist/${props.artist}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Contaier>
          <Poster poster={props.poster}></Poster>
          <Name>{props.name}</Name>
        </Contaier>
      </Link>
    );
  }
}
Artist.propTypes = {
  artist : PropTypes.number.isRequired,
  poster : PropTypes.string.isRequired,
  name : PropTypes.string.isRequired
}
export default Artist;

const Contaier = styled.div`
  width: 100%;
  font-size: 1.1rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  grid-column-gap: 20px;
  background-color: rgba(240, 240, 240, 0.85);
`;
const Poster = styled.div`
  background-image: url(${props => props.poster});
  width: 100px;
  height: 100px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`;
const Name = styled.div`
  padding-right: 20px;
`;
