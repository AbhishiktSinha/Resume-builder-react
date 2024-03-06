import { useState, useEffect } from "react";

import { inputs } from "./inputs";
import EducationEntry from './components/EducationEntry'
import { useDispatch, useSelector } from "react-redux";

import { ActionTypes } from "../../redux/actionTypes";


// const {CHANGE_STATUS, SAVE_FORM} = 
let eduId = 0;

function getNewDataState() {
    eduId += 1;

    return {
        [eduId]: {        
            instituteName: '',
            courseName: '',
            completionYear: '',
            percentage: '',
        }
    }
}

function getNewErrorState() {
    
    const errorState = {
        [eduId]: {
            instituteName: false,
            courseName: false,
            completionYear: false,
            percentage: false,
        }
    };        

    return errorState;

}

export default function EducationForm({loadFormData, saveForm, formSubmitHandler}) {

    const [formData, setFormData] = useState({
        ...{
            0 : {
                instituteName: '',
                courseName: '',
                completionYear: '',
                percentage: '',
            }
        }
    });
    
    const [isFormValid, setIsFormValid] = useState({
        ...{
            0 : {
                instituteName: false,
                courseName: false,
                completionYear: false,
                percentage: false,
            }
        } });

    // console.log(formData, isFormValid);

    const status = useSelector(state => state.status);
    const data = useSelector( state=> state.data);

    const dispatch = useDispatch();


    useEffect(()=>{
        loadFormData(setFormData, setIsFormValid)
    }, [])

    useEffect(()=>{
        if (status == 'saving') {

            saveForm(formData, isFormValid)
        }
    }, [status])


    function submitHandler(e) {
        e.preventDefault();

        formSubmitHandler(formData, isFormValid, inputs);
    }

    
    function formChangeHandler(e) {
        const field = e.target.name;
        const value = e.target.value;

        const fieldName = field.slice(0, field.indexOf('_'));
        const entryId = Number(field.slice(field.indexOf('_') + 1)) ;

        setFormData({
            ...formData,
            [entryId]: {
                ...formData[entryId],
                [fieldName]: value,
            }
        })

        setIsFormValid(
            {
                ...isFormValid,
                [entryId]: {
                    ...isFormValid[entryId],
                    [fieldName]: inputs[fieldName].tester(value),
                }
            }
        )
    }

    function addEntryHandler() {
        setFormData(
            {
                ...formData,
                ...getNewDataState(),
            }
        )
        setIsFormValid(
            {
                ...isFormValid, 
                ...getNewErrorState(),
            }
        )
    }
    
    function deleteEntryHandler(entryId) {
        const copyIsValid = {...isFormValid};
        delete copyIsValid[entryId];

        setIsFormValid(copyIsValid);

        const copyformData = {...formData};
        delete copyformData[entryId];

        setFormData(copyformData);
    }

    return (
        <div className="form-container">
            <form id="educationForm" onSubmit={submitHandler}>
                
                {
                    Object.keys(formData).
                    map( itemId => {
                        const item = formData[itemId];
                        const errorItem = isFormValid[itemId];

                        // console.log(itemId, item, errorItem);

                        return (
                            <EducationEntry
                                key={itemId}
                                entryValues={item}
                                isEntryValid={errorItem}
                                id={itemId}
                                formChangeHandler={formChangeHandler}
                                deleteEntryHandler={deleteEntryHandler}
                            />                            
                        )
                    })
                }

            </form>
            <button 
                onClick={addEntryHandler}
                className="add-entry-button fill-button">Add Education</button>
        </div>
    )
}