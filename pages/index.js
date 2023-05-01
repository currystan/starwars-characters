import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Main = styled.div`
  height: 100%;
  width: 1200px;
  padding: 10px;
  margin 0 auto;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
`;

const Card = styled.div`
  color: #fff;
  background-color: ${(props) => (props.isSelected ? "#063970" : "#333")};
  margin: 10px;
  min-width: 120px;
  border-radius: 5px;
  overflow: hidden;
  padding: 10px;
  cursor: pointer;
`;

const CharacterImage = styled.img`
  width: 120px;
`;

const CharacterName = styled.div``;

const BottomSection = styled.div`
  padding: 20px;
`;

const MainInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.img`
  flex: 1;
  padding: 20px;
  border-radius: 10px;
`;

const CharacerInfo = styled.div`
  flex: 3;
  color: #fff;
  margin: 20px;
  padding: 20px;
  background-color: #333;
  border-radius: 10px;
`;

const InfoData = styled.div`
  display: flex;
  flex-direction: row;
`;

const InfoLabel = styled.div`
  padding: 10px;
  font-weight: 600;
`;

const InfoContent = styled.div`
  padding: 10px;
`;

const characterCard = ({ data, isSelected, selectCharacter }) => {
  const { image, name } = data;
  return (
    <Card
      isSelected={isSelected}
      key={name}
      onClick={() => {
        selectCharacter(name);
      }}
    >
      <CharacterImage src={image} />
      <CharacterName>{name}</CharacterName>
    </Card>
  );
};

const Info = ({ value, label }) => {
  return (
    <InfoData>
      <InfoLabel>{label}:</InfoLabel>
      <InfoContent>{value}</InfoContent>
    </InfoData>
  );
};

const CharacterInfo = ({ data }) => {
  const {
    image,
    name,
    gender,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
  } = data;
  return (
    <MainInfoContainer>
      <ImageContainer src={image} />
      <CharacerInfo>
        <Info label={"Name"} value={name} />
        <Info label={"Gender"} value={gender} />
        <Info label={"Birth Year"} value={birth_year} />
        <Info label={"Height"} value={`${height}cm`} />
        <Info label={"Weight"} value={`${mass}kg`} />
        <Info label={"Hair Color"} value={hair_color} />
        <Info label={"Skin Color"} value={skin_color} />
        <Info label={"Eye Color"} value={eye_color} />
      </CharacerInfo>
    </MainInfoContainer>
  );
};

function Home() {
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    await axios("/api/characters").then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Main>
        <TopSection>
          {(data ?? []).map((e) =>
            characterCard({
              data: e,
              isSelected: e.name == selected,
              selectCharacter: setSelected,
            })
          )}
        </TopSection>
        <BottomSection>
          {selected && (
            <CharacterInfo data={data.filter((e) => e.name == selected)[0]} />
          )}
        </BottomSection>
      </Main>
    </>
  );
}

export default Home;
