import React from "react";
import styled from "styled-components";
import axios from "axios";
import Song from "../components/Song";
import Artist from "../components/Artist";
import Album from "../components/Album";
let cancel;
const CancelToken = axios.CancelToken;
const URL = "https://deezerdevs-deezer.p.rapidapi.com/search?";
// let currentPlayCheck = "";
let selectSongDatas = [];
let selectArtistDatas = [];
let selectAlbumDatas = [];
let preSongButton = "";
let preArtistButton = "";
let preAlbumButton = "";
class Result extends React.Component {
  constructor(props) {
    super(props);
    this.gotoSong = React.createRef();
    this.gotoArtist = React.createRef();
    this.gotoAlbum = React.createRef();
    this.state = {
      id: props.match.params.id,
      datas: [],
      songPage: 0,
      artistPage: 0,
      albumPage: 0,
      isLoading: true
    };
    this._isMounted = false;
  }
  componentWillUnmount() {
    this._isMounted = false;
    cancel();
  }
  async componentDidMount() {
    this._isMounted = true;
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
      },
      cancelToken: new CancelToken(c => {
        cancel = c;
      })
    });
    this._isMounted &&
      this.setState({
        datas: data
      });
    //organize artist data
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
    //organize album data
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
    //save artist, album data
    this._isMounted &&
      this.setState({
        artists: arrayedAR,
        albums: arrayedAB
      });
    //list with default value 10 items
    selectSongDatas = this.bySelect(selectSongDatas, 10, this.state.datas);
    selectArtistDatas = this.bySelect(
      selectArtistDatas,
      10,
      this.state.artists
    );
    selectAlbumDatas = this.bySelect(selectAlbumDatas, 10, this.state.albums);

    this._isMounted &&
      this.setState({
        isLoading: false
      });
  }
  //user click 10/20/30 list item counts
  bySelect = (anArray, num, stateLocation) => {
    anArray = [];
    for (let i = 0; i < stateLocation.length; i++) {
      let index = Math.floor(i.toString() / num);
      if (!anArray[index]) {
        anArray[index] = [];
      }
      anArray[index].push(stateLocation[i]);
    }

    return anArray;
  };

  checkNeedRefresh() {
    if (this.state.id !== this.props.match.params.id) {
      window.location.reload();
    }
  }
  //go to top
  topHandler = e => {
    window.scroll({ top: 0, behavior: "smooth" });
  };
  //go to song section
  songHandler = e => {
    const distance = this.gotoSong.current.offsetTop - 140;
    window.scroll({ top: distance, behavior: "smooth" });
  };
  //go to artist section
  artistHandler = e => {
    const distance = this.gotoArtist.current.offsetTop - 140;
    window.scroll({ top: distance, behavior: "smooth" });
  };
  //go to album section
  albumHandler = e => {
    const distance = this.gotoAlbum.current.offsetTop - 140;
    window.scroll({ top: distance, behavior: "smooth" });
  };
  //song list count handler
  selectSongHandler = e => {
    this._isMounted &&
      this.setState({
        isLoading: true
      });
    selectSongDatas = this.bySelect(
      selectSongDatas,
      e.target.value,
      this.state.datas
    );
    this._isMounted &&
      this.setState({
        isLoading: false
      });
  };
  //artist list count handler
  selectArtistHandler = e => {
    this._isMounted &&
      this.setState({
        isLoading: true
      });
    selectArtistDatas = this.bySelect(
      selectArtistDatas,
      e.target.value,
      this.state.artists
    );
    this._isMounted &&
      this.setState({
        isLoading: false
      });
  };
  //album list count handler
  selectAlbumHandler = e => {
    this._isMounted &&
      this.setState({
        isLoading: true
      });
    selectAlbumDatas = this.bySelect(
      selectAlbumDatas,
      e.target.value,
      this.state.albums
    );
    this._isMounted &&
      this.setState({
        isLoading: false
      });
  };

  buttonBackgroundChanger(preButton, target) {
    if (!preSongButton) {
      preButton = target;
    } else {
      preButton.style.backgroundColor = "white";
      preButton = target;
    }
    target.style.backgroundColor = "rgb(200,200,200)";
    //stop all audio
    document
      .querySelectorAll("audio")
      .forEach(each => {
        if(!each.paused) {
          each.pause();
          each.controls=false;
        }});
    return preButton;
  }
  //song pages
  songPageHandler = e => {
    this._isMounted &&
      this.setState({
        songPage: e.target.value - 1
      });
    preSongButton = this.buttonBackgroundChanger(preSongButton, e.target);
  };
  //artist pages
  artistPageHandler = e => {
    this._isMounted &&
      this.setState({
        artistPage: e.target.value - 1
      });
    preArtistButton = this.buttonBackgroundChanger(preArtistButton, e.target);
  };
  //album pages
  albumPageHandler = e => {
    this._isMounted &&
      this.setState({
        albumPage: e.target.value - 1
      });
    preAlbumButton = this.buttonBackgroundChanger(preAlbumButton, e.target);
  };

  render() {
    this.checkNeedRefresh();
    const {
      state: { isLoading }
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
          <Select onChange={this.selectSongHandler}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </Select>
          {selectSongDatas?.map((each, index) => (
            <PageButton
              key={index}
              id={`songPageButton${index}`}
              onClick={this.songPageHandler}
              value={index + 1}
            >
              {index + 1}
            </PageButton>
          ))}
        </Div>
        <Songs>
          {selectSongDatas.length > 0 ? (
            selectSongDatas[this.state.songPage]?.map((each, index) => {
              return (
                <Song
                  key={index}
                  id={`resultSongPage${each.id}`}
                  title={each.title}
                  preview={each.preview}
                  artist={each.artist.name}
                  album={each.album.cover_medium}
                ></Song>
              );
            })
          ) : isLoading ? (
            <Loading>Loading..</Loading>
          ) : (
            <NoResult>No result found.</NoResult>
          )}
        </Songs>
        <Div>
          <Sort ref={this.gotoArtist}>BY ARTISTS</Sort>
          <Select onChange={this.selectArtistHandler}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </Select>
          {selectArtistDatas?.map((each, index) => (
            <PageButton
              key={index}
              id={`artistPageButton${index}`}
              onClick={this.artistPageHandler}
              value={index + 1}
            >
              {index + 1}
            </PageButton>
          ))}
        </Div>
        <Artists>
          {selectArtistDatas?.length > 0 ? (
            selectArtistDatas[this.state.artistPage]?.map((each, index) => {
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
          <Select onChange={this.selectAlbumHandler}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </Select>
          {selectAlbumDatas?.map((each, index) => (
            <PageButton
              key={index}
              id={`albumPageButton${index}`}
              onClick={this.albumPageHandler}
              value={index + 1}
            >
              {index + 1}
            </PageButton>
          ))}
        </Div>
        <Albums>
          {selectAlbumDatas?.length > 0 ? (
            selectAlbumDatas[this.state.albumPage]?.map((each, index) => {
              return (
                <Album
                  key={index}
                  id={index}
                  album={each.id}
                  title={each.title}
                  poster={each.cover_medium}
                ></Album>
              );
            })
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
