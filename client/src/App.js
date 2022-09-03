import React, { useState, useEffect } from 'react'
import "./App.css";
import AutocompleteComponent from "./components/Autocomplete";
import displayCards from "./components/DisplayCards"

const allRarities = ['Common', 'Uncommon', 'Rare', 'Mythic Rare', 'Special', 'Basic Land']

function App() {
  const [allCards, setAllCards] = useState(null);
  const [allTypes, setAllTypes] = useState(null);
  const [name, setName] = useState("");
  const [cardsToDisplay, setCardsToDisplay] = useState(null);

  useEffect(() => {
    fetch("/cards")
      .then((res) => res.json())
      .then((data) => setAllCards(data.cards));
  }, []);

  useEffect(() => {
    fetch("/types")
      .then((res) => res.json())
      .then((data) => setAllTypes(data.types));
  }, []);

  function handleNameSubmit (e) {
    e.preventDefault()
    name === "" ? setCardsToDisplay(null) : setCardsToDisplay(allCards.filter((el) => el.name === (name)))
  }

  function NameForm(){
    return (
      <form onSubmit={handleNameSubmit}>
      <input value={name} type="text" name="title" id="title" onChange = {(e) => setName(e.target.value)} placeholder="Name of the card(s)"/>
      </form>
    )
  }

  function setCards(e){
    setCardsToDisplay(e)
    console.log(cardsToDisplay)
  }

  return (
    <div className="App">
      <h1> Magic The Gathering </h1>
      <div>
        <AutocompleteComponent values={allTypes} placeholder={"Types"} allCards = {allCards} setCards={setCards}/>
        <AutocompleteComponent values={allRarities} placeholder={"Rarity"} allCards = {allCards} setCards={setCards}/>
        {NameForm()}
      </div>

      <br></br>
      {cardsToDisplay === null ? displayCards(allCards): displayCards(cardsToDisplay)}
    </div>
  );
}




export default App;