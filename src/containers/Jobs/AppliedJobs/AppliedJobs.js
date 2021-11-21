import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router';
import classes from "./AppliedJobs.module.css"

import NoteAltIcon from '@mui/icons-material/NoteAlt'

import axios from "../../../axios-jobs"

import AuthContext from '../../../store/auth-context'

import Card from '../../../components/UI/Card/Card'
import Button from '../../../components/UI/Button/Button';
import FallbackUi from '../../../components/UI/FallbackUi/FallbackUi'

import Pagination from '../../../utils/pagination/Pagination'
import { toast } from 'react-toastify';
import Spinner from '../../../components/UI/Spinner/Spinner';

const AppliedJobs = () => {
    const [title] = useState("Jobs Applied")
    const [jobData, setJobData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const history = useHistory()

    const authCtx = useContext(AuthContext)
    const authToken = authCtx.token

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        setIsLoading(true)
        axios.get("/candidates/jobs/applied", {
            headers: {
                Authorization: authToken
            }
        }).then(response => {
            setIsLoading(false)
            setJobData(response.data.data)
        }).catch(error => {
            setIsLoading(false)
            toast.error("Cannot fetch Jobs!")
        })
    }, [authToken])

    const jobsApplied = !isLoading
        ? (
            jobData
                ? <Pagination
                    data={jobData}
                    RenderComponent={Card}
                    title="jobs"
                    pageLimit={jobData.length / 20}
                    dataLimit={20}
                />
                : <FallbackUi
                    icon={<NoteAltIcon />}
                    content={"Your applied jobs will show here!"}>
                    <Button clicked={() => history.push("postings")}>See all jobs</Button>
                </FallbackUi>
        )
        : (
            <Spinner />
        )

    return (
        <div className={classes.JobsAppliedContainer}>
            <h1>Jobs applied by you</h1>
            <div className={classes.JobsApplied}>
                {jobsApplied}
            </div>
        </div >
    )
}

export default AppliedJobs