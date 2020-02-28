import React from "react";
import styled from "styled-components";

let currentAudio = "";
class Song extends React.Component {
  constructor(props) {
    //id, title, preview, artist, album
    super(props);
    this.state = {
      audio: false
    };
  }
  clickHandler = e => {
    e.preventDefault();
    const audio = e.currentTarget.nextElementSibling;
    console.log('-----------clicked', audio)
    if (this.state.audio) {
      this.setState({
        audio: false
      });
      audio.pause();
    } else {
      if (currentAudio) {
        const preAudio = document.querySelector(`#${currentAudio}`);
        console.log('preAudio', preAudio)
        if (preAudio) {
          preAudio.pause();
          console.log(preAudio,' paused')
        }
      }
      currentAudio = audio.id;
      console.log('new Audio', currentAudio)
      this.setState({
        audio: true
      });
      audio.play();
      console.log(currentAudio, 'played')
      audio.addEventListener("ended", this.stopHandler);
      audio.addEventListener("pause", this.stopHandler);
    }
  };
  stopHandler = e => {
    e.preventDefault();
    this.setState({
      hover: false,
      audio: false
    });
  };
  render() {
    const { props } = this;
    // console.log(props.preview)
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
          <audio id={`audioSong${props.id}`}>
            <source src={props.preview}></source>
          </audio>
        </Preview>
      </Container>
    );
  }
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
  /* background-color:yellow; */
`;
const Singer = styled.span`
  text-align: center;
  /* background-color:pink; */
`;
const Preview = styled.div`
  /* background-color:black; */
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
