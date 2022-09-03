import React, { Component } from "react";

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
        if (this.props.placeholder === "Rarity"){
            selectedResults = []
            input = e.currentTarget.innerText
        } else {
            input = ""
        }
        selectedResults.push(e.currentTarget.innerText);
    
        const { allCards } = this.props;
  
          const filteredCards = allCards.filter((el) => selectedResults.includes(el.types[0]))
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
        let { values } = this.props;
        let { selectedResults } = this.state;
        
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

                    return (
                      <li className={className} onClick={onClick} key={el}> {el} </li>
                    );
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
                        <div className="choice">
                            {el}
                        </div>)
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

