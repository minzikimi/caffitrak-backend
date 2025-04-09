import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import styled from 'styled-components';
import coffeeIcon from "../../assets/coffee.svg";
import teaIcon from "../../assets/tea.svg";
import cokeIcon from "../../assets/coke.svg";
import energydrinkIcon from "../../assets/energy-drink.svg"
import Button from '../../components/Button';


const Detail = () => {
  const [drinkList, setDrinkList] = useState([]);

  const getDrinks = async () => {
    try {
      const response = await api.get("/"); // fetching drinks from the backend
      setDrinkList(response.data.data);
    } catch (error) {
      console.error("Error fetching drinks:", error);
    }
  };


  const deleteDrinks = async () =>{
    try{

    }
    catch(err){
      
    }
  }

  useEffect(() => {
    getDrinks();
  }, []);

  const categoryIcons = {
    "Coffee": coffeeIcon,
    "Tea": teaIcon,
    "Energy Drink": energydrinkIcon,
    "Carbonated Drinks": cokeIcon,
  };

  return (
    <main>
    <Container>
      <Heading>
        <HeadingTitle>Drink Details</HeadingTitle>
      </Heading>

      <div>
        {Array.isArray(drinkList) && drinkList.length > 0 ? (
          <DrinkList>
            {drinkList.map((drink) => (
              <DrinkItem key={drink._id}>

          <Icon src={categoryIcons[drink.category]} alt={drink.category} />
                {drink.category} - {drink.name} ({drink.size}) - {drink.caffeineContent} mg
                <Button>Remove</Button>
             </DrinkItem>
            ))}
          </DrinkList> 
        ) : (
          <p>No drinks added yet.</p>
        )}
      </div>
    </Container>
    </main>
  );
};



const Container = styled.div`
  width: 100%;
    display:flex;
    flex-direction : column;
    justify-content:center;
    align-items:center;
    margin-top:3rem;

`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const HeadingTitle = styled.h1`
  transform: rotate(2deg);
  padding: 0.2rem 1.2rem;
  border-radius: 20% 5% 20% 5%/5% 20% 25% 20%;
  background-color:#F7F3E2;
  color: #47261f;
  font-size: 1.5rem;
`;

const DrinkList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
`;

const DrinkItem = styled.li`
  display: flex; 
  align-items: center; 
  gap: 1rem; 
  font-size: 1.2rem;
  padding: 0.5rem;
`;

const Icon = styled.img`
  width:50px; 
`

export default Detail;
