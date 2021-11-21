import React, { useState, useEffect, useContext, useCallback } from "react"
import classes from "./JobApplicants.module.css"

import axios from "../../../axios-jobs"

import AuthContext from "../../../store/auth-context";
import UserRoleContext from "../../../store/userRole-context";

import DescriptionIcon from '@mui/icons-material/Description';

import ProfileCard from "../../../components/UI/ProfileCard/ProfileCard"
import FallbackUi from "../../../components/UI/FallbackUi/FallbackUi"
import Spinner from "../../../components/UI/Spinner/Spinner"
import { toast } from "react-toastify";

const JobApplicants = (props) => {
    const [applicantsData, setApplicantsData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const authCtx = useContext(AuthContext)
    const userRoleCtx = useContext(UserRoleContext)

    const fetchCandidates = useCallback((jobId) => {
        setIsLoading(true)
        const authToken = authCtx.token
        const userRole = userRoleCtx.isRecruiter ? "recruiters" : "candidates"
        axios.get(`${userRole}/jobs/${jobId}/candidates`, {
            headers: {
                Authorization: authToken
            }
        }).then(response => {
            setIsLoading(false)
            const data = response.data.data
            setApplicantsData(data)
        }).catch(error => {
            setIsLoading(false)
            toast.error("Cannot fetch applicants!")
        })
    }, [])

    useEffect(() => {
        let jobId = props.jobSelected
        fetchCandidates(jobId)
    }, [])

    let jobApplicants = !isLoading
        ? applicantsData !== undefined
            ? (
                <React.Fragment>
                    {applicantsData.map(applicant => {
                        return (
                            <ProfileCard
                                key={applicant.id}
                                name={applicant.name}
                                email={applicant.email}
                                skills={applicant.skills} />
                        )
                    })}
                </React.Fragment>
            )
            : (
                <FallbackUi
                    height="150px"
                    background="transparent"
                    icon={< DescriptionIcon />}
                    content="No applicants available!">
                </FallbackUi>
            )
        : <Spinner />

    return (
        <div>
            <p style={{ fontSize: "15px" }}>Total {applicantsData ? applicantsData.length : "0"} applications</p>
            <div className={classes.JobApplicants}>
                {jobApplicants}
            </div>
        </div>
    )
}

export default React.memo(JobApplicants)