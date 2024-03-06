import { useSelector, useDispatch } from "react-redux";
import { Suspense, lazy, useEffect } from "react";
import PersonalForm from "../PersonalForm/index";
import EducationForm from "../EducationForm/index";
import SkillForm from "../SkillsForm/index";
import ProjectForm from "../ProjectsForm";
import SocialsForm from "../SocialsForm/index";
import ErrorMessage from "../../components/ErrorMessage";

import { ActionTypes } from "../../redux/actionTypes";


const {SAVE_FORM, CHANGE_STATUS, GO_TO_FORM} = ActionTypes;


let error = '';

export default function FormDisplaySection() {
    const currentStep = useSelector( state => state.currentStep );
    const lastStep = useSelector( state => state.lastStep );
    const stepFormIdList = useSelector( state => state.stepFormId );
    const status = useSelector( state => state.status );
    const data = useSelector( state => state.data );
    
    const dispatch = useDispatch();
    
    const currentForm = stepFormIdList[currentStep];
    
    const isCurrentFormSubmitted = useSelector( state => state.data[currentForm].isSubmitted);

    // when the status changes to submitting, and again
    // when the last form gets submitted while the status is submitting
    useEffect(()=>{

        console.log('STATUS:', status,'isCurrentFormSubmitted:', isCurrentFormSubmitted);

        if (status === 'submitting' && 
            currentStep == lastStep && 
            isCurrentFormSubmitted == true) {
                
                // check if any form is remaining from being submitted
                let remainingFormIdx = null;

                for (let formKey in data) {

                    if (!data[formKey].isSubmitted) {
                        remainingFormIdx = stepFormIdList.indexOf(formKey);
                        break;
                    }
                }

                if (remainingFormIdx != null) {

                    dispatch({
                        type: GO_TO_FORM,
                        payload: {
                            goToStep: remainingFormIdx,
                        }
                    })
                }

                else {
                    dispatch({
                        type: CHANGE_STATUS,
                        payload: {
                            status: 'success'
                        }
                    })
                }
                
            }

    }, [status])    

    useEffect(()=>{
        if (status === 'success') {
            console.log('user data:',data);
        }
    }, [status])



    console.log('current form:', currentForm);
    console.log('form redux data', data[currentForm]);

    function formSubmitHandler(formData, isFormValid, inputs) {

        console.log('formData: ', formData);
        console.log('isFormValid:', isFormValid);
        console.log('inputs:', inputs);

        if ((typeof isFormValid) === "string") {
            if (isFormValid === '') {
                saveForm(formData, isFormValid, true);
            }
            else {
                error = isFormValid;
                dispatch( {type: CHANGE_STATUS, payload: {
                    status: 'error',
                    error: error,
                }}) 
            }

            return;

        }

        let wrongInput = null;
        for (let key in isFormValid) {

            console.log('Number(',key,') == ', Number(key));
            
            if (!isNaN(Number(key))) {

                console.log('key is a number', isFormValid[key]);

                for (let entryKey in isFormValid[key]) {                    

                    if (isFormValid[key][entryKey] == false) {

                        wrongInput = entryKey;
                        error = inputs[wrongInput].errorMessage;
                        break;
                    }
                }

                if (wrongInput) break;
            }
            else {

                if (isFormValid[key] == false) {

                    wrongInput = key;
                    error = inputs[key].errorMessage ? inputs[key].errorMessage : inputs[key].emptyError;
                    break;
                }
            }
            
        }


        console.log('error in', wrongInput);

        if (wrongInput == null) {
            saveForm(formData, isFormValid, true)
        }
        else {            
            // console.log('error: ', inputs[key].errorMessage ? inputs[key].errorMessage : inputs[key].emptyError);

            dispatch( {type: CHANGE_STATUS, payload: {
                status: 'error',
                error: error,
            }})            
        }
    }

    function saveForm(formData, isFormValid, isSubmitting = false) {

        console.log(currentForm, 'saving to redux state');
        
        dispatch(
            {
                type: SAVE_FORM,
                payload: {
                    formId: currentForm,
                    formData: formData,
                    isFormValid: isFormValid,
                    submitting: isSubmitting,
                }
            }
        )
    }

    function loadFormData(setFormData, setIsFormValid) {

        if (status == 'init') {

            console.log(currentForm,'data in redux',data[currentForm].formData);
            console.log(Object.keys(data[currentForm].formData))

            if (Object.keys(data[currentForm].formData).length > 0) {

                    console.log('applying changes from redux');
                    setFormData(data[currentForm].formData);
                    setIsFormValid && setIsFormValid(data[currentForm].isFormValid);
                }
        }
    }

    return (
        <div className="form-display-section">
            {
                status == 'error' && <ErrorMessage error={error}/>
            }
            {
                currentForm === 'personalForm' && (
                <PersonalForm 
                    loadFormData={loadFormData}
                    saveForm={saveForm} 
                    formSubmitHandler={formSubmitHandler}
                />)
            }
            {
                currentForm === 'educationForm' && (
                <EducationForm
                    loadFormData={loadFormData}
                    saveForm={saveForm}
                    formSubmitHandler={formSubmitHandler}
                    />
                )
                
            }
            {
                currentForm === 'skillsForm' && (
                <SkillForm 
                    loadFormData={loadFormData}
                    saveForm={saveForm}
                    formSubmitHandler={formSubmitHandler}
                    />)
                
            }
            {
                currentForm === 'projectsForm' && (
                <ProjectForm 
                    loadFormData={loadFormData}
                    saveForm={saveForm}
                    formSubmitHandler={formSubmitHandler}
                />)
                
            }
            {
                currentForm === 'socialsForm' && (
                <SocialsForm
                    loadFormData={loadFormData}
                    saveForm={saveForm}
                    formSubmitHandler={formSubmitHandler}
                />)
                
            }
        </div>
    )

}