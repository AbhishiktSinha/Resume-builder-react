
export const inputs = {

    projectTitle: {
        name: 'projectTitle',
        label: 'Project Title',
        type: 'text',
        requried: true,
        emptyError: 'Project title can not be empty',
        tester : (value)=>{
            return value!=='';
        }
    },

    
    techStacks :{
        name: 'techStacks',
        label: 'Tech Stacks Used',
        type: 'text',
        required: true,
        emptyError: 'Tech stacks can not be empty',        

        tester: (value)=>{
            return value!=='';
        }
    },

    description: {
        name: 'description',
        label: 'Description',
        type: 'text',
        required: true,
        emptyError: 'Description can not be empty',

        tester: value => {
            return (value !== '')
        }
    }

}