import React from "react";
import styled from "styled-components";
import axios from "axios";
import Song from "../components/Song";
import Artist from "../components/Artist";
import Album from "../components/Album";

const URL = "https://deezerdevs-deezer.p.rapidapi.com/search?";
let currentPlayCheck = "";
let selectDatas = [];
class Result extends React.Component {
  constructor(props) {
    super(props);
    this.gotoSong = React.createRef();
    this.gotoArtist = React.createRef();
    this.gotoAlbum = React.createRef();
    this.state = {
      id: props.match.params.id,
      datas: [],
      page: 0,
      isLoading: true
    };
  }
  async componentDidMount() {
    const {
      data: { data }
    } = await axios.get(`${URL}`, {
      params: {
        q: this.state.id,
        limit: 50
      },
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "03afeef36cmsh1bdcf2e9a60f303p19457cjsn1f84e9465bd0"
      }
    });
    this.setState({
      datas: data
    });
    this.bySelect(10);

    const newMapAR = data.map(each => each.artist.id);
    const settedAR = new Set(newMapAR);
    const arrayedAR = Array.from(settedAR);
    for (let i = 0; i < arrayedAR.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (data[j].artist.id === arrayedAR[i]) {
          arrayedAR[i] = data[j].artist;
          break;
        }
      }
    }

    const newMapAB = data.map(each => each.album.id);
    const settedAB = new Set(newMapAB);
    const arrayedAB = Array.from(settedAB);
    for (let i = 0; i < arrayedAB.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (data[j].album.id === arrayedAB[i]) {
          arrayedAB[i] = data[j].album;
          break;
        }
      }
    }
    this.setState({
      artists: arrayedAR,
      albums: arrayedAB
    });
    currentPlayCheck = document.querySelectorAll("audio");
  }
  bySelect = num => {
    selectDatas = [];
    for (let i = 0; i < this.state.datas.length; i++) {
      let index = Math.floor(i.toString() / num);
      if (!selectDatas[index]) {
        selectDatas[index] = [];
      }
      selectDatas[index].push(this.state.datas[i]);
    }
    this.setState({
      isLoading: true
    });
  };
  checkNeedRefresh() {
    if (this.state.id !== this.props.match.params.id) {
      window.location.reload();
    }
  }
  topHandler = e => {
    window.scroll({ top: 0, behavior: "smooth" });
  };
  songHandler = e => {
    const distance = this.gotoSong.current.offsetTop - 140;
    window.scroll({ top: distance, behavior: "smooth" });
  };
  artistHandler = e => {
    const distance = this.gotoArtist.current.offsetTop - 140;
    window.scroll({ top: distance, behavior: "smooth" });
  };
  albumHandler = e => {
    const distance = this.gotoAlbum.current.offsetTop - 140;
    window.scroll({ top: distance, behavior: "smooth" });
  };
  selectHandler = e => {
    this.bySelect(e.target.value);
  };
  pageHandler = e => {
    currentPlayCheck.forEach(each => (each.paused ? null : each.pause()));
    currentPlayCheck = document.querySelectorAll("audio");
    this.setState({
      page: e.target.value - 1
    });
  };
  render() {
    this.checkNeedRefresh();
    const {
      state: { datas, isLoading }
    } = this;

    return (
      <Container>
        <Navigator>
          <Button onClick={this.topHandler}>TOP</Button>
          <Button onClick={this.songHandler}>BY SONGS</Button>
          <Button onClick={this.artistHandler}>BY ARTISTS</Button>
          <Button onClick={this.albumHandler}>BY ALBUMS</Button>
        </Navigator>
        <Div>
          <Sort ref={this.gotoSong}>BY SONGS</Sort>
          <Select onChange={this.selectHandler}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </Select>
          {selectDatas?.map((each, index) => (
            <PageButton
              key={index}
              onClick={this.pageHandler}
              value={index + 1}
            >
              {index + 1}
            </PageButton>
          ))}
        </Div>
        <Songs>
          {selectDatas.length > 0 ? (
            selectDatas[this.state.page]?.map(
              (each, index) => {
                return (
                  <Song
                    key={index}
                    id={`${each.id}`}
                    title={each.title}
                    preview={each.preview}
                    artist={each.artist.name}
                    album={each.album.cover_medium}
                  ></Song>
                );
              }
            )
          ) : isLoading ? (
            <Loading>Loading..</Loading>
          ) : (
            <NoResult>No result found.</NoResult>
          )}
        </Songs>
        <Div>
          <Sort ref={this.gotoArtist}>BY ARTISTS</Sort>
        </Div>
        <Artists>
          {this.state.artists?.length > 0 ? (
            this.state.artists.map((each, index) => {
              return (
                <Artist
                  key={index}
                  id={index}
                  artist={each.id}
                  name={each.name}
                  poster={each.picture_medium}
                ></Artist>
              );
            })
          ) : isLoading ? (
            <Loading>Loading..</Loading>
          ) : (
            <NoResult>No result found.</NoResult>
          )}
        </Artists>
        <Div>
          <Sort ref={this.gotoAlbum}>BY ALBUMS</Sort>
        </Div>
        <Albums>
          {this.state.albums?.length > 0 ? (
            this.state.albums.map((each, index) => (
              <Album
                key={index}
                id={index}
                album={each.id}
                title={each.title}
                poster={each.cover_medium}
              ></Album>
            ))
          ) : isLoading ? (
            <Loading>Loading..</Loading>
          ) : (
            <NoResult>No result found.</NoResult>
          )}
        </Albums>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(150, 150, 150, 0.6);
  color: rgb(40, 40, 40);
  min-height: 100vh;
  padding-bottom: 50px;
`;
const Navigator = styled.div`
  /* background-color:black; */
  padding-top: 10px;
  height: 2.5rem;
  width: 100%;
  position: -webkit-sticky;
  position: sticky;
  top: 47px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
const Button = styled.button`
  font-size: 1rem;
  font-family: Cambria;
  background-color: white;
  border-radius: 20px;
  margin: 10px;
  padding: 0 1rem;
  border: 3px solid rgba(24, 21, 50, 0.55);
  width: 150px;
  /* height:1.6rem; */
  outline: 0;
  cursor: pointer;
`;
const PageButton = styled.button`
  font-size: 1rem;
  font-family: Cambria;
  background-color: white;
  border-radius: 20px;
  margin: 3px;
  border: 3px solid rgba(24, 21, 50, 0.55);
  width: 40px;
  outline: 0;
  cursor: pointer;
  text-align: center;
`;
const Select = styled.select`
  font-size: 1rem;
  font-family: Cambria;
  background-color: white;
  border-radius: 20px;
  margin: 10px;
  border: 3px solid rgba(24, 21, 50, 0.55);
  width: 70px;
  outline: 0;
  cursor: pointer;
  text-align: center;
`;
const Songs = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  overflow-x: auto;
`;
const Albums = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  overflow-x: auto;
`;
const Artists = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  overflow-x: auto;
`;
const Div = styled.div`
  width: 80%;
`;
const Sort = styled.h1`
  font-size: 1rem;
  margin: 20px 0;
  font-weight: bolder;
  background-color: rgba(240, 240, 240, 0.85);
  width: max-content;
  padding: 0.5rem;
  border-radius: 25px;
  color: rgb(40, 40, 40);
  margin-top: 50px;
  align-self: flex-start;
`;

const NoResult = styled.div`
  width: 100%;
  background-color: rgba(240, 240, 240, 0.55);
  padding: 2rem;
  color: rgb(40, 40, 40);
`;
const Loading = styled.div`
  width: 100%;
  background-color: rgba(240, 240, 240, 0.55);
  padding: 2rem;
  color: rgb(40, 40, 40);
`;
export default Result;
