
export const inputs = {
    socialLink: {
        name: 'socialLink',
        type: 'text',
        label: 'Social Link',
        required: true,
        errorMessage: 'Please enter a valid link',
        emptyError: 'Link can not be empty',

        tester: (value)=>{
            return /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(value);
        }
    }
}