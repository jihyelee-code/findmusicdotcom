import React from "react";
import styled from "styled-components";
import Song from "../components/Song";
import axios from "axios";
import { Link } from "react-router-dom";

const URL = "https://deezerdevs-deezer.p.rapidapi.com/album/";
export class Album_title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      data: ""
    };
  }
  async componentDidMount() {
    const id = this.state.id;
    const { data } = await axios.get(`${URL}${id}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "03afeef36cmsh1bdcf2e9a60f303p19457cjsn1f84e9465bd0"
      }
    });
    this.setState({
      data: data
    });
  }
  render() {
    return (
      <Container>
        {this.state.data ? (
          <Div>
            <Poster poster={this.state.data.cover_medium}></Poster>
            <Info>
              <Title>{this.state.data.title}</Title>
              <Link
                to={`/artist/${this.state.data.artist.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Artist>Artist : {this.state.data.artist.name}</Artist>
              </Link>
              <Genres>
                Genres :{" "}
                {this.state.data.genres.data.map((each, index) => (
                  <SubGenres key={index}>
                    {this.state.data.genres.data.length !== index + 1
                      ? `${each.name} & `
                      : each.name}
                  </SubGenres>
                ))}
              </Genres>
              <Company>{this.state.data.label}</Company>
              <Release>Release Date : {this.state.data.release_date}</Release>
            </Info>
          </Div>
        ) : null}
        {this.state.data.tracks ? (
          <Songs>
            {this.state.data.tracks.data.map((each, index) => {
              return (
                <Song
                  key={index}
                  id={`$albumPage${index}`}
                  title={each.title}
                  preview={each.preview}
                  artist={each.artist.name}
                  album={this.state.data.cover_small}
                ></Song>
              );
            })}
          </Songs>
        ) : (
          <Loading>"Loading..."</Loading>
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100%;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  background-color: rgba(150, 150, 150, 0.6);
`;
const Loading = styled.div`
  width: 80%;
  background-color: rgba(240, 240, 240, 0.85);
  height: 25px;
  padding: 30px;
`;
const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  background-color: rgba(240, 240, 240, 0.85);
  width: 50%;
  padding: 30px 0;
  margin: 50px;
  @media (max-width:599px){
    width:90%;
  }
`;
const Poster = styled.div`
  background-image: url(${props => props.poster});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 180px;
  height: 180px;
  justify-self: center;
  box-shadow: 17px 16px 0px -7px rgba(30, 30, 30, 0.75);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  margin: 0 20px;
`;

const Title = styled.div`
  font-size: 25px;
`;
const Artist = styled.div`
  font-size: 20px;
`;
const Genres = styled.div`
  font-size: 17px;
`;
const SubGenres = styled.span``;
const Company = styled.span``;
const Release = styled.span``;
const Songs = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  overflow-x: auto;
  @media (max-width:599px){
    grid-template-columns:1fr;
    width:100%;
  }
`;

export default Album_title;
