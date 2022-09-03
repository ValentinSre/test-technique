import React, { Component } from "react";
import {rarities} from './DisplayCards'

class AutocompleteComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: "",
            activeValue: 0, 
            filteredResults: [],
            selectedResults: [],
            showResults: false,
        };
    }

    onClick = e => {
        let { selectedResults } = this.state;
        let input;
        let filteredCards;
        const { allCards } = this.props;

        if (this.props.placeholder === "Rarity"){
            input = e.currentTarget.innerText
            selectedResults = [input]
            filteredCards = allCards.filter((el) => el.rarity === input)
          } else {
            input = ""
            selectedResults.push(e.currentTarget.innerText);
  
            filteredCards = allCards.filter((el) => selectedResults.includes(el.types[0]))
        }

        this.props.setCards(filteredCards)
        this.setState({
            selectedResults,
            input,
            activeValue: 0,
            filteredResults: [],
            showResults: false,
        });
    };

    onChange = e => {
        let { selectedResults } = this.state;
        let { values } = this.props;
        
        if (this.props.placeholder !== "Rarity"){
          selectedResults.forEach((el) => {
            const index = values.indexOf(el)
            values.splice(index, 1);
          });
        }
        
        const input = e.currentTarget.value;

        const filteredResults = values.filter((el) => el.toLowerCase().indexOf(input.toLowerCase()) > -1);

        this.setState({
            input: e.currentTarget.value,
            activeValue: 0,
            filteredResults,
            showResults: true,
        });
    };

    removeFromFilter = (e) => {
      let { selectedResults } = this.state;

      const index = selectedResults.indexOf(e)
      selectedResults.splice(index, 1);

      const { allCards } = this.props;

      if (selectedResults.length === 0){
        this.props.setCards(allCards)
      } else {
        const filteredCards = allCards.filter((el) => selectedResults.includes(el.types[0]))
        this.props.setCards(filteredCards)
      }
      this.setState(selectedResults)

    }

    render() {
        const { onClick, onChange, state: { input, filteredResults, selectedResults, showResults } } = this;
        const placeholder = this.props.placeholder
        let proposals;

        if (showResults && input) {
            if (filteredResults.length) {
              proposals = (
                <ul className="choices">
                  {filteredResults.map((el, index) => {
                    let className;

                    if (placeholder === "Rarity"){
                      let color = rarities.find(element => element.value === el).color
                      return (
                          <li style={{backgroundColor: color, color: "white"}} className={className} onClick={onClick} key={el}> {el} </li>
                      )
                    } else {
                      return (
                        <li className={className} onClick={onClick} key={el}> {el} </li>
                    )
                    }

                  })}
                </ul>
              );
            } else {
              proposals = 
                <div className="noChoice">
                  <p>No proposal corresponds to your research.</p>
                </div>
            }
          }

          return (
            <form>
                {placeholder!=="Rarity" ? 
                <div className="selectedChoices">
                    {selectedResults && selectedResults.map((el) => 
                        <button className="choice" onClick={() => this.removeFromFilter(el)} >
                          { el }
                        </button>
                      )
                    }
                </div>
                : null}
              <input
                type="text"
                onChange={onChange}
                value={input}
                placeholder={placeholder}
              />
              {proposals}
            </form>
          );
        }
}

export default AutocompleteComponent;

