import { useSelector, useDispatch } from "react-redux";
import ProgressCircle from './components/ProgressCircle.jsx'

export default function FormProgressSection() {
    const stepFormIdList = useSelector( state => state.stepFormId);
    const data = useSelector( state => state.data );   

    const currentStep = useSelector( state => state.currentStep );

    const lastStep = useSelector( state => state.lastStep );

    return (
        <div className="form-progress-section">
            {
                stepFormIdList.map( (formId, index) => {
                    
                    const formName = data[formId].name;
                    
                    if (index < lastStep) {
                        return (
                            <>
                                <div className="form-label" key={formName}>
                                    <ProgressCircle 
                                        index={index}
                                        currentStep={currentStep}
                                        isSubmitted={data[formId].isSubmitted}
                                    />
                                    {formName}
                                </div>
                                <div className="progress-line" key={'line-'+formName}>                                    
                                </div>
                            </>
                        )
                    }
                    else {
                        return (
                            <div className="form-label" key={formName}>
                                <ProgressCircle 
                                    index={index}
                                    currentStep={currentStep}
                                    isSubmitted={data[formId].isSubmitted}
                                />
                                {formName}
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}