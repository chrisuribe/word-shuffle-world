import React, { Component } from 'react';

class KeyProcessor extends Component {


    
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }
    
    componentWillUnmount() {
        window.removeEventListener('keydown',this.handleKeyDown);
    }
    
    /////////////////////
    
    handleKeyDown = (e) => {
        const {currentWord, display, setDisplay, processDisplayWord} = this.props;
        
        if(e.key === "Enter" && display !== "")
            processDisplayWord(display);
            // process word

        // else if key is letterin word, then add to display.
        else if(currentWord.split("").some((letter) => letter===e.key)){
            console.log(`You typed: ${e.key} The word is: ${currentWord}`);
            setDisplay(display + e.key);
        }
    };
  //////////

    
    render() {
        return (
            <div>
            </div>
        );
    }
}

export default KeyProcessor;