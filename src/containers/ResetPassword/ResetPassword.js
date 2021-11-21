import React, { useState, useContext } from "react"
import classes from "./ResetPassword.module.css"

import axios from "../../axios-jobs"

import { useHistory } from "react-router"

import Input from "../../components/UI/Input/Input"
import Button from "../../components/UI/Button/Button"
import AuthContext from "../../store/auth-context"
import { updateControlInputs } from "../../utils/updateControlInputs"
import { toast } from "react-toastify"

const ResetPassword = () => {
    const history = useHistory()

    const authCtx = useContext(AuthContext)
    const resetPasswordToken = authCtx.resetPasswordToken

    const [formIsValid, setFormIsValid] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const [controls, setControls] = useState({
        password: {
            elementType: "input",
            elementConfig: {
                type: "password",
                label: "Password",
                placeholder: "Enter your password"
            },
            value: "",
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        },
        confirmPassword: {
            elementType: "input",
            elementConfig: {
                type: "password",
                label: "Confirm password",
                placeholder: "Enter your password"
            },
            value: "",
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        },
    })

    const formElementsArray = []
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        })
    }

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

    const onSubmitHandler = (e) => {
        e.preventDefault()

        const enteredPassword = controls["password"].value
        const enteredConfirmPassword = controls["confirmPassword"].value

        setIsLoading(true)

        axios.post("auth/resetpassword", {
            "password": enteredPassword,
            "confirmPassword": enteredConfirmPassword,
            "token": resetPasswordToken
        })
            .then(response => {
                toast.success("Password Reset Successfull!")
                setIsLoading(false)
                history.replace("/auth")
            })
            .catch(error => {
                toast.error("Password Reset Unsuccessfull!")
                setIsLoading(false)
                if (error.response) {
                    let errorMessage = error.response.data.message
                    setErrorMessage(errorMessage)
                }
            })
    }

    let form = formElementsArray.map(formElement => {
        return (
            <div key={formElement.id} className={classes.LoginForm}>
                <label key={formElement.config.elementConfig.label}>{formElement.config.elementConfig.label}</label>
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)} />
            </div>
        )
    })

    return (
        <div className={classes.ResetPassword}>
            <h1>Reset your password</h1>
            <p>Enter your new password below.</p>
            <form onSubmit={onSubmitHandler}>
                {form}
                {errorMessage ? <p className={classes.ErrorMessage}>{errorMessage}</p> : null}
                <div className={classes.ButtonContainer}>
                    {
                        !isLoading
                            ? <Button disabled={!formIsValid}>Reset</Button>
                            : <p>Resetting...</p>
                    }
                </div>
            </form>

        </div>
    )

}

export default ResetPassword