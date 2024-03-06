import { useEffect, useState } from "react";

import SkillChip from "./components/SkillChip";
import FormInput from "../../components/FormInput.jsx";
import {inputs} from './inputs.js'
import './style.css'
import { useSelector } from "react-redux";


const initialState = {};
let skillId = -1;
const {skillInput} = inputs;

function getNewSkill(name) {
    skillId++;
    console.log('creating skill', skillId);

    return {
        [skillId] : {
            name: name
        }
    }
}

export default function SkillForm({loadFormData, saveForm, formSubmitHandler}) {

    const[formData, setFormData] = useState(initialState);
    const [isFormValid, setIsFormValid] = useState('Add at least one skill');
    const [skillValue, setSkillValue] = useState('')


    const status = useSelector(state => state.status);

    useEffect(()=>{
        loadFormData(setFormData, setIsFormValid)
    }, [])    

    useEffect(()=> {
        if (status == 'saving') {
            saveForm(formData, isFormValid);
        }
    }, [status]);

    useEffect(()=>{
        console.log(formData);
        
        if (Object.keys(formData).length > 0) {
            setIsFormValid('');
        }
    }, [Object.keys(formData).length])


    function addSkillHandler() {
        if (skillValue == '') return;

        const name = skillValue;

        setFormData({ ...formData, ...getNewSkill(name) });

        setSkillValue('');

    }

    function changeHandler(e) {
        setSkillValue(e.target.value);
    }

    function deleteSkillHandler(id) {
        const copyList = {...formData}
        delete copyList[id];

        setFormData(copyList);
    }

    function enterHandler() {
        addSkillHandler();
    }

    function submitHandler(e) {
        e.preventDefault();

        formSubmitHandler(formData, isFormValid, inputs);
    }
    
    return (
        <div className="form-container">
            <form className="skill-input-container" id="skillsForm" onSubmit={submitHandler}>
                <FormInput 
                    inputDetails={skillInput}
                    value={skillValue}
                    givenChangeHandler={changeHandler}
                    givenEnterHandler={enterHandler}
                    />
                <button 
                    onClick={(e)=>{
                        e.preventDefault();
                        addSkillHandler();
                    }}
                    className="fill-button">
                    Add Skill
                </button>
            </form>

            <div className="skills-container">
                {
                    Object.keys(formData).length > 0 && (

                        Object.keys(formData).map(
                            item => {
                                return (
                                    <SkillChip 
                                        key={item}
                                        id={item}
                                        name={formData[item].name}
                                        deleteHandler={deleteSkillHandler}
                                    />
                                )
                            }
                        )
                    )
                }
            </div>
        </div>
    )
}