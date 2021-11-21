import React, { useState, useContext } from "react"
import { useHistory } from "react-router"
import classes from "./ForgotPassword.module.css"

import axios from "../../axios-jobs"

import Input from "../../components/UI/Input/Input"
import Button from "../../components/UI/Button/Button"
import AuthContext from "../../store/auth-context"
import { updateControlInputs } from "../../utils/updateControlInputs"

const ForgotPassword = () => {
    const authCtx = useContext(AuthContext)

    const [formIsValid, setFormIsValid] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const history = useHistory()

    const [controls, setControls] = useState({
        email: {
            elementType: "input",
            elementConfig: {
                type: "email",
                label: "Email Address",
                placeholder: "Enter your email"
            },
            value: "",
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        }
    })

    const elementName = Object.keys(controls)[0]
    let formElement = controls[elementName]

    const inputChangedHandler = (event, controlName) => {
        // creating a deep copy
        const updatedControls = updateControlInputs(event, controlName, controls)
        let formIsValid = true
        for (let controlName in updatedControls) {
            formIsValid = updatedControls[controlName].valid && formIsValid
        }
        setControls(updatedControls)
        setFormIsValid(formIsValid)
    }

    const verifyPasswordHandler = (token) => {
        axios.get(`auth/resetpassword/${token}`)
            .then(response => {
                const statusCode = response.data.code
                if (statusCode === 200) {
                    authCtx.resetPassword(token)
                }
                history.replace("/resetpassword")
            })
            .catch(error => {
                setIsLoading(false)
                if (error.response) {
                    let errorMessage = error.response.data.message
                    setErrorMessage(errorMessage)
                }
            })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        const enteredEmail = controls["email"].value

        setIsLoading(true)

        axios.get(`auth/resetpassword?email=${enteredEmail}`)
            .then(response => {
                setIsLoading(false)
                const passwordResetToken = response.data.data.token
                verifyPasswordHandler(passwordResetToken)
                // history.replace("/postings")
            })
            .catch(error => {
                setIsLoading(false)
                if (error.response) {
                    let errorMessage = error.response.data.message
                    setErrorMessage(errorMessage)
                }
            })
    }

    return (
        <div className={classes.ForgotPassword}>
            <div className={classes.Header}>
                <h1>Forgot your password?</h1>
                <p>Enter the email associated with your account and we'll send you instructions to reset you password.</p>
            </div>
            <form onSubmit={onSubmitHandler}>
                <label key={formElement.elementConfig.label}>{formElement.elementConfig.label}</label>
                <Input
                    key={elementName}
                    elementType={formElement.elementType}
                    elementConfig={formElement.elementConfig}
                    value={formElement.value}
                    invalid={!formElement.valid}
                    shouldValidate={formElement.validation}
                    touched={formElement.touched}
                    changed={(event) => inputChangedHandler(event, elementName)}
                />
                {errorMessage ? <p className={classes.ErrorMessage}>{errorMessage}</p> : null}
                <div className={classes.ButtonContainer}>
                    {
                        !isLoading
                            ? <Button disabled={!formIsValid}>Submit</Button>
                            : <p>Please wait...</p>
                    }
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword