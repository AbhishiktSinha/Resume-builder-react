import { useRef, useState } from "react";
import '../styles/FormInput.css'

export default function FormInput({inputDetails, value, givenChangeHandler, givenEnterHandler}) {

    const {type, name, label, required, errorMessage, emptyError} = inputDetails;
    
    const [focusState, setFocusState] = useState(true); // pseudo focus on input element to avoid error in un-touched form
    const [inputValue, setInputValue] = useState('')

    const usedValue = value ? value : inputValue;

    function focusHandler() {
        setFocusState(true)
    }
    function blurHandler() {
        setFocusState(false)
    }
    function changeHandler(e) {
        setInputValue(e.target.value);
    }
    
    function enterHandler(e) {
        const key = e.key;
        
        if (key === 'Enter') {
            givenEnterHandler();
        }
    }

    // console.log('render:',name);
    // console.log(inputRef);    

    return (
        <div className="form-input-container">
            <label htmlFor={name}>{`${label}${required ? ' *': ''}`}</label>
            <input 
                type={type} 
                name={name} 
                placeholder={label}
                id={name} 
                required={required}  
                onFocus={focusHandler}
                onBlur={blurHandler}
                { ...(givenEnterHandler && {onKeyUp: enterHandler})}
                
                { ...( givenChangeHandler ? 
                    {onChange: givenChangeHandler} : 
                    {onChange: changeHandler} ) 
                } 
                
                value={usedValue}

                />
            {/* if the input element is empty and focused, don't show the error */}
            {
                (errorMessage != undefined || emptyError != undefined) && (
                    <p
                    style={
                        {
                            ...(
                                    usedValue === '' &&
                                    focusState &&
                                    { display: 'none' }
                                )
                            }
                        }
                        className="error-message">
                            { usedValue ==='' ? (emptyError? emptyError: '') : errorMessage }
                    </p>
                )
            }
        </div>
    )
}