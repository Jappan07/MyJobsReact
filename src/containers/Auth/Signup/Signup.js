import React, { useState, useEffect } from "react"
import classes from "./Signup.module.css"

import axios from "../../../axios-jobs"

import Input from "../../../components/UI/Input/Input"
import Button from "../../../components/UI/Button/Button"
import { updateControlInputs } from "../../../utils/updateControlInputs";
import { toast } from "react-toastify"

const Signup = (props) => {
    const [formIsValid, setFormIsValid] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const [controls, setControls] = useState({
        userRole: {
            label: "I'm a",
            value: 0,
            valid: false,
            touched: false,
            validation: {
                required: true
            },
            roles: [
                {
                    designation: "recruiter",
                    elementType: "radio",
                    elementConfig: {
                        type: "radio",
                        label: "Recruiter",
                        name: "userRole"
                    },
                    value: 0,
                },
                {
                    designation: "candidate",
                    elementType: "radio",
                    elementConfig: {
                        type: "radio",
                        label: "Candidate",
                        name: "userRole"
                    },
                    value: 1,
                }
            ]
        },
        name: {
            elementType: "input",
            elementConfig: {
                type: "text",
                label: "Full Name",
                placeholder: "Enter your full name"
            },
            value: "",
            validation: {
                required: true,
                checkSpecialCharacters: true
            },
            valid: false,
            touched: false
        },
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
        },
        password: {
            elementType: "input",
            elementConfig: {
                type: "password",
                label: "Create Password",
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
                label: "Confirm Password",
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
        skills: {
            elementType: "input",
            elementConfig: {
                type: "text",
                label: "Skills",
                placeholder: "Enter comma separated skills"
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

    useEffect(() => {
        document.title = "Signup"
    }, [])

    const formElementsArray = []
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        })
    }

    const inputChangedHandler = (event, controlName) => {
        let formIsValid = true
        // creating a deep copy
        const updatedControls = updateControlInputs(event, controlName, controls)
        for (let controlName in updatedControls) {
            formIsValid = updatedControls[controlName].valid && formIsValid
        }
        setControls(updatedControls)
        setFormIsValid(formIsValid)
    }

    const submitHandler = (e) => {
        e.preventDefault()

        setIsLoading(true)

        let formData = {}
        for (let elementName in controls) {
            formData[elementName] = controls[elementName].value
        }

        axios.post("auth/register", formData)
            .then(response => {
                toast.success("Account Created!")
                toast.info("Authenticate yourself!")
                setIsLoading(false)
                props.isLoginHandler(true)
            })
            .catch(error => {
                setIsLoading(false)
                toast.error("Error Creating Account!")
                if (error.response) {
                    let errorMessage = error.response.data.message
                    setErrorMessage(errorMessage)
                }
            })

    }

    let form = formElementsArray.map(formElement => {
        const renderInput = formElement.id === "userRole"
            ? (
                <div key={formElement.id} className={classes.SignupForm}>
                    <label style={{ display: "block" }} key={formElement.config.label}>
                        {formElement.config.label}<span style={{ color: "red" }}>*</span>
                    </label>
                    <div className={classes.ButtonContainer}>
                        {formElement.config.roles.map(role => (
                            <Input
                                key={role.designation}
                                elementType={role.elementType}
                                elementConfig={role.elementConfig}
                                value={role.value}
                                changed={(event) => inputChangedHandler(event, formElement.id)}
                            />
                        )
                        )}
                    </div>
                </div>
            )
            : (
                <div key={formElement.id} className={classes.SignupForm}>
                    <label key={formElement.config.elementConfig.label}>
                        {formElement.config.elementConfig.label}<span style={{ color: "red" }}>*</span>
                    </label>
                    <Input
                        key={formElement.id}
                        elementName={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => inputChangedHandler(event, formElement.id)} />
                </div>
            )

        return renderInput
    })

    return (
        <div className={classes.Signup}>
            <form onSubmit={submitHandler}>
                {form}
                {errorMessage ? <p className={classes.ErrorMessage}>{errorMessage}</p> : null}
                <div className={classes.SignupControls}>
                    {
                        !isLoading
                            ? <Button disabled={!formIsValid}>Signup</Button>
                            : <p>Sending Request...</p>
                    }
                </div>
            </form>
        </div>
    )
}

export default Signup