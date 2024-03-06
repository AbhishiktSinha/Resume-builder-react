import { inputs } from "../inputs";
import FormInput from "../../../components/FormInput";

export default function ProjectEntry({ entryId, entryData, isEntryValid, formChangeHandler, deleteHandler }) {

    
    return (
        <div className="entry-container">
            {
                entryId != 0 && (
                    
                    <button 
                        onClick={(e)=>{
                            e.preventDefault();
                            deleteHandler(entryId)
                        }}
                        className="delete-entry-button accent-button-red">
                            Delete
                    </button>
                )
            }
            <div className="entry-row">
                <FormInput 
                    inputDetails={{
                        ...inputs.projectTitle, 
                        name: `${inputs.projectTitle.name}_${entryId}`
                    }}

                    value={entryData.projectTitle}

                    givenChangeHandler={formChangeHandler}
                />

                <FormInput 
                    inputDetails={{
                        ...inputs.techStacks,
                        name: `${inputs.techStacks.name}_${entryId}`
                    }}
                    value={entryData.techStacks}
                    givenChangeHandler={formChangeHandler}
                />
            </div>
            <div className="entry-row">
                <FormInput 
                    inputDetails={{
                        ...inputs.description,
                        name: `${inputs.description.name}_${entryId}`
                    }}
                    value={entryData.description}
                    givenChangeHandler={formChangeHandler}
                />
            </div>
        </div>
    )
}