import React, { useState, useEffect, useContext } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { Redirect } from "react-router-dom"
import { useHistory } from "react-router"
import classes from "./Login.module.css"

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "../../../axios-jobs"

// import { auth, setAuthRedirectPath } from "../../../store/authSlice"

import AuthContext from "../../../store/auth-context"
import UserRoleContext from "../../../store/userRole-context"

import Input from "../../../components/UI/Input/Input"
import Button from "../../../components/UI/Button/Button"

import { updateControlInputs } from "../../../utils/updateControlInputs"

const Login = (props) => {
    const [title] = useState("Login")
    const [formIsValid, setFormIsValid] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    // const errorMessage = useSelector((state) => state.auth.error)
    // const isLoading = useSelector((state) => state.auth.loading)
    // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    // const authRedirectPath = useSelector((state) => state.auth.authRedirectPath)

    // const dispatch = useDispatch()

    const history = useHistory()

    const authCtx = useContext(AuthContext)
    const userRoleCtx = useContext(UserRoleContext)

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
        },
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
    })

    useEffect(() => {
        document.title = title
    }, [title])


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

    const forgotPassHandler = () => {
        history.replace("/validate")
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        const enteredEmail = controls["email"].value
        const enteredPassword = controls["password"].value

        // dispatch(auth({
        //     enteredEmail: enteredEmail,
        //     enteredPassword: enteredPassword
        // }))

        setIsLoading(true)

        // dispatch(auth({ enteredEmail: enteredEmail, enteredPassword: enteredPassword }))

        axios.post("auth/login", {
            "email": enteredEmail,
            "password": enteredPassword
        })
            .then(response => {
                setIsLoading(false)
                toast.success("Login Successful!")
                userRoleCtx.assignRole(response.data.data.userRole)
                authCtx.login(response.data.data.token)
                authCtx.getName(response.data.data.name)
                history.push("/postings")
            })
            .catch(error => {
                setIsLoading(false)
                toast.error("Cannot Login!")
                if (error.response) {
                    let errorMessage = error.response.data.message
                    setErrorMessage(errorMessage)
                }
            })

    }

    const guestLoginHandlerCandidate = (e) => {
        e.preventDefault()

        const enteredEmail = "guestcandidate@gmail.com"
        const enteredPassword = "guestCandidate123"

        // dispatch(auth({
        //     enteredEmail: enteredEmail,
        //     enteredPassword: enteredPassword
        // }))

        setIsLoading(true)

        // dispatch(auth({ enteredEmail: enteredEmail, enteredPassword: enteredPassword }))

        axios.post("auth/login", {
            "email": enteredEmail,
            "password": enteredPassword
        })
            .then(response => {
                setIsLoading(false)
                toast.success("Login Successful!")
                userRoleCtx.assignRole(response.data.data.userRole)
                authCtx.login(response.data.data.token)
                authCtx.getName(response.data.data.name)
                history.push("/postings")
            })
            .catch(error => {
                setIsLoading(false)
                toast.error("Cannot Login!")
                if (error.response) {
                    let errorMessage = error.response.data.message
                    setErrorMessage(errorMessage)
                }
            })


    }

    const guestLoginHandlerRecruiter = (e) => {
        e.preventDefault()

        const enteredEmail = "guest@gmail.com"
        const enteredPassword = "guest123"

        // dispatch(auth({
        //     enteredEmail: enteredEmail,
        //     enteredPassword: enteredPassword
        // }))

        setIsLoading(true)

        // dispatch(auth({ enteredEmail: enteredEmail, enteredPassword: enteredPassword }))

        axios.post("auth/login", {
            "email": enteredEmail,
            "password": enteredPassword
        })
            .then(response => {
                setIsLoading(false)
                toast.success("Login Successful!")
                userRoleCtx.assignRole(response.data.data.userRole)
                authCtx.login(response.data.data.token)
                authCtx.getName(response.data.data.name)
                history.push("/postings")
            })
            .catch(error => {
                setIsLoading(false)
                toast.error("Cannot Login!")
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

    // let authRedirect = null
    // if (isLoggedIn) {
    //     authRedirect = <Redirect to={authRedirectPath} />
    // }

    return (
        <div className={classes.Login}>
            {/* {authRedirect} */}
            <form>
                {form}
                <span onClick={forgotPassHandler} className={classes.ForgotPass}>Forgot your password?</span>
                {errorMessage ? <p className={classes.ErrorMessage}>{errorMessage}</p> : null}
                <div className={classes.LoginControls}>
                    {
                        !isLoading
                            ?
                            <>
                                <Button clicked={onSubmitHandler} disabled={!formIsValid}>Login</Button>
                                <Button btnType="Secondary" clicked={guestLoginHandlerRecruiter}>Guest Login as Recruiter</Button>
                                <Button btnType="Secondary" clicked={guestLoginHandlerCandidate}>Guest Login as Candidate</Button>
                            </>
                            : <p>Requesting Access...</p>
                    }
                </div>
            </form>
        </div>
    )
}

export default Login