import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from './logo.svg';
import './Conversation.css';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Conversation extends Component {

    constructor() {
        super();
        this.state = {
            conversation_lines : [],
            inputfield : ""
        };
        this.endpoint = process.env.REACT_APP_RASA_ENDPOINT
        this.handleClick  = this.handleClick.bind(this)
        this.updateInputValue = this.updateInputValue.bind(this)
    }

    handleClick = e => {
        e.preventDefault()
        let endpoint = this.endpoint+this.props.id+'/respond'
        console.log(endpoint)
        if (this.state.inputfield.length > 0 ) {
            fetch(endpoint, {
                method: 'POST',
                headers: {},
                body: JSON.stringify({
                    'query': this.state.inputfield,
                })
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    var text = data[0]["text"]
                    this.setState(prevState => ({
                        conversation_lines: [{
                            "question": prevState.inputfield,
                            "answer": text
                        }, ...prevState.conversation_lines,],
                        inputfield: ""
                    }))
                    console.log(this.state.conversation_lines)


            })
        }
    }

    updateInputValue = evt => {
        let evalue = evt.target.value
        this.setState(prevState =>
            ({
                inputfield: evalue,
                conversation_lines : prevState.conversation_lines
            }
        ))

    }

    render() {
        return (
          <div className="conversation">
              <Form className="enter_question">
                  <Label for="conv_line_input">Hi, I am Diego-bot ! Type your message here.</Label>
                  <Input name="conv_line" id="conv_line_input" type="text" value={this.state.inputfield}  onChange={this.updateInputValue}   />
                  <Button id="add_conversation_button"  onClick={this.handleClick} type="submit">Submit</Button>
              </Form>
              <div className = "conv_history">
              { this.state.conversation_lines.map(function(conversation_line, index) {
                  return (
                    <div>
                      <p className="question"  >  { conversation_line["question"] } </p>
                      <p className="answer"  >    { conversation_line["answer"] } </p>
                    </div>
                  )
              })}
              </div>

          </div>
    );
  }
}

export default Conversation;
