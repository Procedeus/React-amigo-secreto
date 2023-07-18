const validateUsername = (username) => {
    return username?.length > 4;
}
const validatePassword = (password) => {
    return password?.length > 5;
}


const validateName = (name) => {
    return name?.length > 1;
}

const validateEmail = (email) => {
    return email?.toString().includes('@') && email?.toString().includes('.');
}

export{
    validateUsername,
    validatePassword,
    validateEmail,
    validateName
}