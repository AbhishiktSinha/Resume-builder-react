import { ActionTypes } from "./actionTypes"

const {NEXT_FORM, PREVIOUS_FORM, GO_TO_FORM, SAVE_FORM, CHANGE_STATUS} = ActionTypes

// state : 'init' | 'saving' | 'submitting' | 'error'

const initialState = {
    status: 'init',
    error: '',
    currentStep: 0,
    lastStep: 4,
    stepFormId: ['personalForm', 'educationForm', 'skillsForm', 'projectsForm', 'socialsForm'],
    data: {
        
        'personalForm': {
            name: 'Personal Details',
            isSubmitted: false,
            formData: {},
            isFormValid: {},
        },

        'educationForm' : {
            name: 'Education Details',
            isSubmitted: false,
            formData: {},
            isFormValid: {},
        },

        'skillsForm': {
            name: 'Skills Section',
            isSubmitted: false,
            formData: {},
            isFormValid: {},
        },

        'projectsForm': {
            name: 'Projects Section',
            isSubmitted: false,
            formData: {},
            isFormValid: {},
        }, 

        'socialsForm': {
            name: 'Socials Section',
            isSubmitted: false,
            formData: {},
            isFormValid: {},
        }

        
    }
}

/* 
    formId: {
        name: Personal Details
        isSubmitted: false
        formData: {

            input1Name : value,
            input2Name : value,
            input3Name : value,
        }
        isValid {
            input1Name : true | false,
            input2Name : true | false,
        }
}                 
*/




export default function reducer(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {

        case NEXT_FORM :
            return {
                ...state,
                currentStep: Math.min(state.lastStep, state.currentStep + 1),
            }

        case PREVIOUS_FORM :
            return {
                ...state,
                currentStep: Math.max(0, state.currentStep - 1),
            }

        case GO_TO_FORM :
            const {goToStep} = payload
            return {
                ...state,
                status: 'init',
                currentStep: goToStep < state.lastStep && goToStep >= 0 ? goToStep : state.currentStep,
            }

        case SAVE_FORM :
            const {formId, formData, isFormValid, submitting} = payload;
            return {
                ...state,
                status: (
                    state.currentStep == state.lastStep ?
                    ( submitting ? 'submitting' : 'init') :
                    'init'
                    ),
                currentStep : !submitting ?
                     Math.min(state.lastStep, state.currentStep + 1) :
                     state.currentStep,

                data: {
                    ...state.data,
                    
                    [formId]: {
                        ...state.data[formId],

                        formData: formData,
                        isFormValid: isFormValid,
                        isSubmitted: submitting,
                    }
                }
            }
        
        case CHANGE_STATUS :
            const newStatus = payload.status;
            const error= payload.error? payload.error : '';

            console.log('changing status in reducer:', payload)

            return {
                ...state,
                status: newStatus,
                error: error,
            }
            
        
        default :
            return state;

        
    }
}
