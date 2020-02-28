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
  state = {
    posts: []
  };

  async componentDidMount() {
    const num = Math.floor(Math.random() * 6);
    const {
      data: { data }
    } = await axios.get(`${URL}`, {
      params: {
        q: RECO[num],
        limit: 20
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
  }
  render() {
    return (
      <Container>
        <Recommend>
          {this.state.posts ? (
            <Div>
              <Title>Today's SINGER</Title>
              <SubTitle>{this.state.name}</SubTitle>
            </Div>
          ) : null}
          <Albums>
            {this.state.posts?.map((each, index) => (
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

const Container = styled.div`
  width: 100%;
  background-color: rgba(150, 150, 150, 0.6);
  color: rgb(40, 40, 40);
  min-height: 100vh;
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
`;
const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: bolder;
  background-color: rgba(240, 240, 240, 0.85);
  width: max-content;
  padding: .7rem;
  border-radius:25px;
`;
const SubTitle = styled.h1`
  font-size: 1rem;
  margin: 20px;
  font-weight: bolder;
  background-color: rgba(240, 240, 240, 0.85);
  width: max-content;
  padding: .5rem;
  border-radius:25px;
`;
const Albums = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 30px;
  justify-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 50px 30px;
  /* background-color: rgba(240, 240, 240, 0.45); */
  background-color: rgba(240, 240, 240, 0.55);
  border-radius:50px;
`;
export default Body;
