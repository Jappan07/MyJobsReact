import React, { useState } from 'react'

import Input from '../Input/Input'
import Button from '../Button/Button'

import { updateControlInputs } from '../../../utils/updateControlInputs'

const SearchInput = (props) => {
    const [formIsValid, setFormIsValid] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [controls, setControls] = useState({
        title: {
            elementType: "input",
            elementConfig: {
                type: "text",
                label: "Job title",
                placeholder: "Search job title"
            },
            value: "",
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        }
    })

    const formElementsArray = []
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        })
    }

    const onSearchButtonHandler = () => {
        if (!searchValue) return

        const filteredJobData = props.data.filter((obj) => {
            return obj["title"].toLowerCase().includes(searchValue.toLowerCase())
        })

        props.updateData(filteredJobData)
    }

    const onClearButtonHandler = () => {
        if (!searchValue) return

        setFormIsValid(false)
        setSearchValue("")
        props.fetchData?.call()
    }


    const onChangeInputHandler = (event, controlName) => {
        let value = event.target.value.toLowerCase()
        // creating a deep copy
        const updatedControls = updateControlInputs(event, controlName, controls)
        let formIsValid = true
        for (let controlName in updatedControls) {
            formIsValid = updatedControls[controlName].valid && formIsValid
        }
        setControls(updatedControls)
        setFormIsValid(formIsValid)
        setSearchValue(value)
    }

    return (
        <React.Fragment>
            <label style={{ color: "#fff" }} >Filter by Job</label>
            <Input
                elementType={formElementsArray[0].config.elementType}
                elementConfig={formElementsArray[0].config.elementConfig}
                value={searchValue}
                invalid={!formElementsArray[0].config.valid}
                shouldValidate={formElementsArray[0].config.validation}
                touched={formElementsArray[0].config.touched}
                changed={(event) => onChangeInputHandler(event, formElementsArray[0].id)} />
            <Button disabled={!formIsValid} clicked={onSearchButtonHandler}>Search</Button>
            <Button disabled={!formIsValid} clicked={onClearButtonHandler}>Clear</Button>
        </React.Fragment>
    )
}

export default SearchInput
