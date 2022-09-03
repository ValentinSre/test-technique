
const rarities = [
    { value: 'Common', color: '#2e2e2e' },
    { value: 'Uncommon', color: '#ababab' },
    { value: 'Rare', color: '#ffca00' },
    { value: 'Mythic Rare', color: '#ff8600' },
    { value: 'Special', color: '#fd6ee1' },
    { value: 'Basic Land', color: '#000000' },
  ];

export default function displayCards(listOfCards){
    return(
    <div className="cards">
    {listOfCards && listOfCards.map((el) => 
      <>
        <article className="card">
          <header>
            <h2>{el.name}</h2>
          </header>  
          <div className="content">
              <p> {el.text} </p>
          </div>
          <footer>
            {el.types.map((type) => <div>{type}</div>)}
            {displayRarity(el.rarity)}
          </footer>        
        </article>
      </>
      )}
    </div>
    );
  }
  
  function displayRarity(rarity){
    const color = rarities.find(element => element.value === rarity).color;
    
    return (<div style = {{backgroundColor: color, color: 'white'}}>{rarity}</div>)
  }
