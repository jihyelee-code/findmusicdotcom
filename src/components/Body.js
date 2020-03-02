import React from "react";
import axios from "axios";
import styled from "styled-components";
import Reco from "./Reco";

const RECO = [
  "manhattans",
  "james brown",
  "fonsi",
  "eminem",
  "jovanotti",
  "ed sheeran"
];
const URL = "https://deezerdevs-deezer.p.rapidapi.com/search?";

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    this.scrollRef = React.createRef();
  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this.scrollHandler)
  }
  async componentDidMount() {
    const num = Math.floor(Math.random() * 6);
    const {
      data: { data }
    } = await axios.get(`${URL}`, {
      params: {
        q: RECO[num],
        limit: 40
      },
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "03afeef36cmsh1bdcf2e9a60f303p19457cjsn1f84e9465bd0"
      }
    });

    this.setState({
      posts: data,
      name: data[0].artist.name
    });
    window.addEventListener("scroll", this.scrollHandler);
  }

  scrollHandler = e => {
    return window.scrollY > 30
      ? (this.scrollRef.current.style.display = "block")
      : (this.scrollRef.current.style.display = "none");
  };
  clickHandler = e => {
    window.scroll({top:0, behavior:"smooth"})
  };
  render() {
    const {state} = this;
    return (
      <Container>
        <ScrollTop ref={this.scrollRef} onClick={this.clickHandler}>
          TOP
        </ScrollTop>
        <Recommend>
          {state.posts ? (
            <Div>
              <Title>{state.name}</Title>
            </Div>
          ) : null}
          <Albums>
            {state.posts?.map((each, index) => (
              <Reco
                key={each.id}
                id={index}
                title={each.title}
                preview={each.preview}
                album={each.album}
              ></Reco>
            ))}
          </Albums>
        </Recommend>
      </Container>
    );
  }
}
const ScrollTop = styled.button`
  font-size: 1rem;
  font-family: Cambria;
  background-color: white;
  border-radius: 20px;
  margin: 3px;
  border: 3px solid rgba(24, 21, 50, 0.55);
  width: 80px;
  outline: 0;
  cursor: pointer;
  position: -webkit-sticky;
  position: sticky;
  top: 65px;
  z-index: 1;
`;
const Container = styled.div`
  width: 100%;
  background-color: rgba(150, 150, 150, 0.6);
  color: rgb(40, 40, 40);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom:150px;
`;
const Recommend = styled.div`
  padding: 70px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Div = styled.div`
  width: 80%;
  display: flex;
`;
const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bolder;
  background-color: rgba(240, 240, 240, 0.85);
  width: max-content;
  padding: 20px 30px;
  border-radius: 35px;
  margin-bottom: 50px;
`;
const Albums = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 30px;
  justify-items: center;
  overflow-x: auto;
  padding: 50px 30px;
  background-color: rgba(240, 240, 240, 0.55);
  border-radius: 50px;
  @media (max-width: 599px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default Body;
