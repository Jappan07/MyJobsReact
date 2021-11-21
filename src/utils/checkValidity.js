let password = ""

export const checkValidity = (value, rules, ...controlName) => {
    let isValid = true

    if (rules.checkSpecialCharacters) {
        const pattern = /^[a-z ,.'-]+$/i
        isValid = pattern.test(value) && isValid
    }

    if (rules.required) {
        isValid = value.trim() !== "" && isValid
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.minLength && isValid
    }

    if (controlName[0] === "password") {
        password = value
    }

    if (controlName[0] === "confirmPassword") {
        if (value !== password) {
            isValid = false
        }
        else {
            isValid = true
        }
    }

    return isValid
}