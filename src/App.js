import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Conversation from './Conversation.js'


class App extends Component {

    constructor() {
        super();
        this.state = {
            conversation_ids_counter : 0
        };

    }


    render() {
        let newConversationId = this.state.conversation_ids_counter;
        this.state.conversation_ids_counter++;
        return (
            <div>
                <Conversation id={newConversationId }  />

            </div>

       );
   }
}

export default App;
