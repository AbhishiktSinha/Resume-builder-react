
export const inputs = {

    instituteName: {
        name: 'instituteName',
        label: 'Institute Name',
        type: 'text',
        required: true,

        tester: (value)=>{
            return /^[a-zA-Z][a-zA-Z '.,]*[a-zA-Z]$/.test(value)
        },

        errorMessage: 'Please enter a valid value',
        emptyError: 'Institute name can not be empty',

    },


    courseName: {
        name: 'courseName',
        label: 'Course Name', 
        type: 'text',
        required: true,

        tester: (value)=> {
            value = value.trim();
            // const isAlpha = /^[A-Za-z]+$/.test(value);
            return /^[a-zA-Z][a-zA-Z .]*[a-zA-Z]$/.test(value) || /^[A-Za-z]+$/.test(value);


        },

        errorMessage: 'Please enter a valid course name',
        emptyError: 'Course name can not be empty'
    },


    completionYear: {
        name: 'completionYear',
        label: 'Completion Year',
        type: 'text',
        required: true,

        tester: (value)=> {
            return /(19|20)\d{2}/.test(value);
        },

        errorMessage: 'Please enter a value in the format : YYYY',
        emptyError: 'Year of completion can not be empty',
    
    },


    percentage: {
        name: 'percentage',
        label: 'Percentage',
        type: 'text',
        required: true,

        tester: (value)=>{
            return /^(0|[1-9][0-9]?|100)(\.\d{1,2})?$/.test(value);
        },

        errorMessage: 'Please enter a valid percentage value',
        emptyError: 'Percentage can not be empty',

    }


}