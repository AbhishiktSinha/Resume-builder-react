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
    id, entryValues, isEntryValid, deleteEntryHandler}) {

        
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
                    />

                    
                    <FormInput 
                        inputDetails={getModifiedInputDetails(
                            inputs.completionYear, id, isEntryValid.completionYear
                        )}
                        value={entryValues.completionYear}                        
                    />

                </div>
                
                <div className="entry-row">
                    
                    <FormInput 
                        inputDetails={getModifiedInputDetails(
                            inputs.instituteName, id, isEntryValid.instituteName
                        )}
                        value={entryValues.instituteName}                        
                    />

                    
                    <FormInput 
                        inputDetails={getModifiedInputDetails(
                            inputs.percentage, id, isEntryValid.percentage
                        )}
                        value={entryValues.percentage}                        
                    />

                </div>

            </div>
        )

}