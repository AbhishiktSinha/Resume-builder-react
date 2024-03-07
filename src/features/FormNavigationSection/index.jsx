import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ActionTypes } from "../../redux/actionTypes";

const {NEXT_FORM, PREVIOUS_FORM, CHANGE_STATUS} = ActionTypes;

export default function FormNavigationSection() {

    const dispatch = useDispatch();
    const currentStep = useSelector( state => state.currentStep );
    const stepFormId = useSelector( state => state.stepFormId );
    const formId = stepFormId[currentStep];
    const lastStep = useSelector( state => state.lastStep );
    
    const data = useSelector(state => state.data )
    const status = useSelector(state => state.status);

    const {isSubmitted} = data[formId];
    
    const clickedNext = useRef(false);    

    useEffect(()=>{
        
        if(clickedNext.current && isSubmitted == true) {
            clickedNext.current = false;
            dispatch({type: NEXT_FORM});
        }

    }, [data])

    /* useEffect(()=>{

        if (currentStep == lastStep && isSubmitted) {
            console.log('changing status to "submitting"');
            dispatch({
                type: CHANGE_STATUS,
                payload: {
                    status: 'submitting',
                }
            })

        }

    }, [isSubmitted]) */


    function goNext() {
        
        clickedNext.current= true;
    }
    function goBack() {
        dispatch({type: PREVIOUS_FORM})
    }    

    function saveAndContinue() {
        console.log('changing status to "saving" ');
        dispatch({type: CHANGE_STATUS, payload: {
            status: 'saving'
        }})
    }


    return(
        <div className="form-navigation-section">
            <button 
                disabled={currentStep === 0}
                onClick={goBack}
                className="back-button accent-button-red">
                    Back
            </button>

             
            {
                currentStep < lastStep && (
                    <button 
                        onClick={saveAndContinue}
                        className="save-form-button fill-button">
                            Save And Continue
                    </button>
                )
            }
            {
                currentStep == lastStep && (
                    <button 
                        form={formId}
                        disabled={status == 'success' || status == 'submitting' || status == 'saving'}                        
                        className="submit-details-button fill-button">
                            Submit Details
                        </button>
                )
            }
            
            <button 
                disabled={currentStep === lastStep}
                onClick={goNext}
                form={formId}
                className="next-button fill-button">
                    Next
            </button>
        </div>
    )
}