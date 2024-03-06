import { useEffect, useState } from "react";
import { inputs } from "./inputs";
import SocialsEntry from "./components/SocialsEntry";
import { useSelector } from "react-redux";

let socialId = 0;

function getSocialData() {
    socialId++;
    console.log('entryId:', socialId);
    return {
        [socialId]: {
            socialLink: ''
        }
    }
}

function getSocialisValid() {
    return {
        [socialId]: {
            socialLink: false,
        }
    }
}

export default function SocialsForm({loadFormData, saveForm, formSubmitHandler}) {
    
    const [formData, setFormData] = useState({
        0: {
            socialLink: ''
        }
    });

    const [isFormValid, setIsFormValid] = useState({
        0: {
            socialLink: false,
        }
    })

    const status = useSelector( state => state.status);

    useEffect(()=>{
        loadFormData(setFormData, setIsFormValid)
    }, [])

    useEffect( ()=> {
        if(status == 'saving') {

            saveForm(formData, isFormValid);
        }
    }, [status])

    // console.log('data',formData, '\nvalid',isFormValid);

    function onChangeHandler(e) {
        const field = e.target.name;
        const value = e.target.value;

        const fieldName = field.slice(0, field.indexOf('_'));
        const entryId = Number(field.slice(field.indexOf('_') + 1));                

        setFormData({
            ...formData,
            [entryId]: {
                ...formData[entryId],
                [fieldName]: value,
            }
        })

        setIsFormValid({
            ...isFormValid,

            [entryId]: {
                ...isFormValid[entryId],
                [fieldName]: inputs[fieldName].tester(value),
            }
        })
    }

    function addEntryHandler() {
        setFormData({
            ...formData, 
            ...getSocialData(),
        })

        setIsFormValid({
            ...isFormValid, 
            ...getSocialisValid(),
        })
    }

    function deleteEntryHandler(entryId) {
        const copyData = {...formData};
        const copyIsValid = {...isFormValid};

        delete copyData[entryId];
        delete copyIsValid[entryId];

        setFormData(copyData);
        setIsFormValid(copyIsValid);
    }

    function submitHandler(e) {
        e.preventDefault();

        formSubmitHandler(formData, isFormValid, inputs);
    }


    return (
        <div className="form-container">
            <form id="socialsForm" onSubmit={submitHandler}>

                {/* get all the entries */}
                {
                    Object.keys(formData)
                    .map( entryId => {
                        
                        // for every entryID
                        // create an entry
                        const entryData = formData[entryId];
                        const isEntryValid = isFormValid[entryId]

                        // entry data has the values
                        // entryIsValid is used to check if error needs to be sent
                        return (
                            <SocialsEntry 
                                key={entryId}
                                entryId={entryId}
                                entryData={entryData}
                                isEntryValid={isEntryValid}
                                formChangeHandler={onChangeHandler}
                                deleteHandler={deleteEntryHandler}
                            />
                        )
                    })
                }

            </form>
            
            <button 
                onClick={addEntryHandler}
                className="add-entry-button 
                fill-button">
                    Add Social Link
                </button>
        </div>
    )

}