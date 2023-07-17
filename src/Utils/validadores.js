const validateName = (name) => {
    return name.length > 1;
}

const validateEmail = (email) => {
    return email?.toString().includes('@') && email?.toString().includes('.');
}

export{
    validateEmail,
    validateName
}