
export const inputs = {
    firstName: {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        required: true,
        
        tester: (value)=>{
            return /^[A-Za-z]+$/.test(value)
        },

        errorMessage: 'Name can only contain alphabets',
        emptyError: 'Name can not be empty',
    },

    lastName: {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        required: false,

        tester : (value)=>{
            return (/^[A-Za-z]+$/.test(value) || value==='');
        },  
        
        errorMessage: 'Name can only contain alphabets'
    },

    email: {
        name: 'email',
        label: 'Email Address',
        type: 'text',
        required: true,

        tester: (value)=>{
            return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
        },

        errorMessage: 'Please enter a valid email',
        emptyError: 'Email can not be empty'
    },

    phoneNumber : {
        name: 'phoneNumber',
        label: 'Phone number',
        type: 'text',
        required: true,

        tester: (value)=> {
            return /^[2-9]{2}[0-9]{8}$/.test(value);
        },

        errorMessage: 'Please enter a valid phone number',
        emptyError: 'Phone number can not be empty'
    }
}