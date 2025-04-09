import React, { useState } from "react";
import caffeineDatabase from "../../db";
import api from "../../utils/api";
import styled from "styled-components";
import coffeeGif from "../../assets/giphy.gif";
import Button from "../../components/Button";


const Add = ({ setDrinkList }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDrink, setSelectedDrink] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleDrinkChange = (event) => {
    setSelectedDrink(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const selectedCategoryData = caffeineDatabase.find(
    (item) => item.category === selectedCategory
  );
  
  const selectedDrinkData = selectedCategoryData?.drinks.find(
    (item) => item.name === selectedDrink
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const drinkData = {
      category: selectedCategory,
      name: selectedDrink,
      size: selectedSize,
      caffeineContent: selectedDrinkData.size[selectedSize],
    };

    try {
      const response = await api.post("/", drinkData);
      console.log("Drink added:", response.data);

      setDrinkList((prevList) => [...prevList, response.data.data]);

    } catch (err) {
      console.error("Error adding drink:", err);
  
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Hey, What did you drink?</h2>
        <label htmlFor="category">Category</label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option>Choose</option>
          {caffeineDatabase.map((item) => (
            <option key={item.category} value={item.category}>
              {item.category}
            </option>
          ))}
        </select>

        {selectedCategory && (
          <>
            <label htmlFor="drink">Drink</label>
            <select value={selectedDrink} onChange={handleDrinkChange}>
              <option>Choose</option>
              {selectedCategoryData?.drinks.map((drink) => (
                <option key={drink.name} value={drink.name}>
                  {drink.name}
                </option>
              ))}
            </select>
          </>
        )}

        {selectedDrink && selectedDrinkData && (
          <>
            <label htmlFor="size">Size</label>
            <select value={selectedSize} onChange={handleSizeChange}>
              <option>Choose</option>
              {Object.keys(selectedDrinkData.size).map((sizeKey) => (
                <option key={sizeKey} value={sizeKey}>
                  {sizeKey} - {selectedDrinkData.size[sizeKey]} mg
                </option>
              ))}
            </select>
          </>
        )}

        <Button type="submit" disabled={!selectedCategory || !selectedDrink || !selectedSize}>
          Submit
        </Button>
      </Form>

      {/* <CoffeeGif src={coffeeGif} alt="Coffee gif" /> */}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:50px;
  align-items: center;
  width: 100%;
  max-height: 100vh;

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center; 
  gap: 20px;
  color:#47261f;
  font-size:1.5rem;
`;

// const CoffeeGif = styled.img`
//   width: 300px;
//   margin-top: 20px; 
// `;

export default Add;