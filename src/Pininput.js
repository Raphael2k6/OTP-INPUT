import React, { Fragment, Component} from "react";
import style from './App.module.css'

class PinInput extends Component {
    nameInput = [];
    constructor(props) {
        super (props);
        this.state = {
            currentCursorPosition: 0,
            pinDigits: new Array(this.props.numOfInputs).fill(null),
            inputElements: []
        };
        this.updatePin = this.updatePin.bind(this);
    }

    updatePin (event, inputIndex) {
        let pins = [...this.state.pinDigits];
        if (event.keyCode === 8) {
            if (inputIndex === this.props.numOfInputs - 1) {
                pins[inputIndex] = event.target.value;
            } else {
                this.nameInput[inputIndex - 1].focus();
                pins[inputIndex - 1] = null;
            }
            this.setState({
                pinDigits: pins
            });
            return;
        }
        pins[inputIndex] = event.target.value;
        let currentCursorPosition = this.state.currentCursorPosition;
        this.setState(
            {
                currentCursorPosition: currentCursorPosition + 1,
                pinDigits: pins
            }, () => {
                if (inputIndex < this.props.numOfInputs - 1) {
                    this.nameInput[inputIndex + 1].focus();
                }
            }
        );
    }

    handleDelete = (event, inputIndex) => {
        let pins = [...this.state.pinDigits];
        if (event.key === "Delete" || event.key === "Backspace") {
            if (inputIndex === this.props.numOfInputs - 1) {
                if (event.target.value === "") {
                    this.nameInput[inputIndex - 1].focus();
                    pins[inputIndex - 1] = null;
                }
                pins[inputIndex] = event.target.value;
            } else if (inputIndex === 0) {
                pins[inputIndex] = null;
                return;  
            } else {
                this.nameInput[inputIndex - 1].focus();
                pins[inputIndex - 1] = null;
            };
            this.setState({
                pinDigits: pins
            });
        return;
        } 
    }

    render () {
        return (
            <Fragment>
            <div><h1>Enter your OTP</h1></div> 
                <div className={style.otpContainer}>
                    {[...Array(this.props.numOfInputs).keys()].map((d, idx) => {
                        return (
                            <input
                                key={idx}
                                className={style.otpInput}
                                onKeyUp={(event) => this.handleDelete(event, idx)}
                                onChange={(event) => this.updatePin(event, idx)}
                                maxLength={1}
                                placeholder="*"
                                ref={(input) => {
                                    this.nameInput[idx] = input;
                                }}
                                value={
                                    this.state.pinDigits[idx] !== null
                                    ? this.state.pinDigits[idx]
                                    : ""
                                }
                            />    
                        )
                    })}
                </div>
            </Fragment>
        )
    }
}

export default PinInput;    


