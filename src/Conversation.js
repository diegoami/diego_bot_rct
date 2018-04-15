import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from './logo.svg';
import './Conversation.css';



class Conversation extends Component {

    constructor() {
        super();
        this.state = {
            conversation_lines : [],
            inputfield : ""
        };
        this.handleClick  = this.handleClick.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);

    }

    handleClick = e => {
        console.log(this.state.inputfield)
        this.setState(prevState => ({
            conversation_lines : [...prevState.conversation_lines, prevState.inputfield]
        }))
        console.log(this.state.conversation_lines)
        e.preventDefault()
    }


    updateInputValue = evt => {

        this.setState(prevState =>
            ({
                inputfield: evt.target.value,
                conversation_lines : prevState.conversation_lines
            }
        ))

    }

    render() {
        return (
          <div className="conversation">
              { this.state.conversation_lines.map(function(conversation_line, index) {
                  return <p className="conversation_line"  > { conversation_line } </p>
              })}
              <form>
                  <Label for="conv_line_input">Conversation Line</Label>
                  <input name="conv_line" id="conv_line_input" type="text" onChange={this.updateInputValue}  />
                  <Button id="add_conversation_button"  onClick={this.handleClick} type="submit">Submit</Button>
              </form>

          </div>
    );
  }
}

export default Conversation;
