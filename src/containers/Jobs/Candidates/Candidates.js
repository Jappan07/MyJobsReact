import React, { useContext } from 'react'
import { useHistory } from 'react-router';

import FileUploadIcon from '@mui/icons-material/FileUpload';

import axios from "../../../axios-jobs"

import AuthContext from "../../../store/auth-context"

import { toast } from 'react-toastify';
import Card from '../../../components/UI/Card/Card'
import Button from '../../../components/UI/Button/Button';
import FallbackUi from "../../../components/UI/FallbackUi/FallbackUi";

const Candidates = (props) => {

    const authCtx = useContext(AuthContext)
    const authToken = authCtx.token

    const history = useHistory()


    const onClickApplyHandler = (jobId) => {
        axios.post("candidates/jobs", {
            "jobId": jobId
        }, {
            headers: { "Authorization": `${authToken}` }
        })
            .then(response => {
                props.fetchData()
                toast.success("Applied Successfully!")
            })
            .catch(error => {
                toast.error("Cannot Apply! ")
            })
    }

    return (
        <React.Fragment>
            {props.jobData.length !== 0
                ? (props.jobData.map(job => {
                    return (
                        <Card
                            height={"222px"}
                            key={job.id}
                            heading={job.title}
                            content={job.description}
                            extraInformation={{ location: job.location, buttonRequired: true }}
                            clicked={null}
                            buttonClicked={() => onClickApplyHandler(job.id)}
                        />
                    )
                }))
                : (
                    <FallbackUi
                        icon={<FileUploadIcon />}
                        content={"No available jobs!"}>
                        <Button clicked={() => history.push("appliedjobs")}>See jobs applied</Button>
                    </FallbackUi>
                )
            }
        </React.Fragment>
    )
}

export default Candidates
