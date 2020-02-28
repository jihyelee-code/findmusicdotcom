import React from "react";
import styled from "styled-components";
import Song from "../components/Song";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
const CancelToken = axios.CancelToken;
let cancel;
export class Artist_title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
    };
    this._isMounted = false;
  }
  componentWillUnmount(){
    cancel();
    this._isMounted = false;
  }
  async componentDidMount() {
    this._isMounted = true;
    const id = this.state.id;
    const proxyURL = "https://cors-anywhere.herokuapp.com/";
    const URL = `https://api.deezer.com/artist/${id}/top?`;
    const {
      data: { data }
    } = await axios.get(proxyURL + URL, {
      params:{limit:50},
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "03afeef36cmsh1bdcf2e9a60f303p19457cjsn1f84e9465bd0"
      },
      calcelToken: new CancelToken (function executor(c){
        cancel=c;
      })
    });

    // organize data
    const mapped = data.map(each => each.album.title);
    const setted = new Set(mapped);
    const newArray = Array.from(setted);
    newArray.sort((a, b) => (a > b ? 1 : -1));
    this._isMounted&&this.setState({
      data: data,
      selected: data,
      album: newArray
    });
  
  }
  //go to top
  topHandler = e => {
    window.scroll({ top: 0, behavior: "smooth" });
  };
  //user change album 
  changeHandler = e => {
    this._isMounted&&this.setState({
      selected: this.state.data
    });
    if (e.target.value !== "ALL") {
      const selected = this.state.data.filter(
        each => each.album.title === e.target.value
      );
      this._isMounted&&this.setState({
        selected
      });

    }
  };
  // reLoadHandler = e => {
    
  // };
  render() {
    return (
      <Container>
        <Navigator>
          <Button onClick={this.topHandler}>TOP</Button>
          <Select name="Album" onChange={this.changeHandler}>
            <option value="ALL">ALL</option>
            {this.state.album?.map((each, index) => (
              <option key={index} value={each}>
                {each}
              </option>
            ))}
          </Select>
        </Navigator>
        <Songs>
          {this.state.selected ? (
            this.state.selected.map((each, index) => (
              <Section key={index}>
                <Info>
                  <Div>
                    <Title>{each.album.type} : </Title>
                    <Link
                      to={`/album/${each.album.id}`}
                      style={{ textDecoration: "none", color: "black",  fontWeight:"bolder"}}
                    >
                      <Content>{each.album.title}</Content>
                    </Link>
                  </Div>
                  <Div>
                    <Title>Contributors : </Title>
                    {each.contributors.map((ele, index) =>
                      index < 2 ? (
                        // <Link
                        //   to={`/artist/${ele.id}`}
                        //   key={index}
                        //   style={{ textDecoration: "none", color: "black" }}
                        // >
                          <Content key={index}>
                            {index < each.contributors.length - 1 && index < 1
                              ? `${ele.name} & `
                              : ele.name}
                          </Content>
                        // </Link>
                      ) : null
                    )}
                  </Div>
                </Info>
                <Song
                  key={index}
                  id={`artistPage${each.id}`}
                  title={each.title}
                  preview={each.preview}
                  artist={each.artist.name}
                  album={each.album.cover_small}
                ></Song>
              </Section>
            ))
          ) : (
            <Loading>"Loading..."</Loading>
          )}
        </Songs>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100%;
  min-height: 70vh;
  background-color: rgba(150, 150, 150, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Navigator = styled.div`
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
const Select = styled.select`
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
  text-align: center;
`;
const Loading = styled.div`
  width: 80%;
  background-color: rgba(240, 240, 240, 0.85);
  height: 25px;
  padding: 30px;
`;
const Songs = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  padding: 50px 0;
`;
const Section = styled.div``;
const Div = styled.div`
  padding:0 10px;
`;
const Info = styled.div`
  background-color: rgba(240, 240, 240, 0.85);
  display: grid;
  grid-template-columns: 0.7fr 1.3fr;
  justify-items: flex-start;
  align-content: center;
  padding: 10px 0;
  min-height: 70px;
  border-bottom: 1px solid darkgray;
`;
const Title = styled.div`
  font-size: 1rem;
  font-weight: border;
  padding-bottom: 5px;
`;
const Content = styled.span`
  font-size: 1rem;
`;

export default withRouter(Artist_title);
