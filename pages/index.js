import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart, AiFillDelete } from "react-icons/ai";

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
  position: relative;
  @media (max-width: 768px) {
    min-width: 180px;
  }
`;

const CharacterImage = styled.img`
  width: 120px;
  @media (max-width: 768px) {
    width: 180px;
  }
`;

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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 768px) {
    font-size: 30px;
  }
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

const ActionContainer = styled.div`
  justify-self: flex-end;
`;

const characterCard = ({ data, isSelected, selectCharacter }) => {
  const { image, name, is_fave } = data;
  return (
    <Card
      isSelected={isSelected}
      key={name}
      onClick={() => {
        selectCharacter(name);
      }}
    >
      {is_fave && (
        <AiFillHeart
          size="25px"
          onClick={() => toggleFave(name)}
          style={{
            cursor: "pointer",
            position: "absolute",
          }}
          color="red"
        />
      )}
      <CharacterImage src={image} />
      <div>{name}</div>
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

const CharacterInfo = ({ data, toggleFave, deleteChar }) => {
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
    is_fave,
  } = data;
  return (
    <MainInfoContainer>
      <ImageContainer src={image} />
      <CharacerInfo>
        <div>
          <Info label={"Name"} value={name} />
          <Info label={"Gender"} value={gender} />
          <Info label={"Birth Year"} value={birth_year} />
          <Info label={"Height"} value={`${height}cm`} />
          <Info label={"Weight"} value={`${mass}kg`} />
          <Info label={"Hair Color"} value={hair_color} />
          <Info label={"Skin Color"} value={skin_color} />
          <Info label={"Eye Color"} value={eye_color} />
        </div>
        <ActionContainer>
          {is_fave ? (
            <AiFillHeart
              size="2em"
              onClick={() => toggleFave(name)}
              style={{ cursor: "pointer" }}
              color="red"
            />
          ) : (
            <AiOutlineHeart
              size="2em"
              onClick={() => toggleFave(name)}
              style={{ cursor: "pointer" }}
            />
          )}
          <AiFillDelete
            size="2em"
            onClick={() => deleteChar(name)}
            style={{ cursor: "pointer", paddingLeft: "10px" }}
          />
        </ActionContainer>
      </CharacerInfo>
    </MainInfoContainer>
  );
};

function Home(props) {
  const [data, setData] = useState(props.data);
  const [selected, setSelected] = useState("");
  const [isLoading, setLoading] = useState(false);

  const toggleFave = (name) => {
    let newData = [...data];
    newData.forEach((char) => {
      if (char.name == name) {
        char.is_fave = !!!char.is_fave;
      }
    });
    setData(newData);
    setSelected(name);
  };

  const deleteChar = (name) => {
    let newData = [...data];
    newData = newData.filter((char) => char.name != name);
    setData(newData);
    setSelected("");
  };

  return (
    <>
      <Head>
        <title>Star Wars Characters</title>
      </Head>
      <Main>
        <TopSection>
          {(data ?? [])
            .sort((a, b) => {
              return a.is_fave === b.is_fave ? 0 : a.is_fave ? -1 : 1;
            })
            .map((e) =>
              characterCard({
                data: e,
                isSelected: e.name == selected,
                selectCharacter: setSelected,
              })
            )}
        </TopSection>
        <BottomSection>
          {selected && (
            <CharacterInfo
              data={data.filter((e) => e.name == selected)[0]}
              toggleFave={toggleFave}
              deleteChar={deleteChar}
            />
          )}
        </BottomSection>
      </Main>
    </>
  );
}

export default Home;

export async function getStaticProps() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const res = await fetch(
    "https://develop.d3t5w79d05f5ds.amplifyapp.com/api/characters",
    requestOptions
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
