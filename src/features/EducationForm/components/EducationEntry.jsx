import FormInput from "../../../components/FormInput";
import { inputs } from "../inputs";
import '../styles/EducationEntry.css'

function getModifiedInputDetails(inputDetails, id, inputValid) {
    return {
        ...inputDetails,

        name: `${inputDetails.name}_${id}`,  

        // errorMessage: inputError ? inputDetails['errorMessage'] : '',

        ...(!inputValid ? 
            {
                'errorMessage': inputDetails['errorMessage']
            } :
            {
                'errorMessage': ''
            }
        )     
    }
}

export default function EducationEntry({
    id, entryValues, isEntryValid, formChangeHandler, deleteEntryHandler}) {

        
        return (
            <div className="entry-container">
                {
                    id != 0 && (
                        
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                deleteEntryHandler(id)
                            }}
                            className="delete-entry-button accent-button-red">
                                Delete
                        </button>                        

                    )
                }

                <div className="entry-row">
                    
                    <FormInput 
                        inputDetails={getModifiedInputDetails(
                            inputs.courseName, id, isEntryValid.courseName
                        )}
                        value={entryValues.courseName}
                        givenChangeHandler={formChangeHandler}
                    />

                    
                    <FormInput 
                        inputDetails={getModifiedInputDetails(
                            inputs.completionYear, id, isEntryValid.completionYear
                        )}
                        value={entryValues.completionYear}
                        givenChangeHandler={formChangeHandler}
                    />

                </div>
                
                <div className="entry-row">
                    
                    <FormInput 
                        inputDetails={getModifiedInputDetails(
                            inputs.instituteName, id, isEntryValid.instituteName
                        )}
                        value={entryValues.instituteName}
                        givenChangeHandler={formChangeHandler}
                    />

                    
                    <FormInput 
                        inputDetails={getModifiedInputDetails(
                            inputs.percentage, id, isEntryValid.percentage
                        )}
                        value={entryValues.percentage}
                        givenChangeHandler={formChangeHandler}
                    />

                </div>

            </div>
        )

}