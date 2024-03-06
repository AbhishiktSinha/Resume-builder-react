import { useEffect, useState } from "react";
import { inputs } from "./inputs";
import ProjectEntry from './components/ProjectEntry.jsx'
import { useSelector } from "react-redux";

const {projectTitle, techStacks, description} = inputs;

let projectId = 0;

function getNewProjectEntry() {
    projectId++;

    return {
        [projectId] : {
            projectTitle: '',
            description: '',
            techStacks: '',
        }
    }
}

function getNewErrorEntry() {
    return {
        [projectId] : {
            projectTitle: false,
            techStacks: false,
            description: false,
        }
    }
}

export default function ProjectForm({loadFormData, saveForm, formSubmitHandler}) {

    const[formData, setFormData] = useState({
        0: {
            projectTitle: '',
            description: '',
            techStacks: '',
        }
    })

    const [isFormValid, setIsFormValid] = useState({
        0: {
            projectTitle: false,
            description: false,
            techStacks: false,
        }
    })

    console.log(formData, isFormValid);

    const status = useSelector(state => state.status);

    useEffect(()=>{
        loadFormData(setFormData, setIsFormValid)
    }, [])

    useEffect(()=>{
        if (status === 'saving') {
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
            ...getNewProjectEntry(),
        })

        setIsFormValid({
            ...isFormValid,
            ...getNewErrorEntry(),
        })
    }

    function deleteEntryHandler(entryId) {
        const copyData = {...formData};
        delete copyData[entryId];

        const copyIsValid  = {...isFormValid};
        delete copyIsValid[entryId];

        setFormData(copyData);
        setIsFormValid(copyIsValid);
    }

    return(
        <div className="form-container">
            <form id="projectsForm" onSubmit={submitHandler}>
                {
                    Object.keys(formData)
                    .map( entryId => {

                        const entryData = formData[entryId];
                        const entryErrors = isFormValid[entryId];

                        return (
                            <ProjectEntry 
                                key={entryId}
                                entryId={entryId}
                                entryData={entryData}
                                isEntryValid={entryErrors}
                                formChangeHandler={formChangeHandler}
                                deleteHandler={deleteEntryHandler}
                            />
                        )

                    })
                }
            </form>
            <button 
                onClick={addEntryHandler}
                className="add-entry-button fill-button">
                    Add Project
                </button>
        </div>
    )
}