import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { inputs } from "./inputs";
import FormInput from "../../components/FormInput";
import ErrorMessage from "../../components/ErrorMessage";
import { ActionTypes } from "../../redux/actionTypes";

import './style.css'

const inputNameKeys = Object.keys(inputs);
const{CHANGE_STATUS, SAVE_FORM} = ActionTypes;

let error = undefined;

export default function PersonalForm({loadFormData, saveForm, formSubmitHandler}) {
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
    })
    const [isFormValid, setIsFormValid] = useState({
        firstName: false,
        lastName: true,
        phoneNumber: false,
        email: false,
    });
    

    const status = useSelector(state => state.status);
    const data = useSelector(state => state.data);

    const dispatch = useDispatch();

    useEffect(()=>{

        
        loadFormData(setFormData, setIsFormValid);
        
    }, [])

    // console.log(data);
    
    useEffect(()=>{
        if (status === 'saving') {
            saveForm(formData, isFormValid);
        }
    }, [status])
        
        
    console.log(formData, isFormValid);
    // console.log(data);

    function changeHandler(e) {        

        const inputName = e.target.name;
        const value = e.target.value;
        
        setFormData( {
            ...formData,
            [inputName]: value,
        })

        setIsFormValid( {
            ...isFormValid,
            [inputName] : inputs[inputName].tester(value),
        })
    }
    

    function submitHandler(e) {
        e.preventDefault();
        
        formSubmitHandler(formData, isFormValid, inputs);
    }


    return (
        <div className="form-container">
            
            <form onChange={changeHandler} onSubmit={submitHandler} id="personalForm">
                {
                    inputNameKeys.map( itemName => {                                                
                        const item = inputs[itemName];                        

                        return (

                            <FormInput 
                                inputDetails = { 
                                    {...item,                                         
                                         ...(
                                    
                                            !isFormValid[itemName] ? {
                                                errorMessage: item.errorMessage
                                            } :
                                            {
                                                errorMessage: ''
                                            }
                                            
                                    )}}
                                            
                                key = {item.name}
                                value={formData[itemName]}
                            />
                            
                        )
                            
                    })
                }
            </form>
        </div>
    )
}
