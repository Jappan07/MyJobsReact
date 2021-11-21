import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router';

import FileUploadIcon from '@mui/icons-material/FileUpload';

import axios from "../../../axios-jobs"

import AuthContext from "../../../store/auth-context"

import Card from '../../../components/UI/Card/Card'
import Modal from "../../../components/UI/Modal/Modal"
import Button from '../../../components/UI/Button/Button';
import FallbackUi from "../../../components/UI/FallbackUi/FallbackUi";
import JobApplicants from "../JobApplicants/JobApplicants";
import { toast } from 'react-toastify';

const Recruiters = (props) => {
    const [selectedJob, setSelectedJob] = useState("")
    const [showApplicantsModal, setShowApplicantsModal] = useState(false)

    const authCtx = useContext(AuthContext)
    const authToken = authCtx.token

    const history = useHistory()

    const hideShowAppicantsModal = () => [
        setShowApplicantsModal(false)
    ]

    const onClickShowApplicantsHandler = (jobId) => {
        setSelectedJob(jobId)
        setShowApplicantsModal(true)
    }

    const deleteJobPost = (jobIdentifier) => {
        console.log(jobIdentifier)
        let confirmationPrompt = window.confirm("Confirm Deletion?")
        if (confirmationPrompt) {
            axios.delete("jobs", {
                headers: { "Authorization": `${authToken}` },
                data: { "jobId": jobIdentifier }
            }
            ).then(res => {
                toast.success("Job deleted Successfully!")
                props.fetchData()
            })
        }
        else {
            return
        }
    }

    return (
        <React.Fragment>
            {showApplicantsModal
                ? <Modal
                    modalClosed={hideShowAppicantsModal}
                    show={showApplicantsModal}>
                    Applicants for this Job
                    <hr />
                    <JobApplicants jobSelected={selectedJob} />
                </Modal >
                : null
            }

            {props.jobData.length !== 0
                ? (props.jobData.map(job => {
                    return (
                        <Card
                            height={"222px"}
                            key={job.id}
                            heading={job.title}
                            content={job.description}
                            extraInformation={{ location: job.location, buttonRequired: true }}
                            clicked={() => deleteJobPost(job.id)}
                            buttonClicked={() => onClickShowApplicantsHandler(job.id)}
                        />
                    )
                }))
                : (
                    <FallbackUi
                        icon={<FileUploadIcon />}
                        content={"Your posted jobs will show here!"}>
                        <Button clicked={() => history.push("postJob")}>Post a Job</Button>
                    </FallbackUi>
                )
            }
        </React.Fragment>
    )
}

export default Recruiters
