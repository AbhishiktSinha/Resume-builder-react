import "material-symbols"
export default function SkillChip({name, id, deleteHandler}) {

    return (
        <div className="skill-chip-container" id={id}>
            <button
                onClick={()=>deleteHandler(id)} 
                className="delete-chip-button fill-button-red material-symbols-outlined">
                    close
                </button>
            {name}
        </div>
    )
} 