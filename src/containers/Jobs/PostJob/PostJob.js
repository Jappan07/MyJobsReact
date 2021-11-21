import React, { useState, useContext, useEffect } from "react"
import { useHistory } from "react-router"
import classes from "./PostJob.module.css"

import axios from "../../../axios-jobs"

import Button from "../../../components/UI/Button/Button"
import Input from "../../../components/UI/Input/Input"
import AuthContext from "../../../store/auth-context"
import { toast } from "react-toastify"

const PostJob = () => {
    const [title] = useState("Post Job")
    const [formIsValid, setFormIsValid] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const history = useHistory()

    const authCtx = useContext(AuthContext)

    const authToken = authCtx.token

    const [controls, setControls] = useState({
        title: {
            elementType: "input",
            elementConfig: {
                type: "text",
                label: "Job title",
                placeholder: "Enter job title"
            },
            value: "",
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        description: {
            elementType: "textarea",
            elementConfig: {
                type: "textArea",
                label: "Description*",
                placeholder: "Enter job description"
            },
            value: "",
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        },
        location: {
            elementType: "input",
            elementConfig: {
                type: "text",
                label: "Location*",
                placeholder: "Enter location"
            },
            value: "",
            validation: {
                required: true,
                minLength: 3
            },
            valid: false,
            touched: false
        },
    })

    useEffect(() => {
        document.title = title
    }, [title])

    const checkValidity = (value, rules) => {
        let isValid = true
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
        return isValid
    }

    const formElementsArray = []
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        })
    }

    const inputChangedHandler = (event, controlName) => {
        // creating a deep copy
        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            }
        }
        let formIsValid = true
        for (let controlName in updatedControls) {
            formIsValid = updatedControls[controlName].valid && formIsValid
        }
        setControls(updatedControls)
        setFormIsValid(formIsValid)
    }

    const resetForm = () => {
        let updatedControls = {}
        for (let controlName in controls) {
            updatedControls = {
                ...updatedControls,
                [controlName]: {
                    ...controls[controlName],
                    value: "",
                    valid: false,
                    touched: false
                }
            }
        }
        setControls(updatedControls)
        setFormIsValid(false)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        setIsLoading(false)

        const enteredTitle = controls["title"].value
        const enteredDescription = controls["description"].value
        const enteredLocation = controls["location"].value

        axios.post("jobs/", {
            "title": enteredTitle,
            "description": enteredDescription,
            "location": enteredLocation
        }, {
            headers: { "Authorization": `${authToken}` }
        })
            .then(response => {
                toast("Job Posted Successfully!")
                setIsLoading(false)
                resetForm()
                history.replace("/postings")
            })
            .catch(error => {
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
        <div className={classes.PostJob}>
            <h1>Post a Job</h1>
            <form onSubmit={onSubmitHandler}>
                {form}
                {errorMessage ? <p className={classes.ErrorMessage}>{errorMessage}</p> : null}
                <div className={classes.PostButtonContainer}>
                    {
                        !isLoading
                            ? <Button disabled={!formIsValid}>Post</Button>
                            : <p>Posting job...</p>
                    }
                </div>
            </form>
        </div>
    )
}

export default PostJob