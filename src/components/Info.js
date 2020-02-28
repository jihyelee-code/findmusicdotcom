import React from "react";
import styled from "styled-components";

export default () => {
  return (
    <Container>
      <Section>
        <Title>CONTACT</Title>
        <Content>JI HYE LEE</Content>
        <Content>sophitalia121@gmail.com</Content>
      </Section>
      <Section>
        <Title>USE</Title>
        <Content>DEEZER API</Content>
        <Content>RAPID API</Content>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: rgba(240, 240, 240, 0.85);
  color: rgb(40, 40, 40);
  display: flex;
  justify-content:center;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  padding:30px;
`;
const Title = styled.span`
  font-size: 1rem;
`;
const Content = styled.span`
padding-top:10px;
  font-size: .9rem;
`;
