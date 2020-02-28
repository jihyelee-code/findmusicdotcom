import React from "react";
import styled from "styled-components";
let currentAudio = "";
class Reco extends React.Component {
  constructor(props) {
    //title, preview, album
    super(props); //id
    this.state = {
      audio: false
    };
  }
  
  enterHandler = e => {
    return this.setState({
      hover: true
    });
  };

  leaveHandler = e => {
    return this.state.audio
      ? null
      : this.setState({
          hover: false
        });
  };
  clickHandler = e => {
    const audio = e.currentTarget.nextElementSibling;
    //yes music before
    if (currentAudio) {
      //pass to pre
      const preAudio = currentAudio;
      preAudio.pause();
    }
    //set as now
    currentAudio = audio;
    audio.addEventListener("ended", this.endedHandler);
    audio.addEventListener("pause", this.pauseHandler);
    audio.play();
    this.setState({
      audio: true
    });
  };
  endedHandler = e => {
    // console.log("ENDED");
    currentAudio = "";
  };
  pauseHandler = e => {
    // console.log("-----PAUSED");
    this.setState({
      audio: false,
      hover: false
    });
  };
  render() {
    return (
      <Container
        poster={this.props.album.cover_medium}
        onMouseEnter={this.enterHandler}
        onMouseLeave={this.leaveHandler}
      >
        <Title>
          {this.state.hover ? (
            <div>
              <Span>{this.props.album.title}</Span>
              <Button onClick={this.clickHandler}>
                <span role="img" aria-label="img">
                  🎼
                </span>
              </Button>
              <audio className="audio" id={`reco${this.props.id}`}>
                <source src={`${this.props.preview}`}></source>
              </audio>
            </div>
          ) : (
            this.props.title
          )}
        </Title>
      </Container>
    );
  }
}
const Container = styled.div`
  width: 160px;
  height: 200px;
  background: #333 url(${props => props.poster}) no-repeat center center/cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 500px;
  box-shadow: 17px 16px 0px -7px rgba(30,30,30,0.75);
`;

const Title = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(20, 20, 20, 0.5);
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.03);
    font-size: 1.9rem;
    background-color: rgba(240, 240, 240, 0.5);
  }
`;
const Button = styled.button`
  font-size: 2rem;
  background-color: rgba(0, 0, 0, 0);
  outline: 0;
  border: 0;
  transition: all 0.3s;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
  &:active {
    transform: scale(1);
  }
`;
const Span = styled.span`
  font-size: 1rem;
  color: darkslategray;
  background-color: rgba(240, 240, 240, 0.7);
  padding: 0.2rem;
  border-radius: 5px;
  font-weight: 500px;
  display: block;
`;
export default Reco;
