import { checkValidity } from "./checkValidity"

export const updateControlInputs = (event, controlName, controls) => {
    return {
        ...controls,
        [controlName]: {
            ...controls[controlName],
            value: controlName === "userRole" ? +event.target.value : event.target.value,
            valid: checkValidity(event.target.value, controls[controlName].validation, controlName),
            touched: true
        }
    }
}