import React, { useState, useRef } from "react"
import classes from "./Input.module.css"

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Input = (props) => {
    const inputRef = useRef()
    const [passwordVisible, setPasswordVisible] = useState(false)

    const visibilityHandler = () => {
        const typeOfElement = inputRef.current.type
        if (typeOfElement === "password") {
            inputRef.current.type = "text"
            setPasswordVisible(true)
            return
        }
        if (typeOfElement === "text") {
            inputRef.current.type = "password"
            setPasswordVisible(false)
            return
        }
    }

    let inputElement = null
    const inputClasses = [classes.InputElement]
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
    }
    switch (props.elementType) {
        case "input":
            if (props.elementConfig.type === "password") {
                inputElement = (
                    <div style={{ width: "100%", position: "relative" }}>
                        <input className={inputClasses.join(" ")}
                            value={props.value} {...props.elementConfig}
                            ref={inputRef}
                            onChange={props.changed}
                            autoComplete="off"
                        />
                        {passwordVisible
                            ? <VisibilityIcon onClick={() => visibilityHandler(props.elementName)} className={classes.EyeIcon} />
                            : <VisibilityOffIcon onClick={() => visibilityHandler(props.elementName)} className={classes.EyeIcon} />
                        }

                    </div>
                )
            }
            else {
                inputElement = <input className={inputClasses.join(" ")}
                    value={props.value} {...props.elementConfig}
                    onChange={props.changed}
                    autoComplete="off"
                />
            }

            break;

        case "textarea":
            inputElement = < textarea className={inputClasses.join(" ")}
                value={props.value} {...props.elementConfig}
                onChange={props.changed}
                autoComplete="off"
            />
            break;

        case "radio":
            inputElement = (
                <div className={classes.RadioButton} >
                    <label>{props.elementConfig.label}</label>
                    <input value={props.value} {...props.elementConfig} onChange={props.changed} />
                </div>
            )
            break;

        case "select":
            inputElement = (<select
                className={inputClasses.join(" ")}
                value={props.value}
                onChange={props.changed} > {
                    props.elementConfig.options.map(option => {
                        return (
                            <option key={option.value}
                                value={option.value} > {option.displayValue}
                            </option>
                        )
                    })
                }
            </select>)
            break;

        default:
            inputElement = <input className={inputClasses.join(" ")}
                value={props.value} {...props.elementConfig}
                onChange={props.changed}
                autoComplete="off"
            />
            break;
    }
    return (
        <div className={classes.Input} >
            <label className={classes.Label}> {props.label} </label>
            {inputElement}
        </div>
    )
}

export default Input