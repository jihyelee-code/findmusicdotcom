import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';

let currentAudio = "";
class Song extends React.Component {
  constructor(props) {
    //id, title, preview, artist, album
    super(props);
    this.state = {
      audio: false
    };
    this.audioRef = React.createRef();
  }
  clickHandler = e => {
    e.preventDefault();
    this.audioRef.current.play();
    // const audio = e.currentTarget.nextElementSibling;
    // // audio play
    // if (this.state.audio) {
    //   this.setState({
    //     audio: false
    //   });
    //   audio.pause();
    // } else {
    // //non audio play
    //   if (currentAudio) {
    //     const preAudio = currentAudio;
    //     // if (preAudio) {
    //       preAudio.pause();
    //     // }
    //   }
    //   currentAudio = audio;
    //   this.setState({
    //     audio: true
    //   });
    //   audio.play();
    // }
  };
  stopHandler = e => {
    e.preventDefault();
    this.setState({
      audio: false
    });
  };
  render() {
    const { props } = this;
    return (
      <Container>
        <Poster id={props.id} poster={props.album}></Poster>
        <Title>{props.title}</Title>
        <Singer>{props.artist}</Singer>
        <Preview>
          <Button onClick={this.clickHandler}>
            <span role="img" aria-label="img">
              🎼
            </span>
          </Button>
          <audio id={props.id} ref={this.audioRef} onEnded={this.stopHandler} onPause={this.stopHandler} >
            <source src={props.preview}></source>
          </audio>
        </Preview>
      </Container>
    );
  }
}
Song.propTypes = {
  preview:PropTypes.string.isRequired,
  id : PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  title:PropTypes.string.isRequired,
  album:PropTypes.string.isRequired

}
const Container = styled.div`
  background-color: rgba(240, 240, 240, 0.85);
  width: 100%;
  display: grid;
  grid-template-columns: 0.5fr 2.5fr 1.8fr .2fr;
  grid-column-gap:20px;
  align-items: center;
  font-size: 1.1rem;
`;
const Poster = styled.div`
  width: 70px;
  height: 70px;
  background-image: url(${props => props.poster});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Title = styled.span`
`;
const Singer = styled.span`
  text-align: center;
`;
const Preview = styled.div`
`;
const Button = styled.button`
  background-color: rgba(0, 0, 0, 0);
  border: 0;
  outline: 0;
  cursor: pointer;
  font-size: 1.4rem;
  padding-right:20px;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(1);
  }
`;
export default Song;
