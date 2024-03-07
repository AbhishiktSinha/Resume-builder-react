import FormInput from "../../../components/FormInput";
import { inputs } from "../inputs";


export default function SocialsEntry({
    entryId, entryData, isEntryValid, deleteHandler
}) {

    return (
        <div className="entry-container">
            {
                entryId != 0 && (
                    <button 
                        onClick={(e)=> {
                            e.preventDefault();
                            deleteHandler(entryId);
                        }}
                        className="delete-entry-button 
                        accent-button-red">
                            Delete
                        </button>
                )
            }

            <div className="entry-row">
                <FormInput 
                    inputDetails={{
                        ...inputs.socialLink,
                        
                        name: `${inputs.socialLink.name}_${entryId}`,

                        errorMessage: !isEntryValid.socialLink ? 
                            inputs.socialLink.errorMessage : 
                            '',
                    }}
                    value={entryData.socialLink}                    
                />
            </div>
        </div>
    )
}