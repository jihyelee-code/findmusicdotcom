import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
const Container = styled.div`
  padding-top: 50px;
  width: 100%;
  height: 100px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: -webkit-sticky;
  position: sticky;
  top: -80px;
  background-color: rgba(240, 240, 240, 0.85);
  order: 1;
  z-index: 1;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  font-size: 32px;
  color: black;
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  width: 300px;
  height: 32px;
  font-size: 1.2rem;
  font-weight: 500px;
  border-radius: 30px;
  border: 3px solid rgba(24, 21, 50, 0.55);
  outline: none;
  margin: 20px 0;
  color: #333;
  background-color: rgba(250, 250, 250, 0.85);
`;
const SearchBar = styled.input`
  background-color: rgba(0, 0, 0, 0);
  margin-right: 10px;
  border: 0;
  outline: 0;
  width: 100%;
  height: inherit;
`;
const Button = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  border: 0;
  outline: 0;
  color: white;
  font-weight: border;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(1);
  }
`;

class Home extends React.Component {
  state = {
    input: ""
  };
  
  //user type input
  keyChangeHandler = e => {
    // e.preventDefault();
    this.setState({
      input: e.target.value
    });
  };
  
  //user press enter
  keyDownHandler = e => {
    if (e.keyCode === 13) {
      const go = document.querySelector("#go");
      go.parentElement.click();
      e.target.value = "";
    }
  };

  render() {
    return (
      <Container>
        <Header>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Title>FIND MUSIC . COM</Title>
          </Link>
          <Search>
            <SearchBar
              id="searchBar"
              onChange={this.keyChangeHandler}
              onKeyDown={this.keyDownHandler}
            ></SearchBar>
            <Link to={`/${this.state.input}`}>
              <Button id="go">GO</Button>
            </Link>
          </Search>
        </Header>
      </Container>
    );
  }
}

export default Home;
