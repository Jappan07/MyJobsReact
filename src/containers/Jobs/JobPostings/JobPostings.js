import React, { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router";
import classes from "./JobPostings.module.css"

import axios from "../../../axios-jobs"

import AuthContext from "../../../store/auth-context"
import UserRoleContext from "../../../store/userRole-context";

import Recruiters from "../Recruiters/Recruiters";
import Candidates from "../Candidates/Candidates";
import SearchInput from "../../../components/UI/SearchInput/SearchInput";
import PageNavigationControls from "../../../components/UI/PageNavigationControls/PageNavigationControls";
import { toast } from "react-toastify";
import Spinner from "../../../components/UI/Spinner/Spinner";

// This is the page that displays the jobs for the userRole that you have loggined with
const JobPostings = () => {
    const [title] = useState("Job Postings")
    const [isLoading, setIsLoading] = useState(false)
    let [jobData, setJobData] = useState([])
    const [page, setPage] = useState(1)
    const [totalNumberOfPages, setTotalNumberOfPages] = useState(1)

    const authCtx = useContext(AuthContext)
    const authToken = authCtx.token

    const userRoleCtx = useContext(UserRoleContext)
    const isRecruiter = userRoleCtx.isRecruiter
    const userRole = isRecruiter ? "recruiters" : "candidates"

    const history = useHistory()

    const fetchJobsCount = async () => {
        setIsLoading(true)
        let numberOfJobPostings = 0

        await axios.get(`${userRole}/jobs`, {
            headers: {
                Authorization: authToken
            }
        })
            .then(response => {
                setIsLoading(false)
                if (userRole === "recruiters") {
                    numberOfJobPostings = response.data.data.metadata.count
                }
                if (userRole === "candidates") {
                    numberOfJobPostings = response.data.metadata.count
                }
                return numberOfJobPostings
            })
            .catch(err => {
                setIsLoading(false)
            })

        return { numberOfJobPostings }

    }

    const fetchJobData = (pageNumber) => {
        console.log("fetchjobdata")
        return axios.get(`${userRole}/jobs?page=${pageNumber}`, {
            headers: {
                Authorization: authToken
            }
        })
            .then(response => {
                let data = null
                const fetchJobs = []
                // set the query params to the url
                if (userRole === "recruiters") {
                    data = response.data.data.data
                }
                if (userRole === "candidates") {
                    data = response.data.data
                }
                if (data === undefined) return

                data.map(job => fetchJobs.push(job))
                setJobData(fetchJobs)

                // setting url params
                let currentUrlParams = new URLSearchParams(window.location.search);
                currentUrlParams.set('page', page);
                history.push(window.location.pathname + "?" + currentUrlParams.toString());
            })
            .catch(err => {
                toast.info("No Jobs Posted Yet!")
            })
    }

    useEffect(() => {
        document.title = title

        fetchJobsCount().then((response) => {
            let totalNumberOfPages = Math.ceil(response.numberOfJobPostings / 20)
            setTotalNumberOfPages(totalNumberOfPages)
        })
    }, [title])

    useEffect(() => {
        if (page < 1) {
            return setPage(1)
        }
        if (page > totalNumberOfPages) {
            return setPage(totalNumberOfPages)
        }
        fetchJobData(page)
    }, [page])

    const jobPostings = !isLoading
        ? (
            <React.Fragment>
                <div className={classes.JobPostings}>
                    {isRecruiter
                        ? <Recruiters jobData={jobData} fetchData={() => fetchJobData(page)} />
                        : <Candidates jobData={jobData} fetchData={() => fetchJobData(page)} />
                    }
                </div>
            </React.Fragment>
        )
        : (
            <Spinner />
        )

    const pageNavigation = (
        jobData.length === 0
            ? null
            : <PageNavigationControls
                page={page}
                totalNumberOfPages={totalNumberOfPages}
                nextPage={() => setPage(page => page + 1)}
                prevPage={() => setPage(page => page - 1)}
            />
    )

    return (
        <React.Fragment>
            <div className={classes.JobPostingsContainer}>
                {/* searchbar for filtering jobs */}
                {
                    jobData.length !== 0
                        ? <div className={classes.JobSearchContainer}>
                            <SearchInput
                                data={jobData}
                                updateData={(filteredData) => setJobData(filteredData)}
                                fetchData={() => fetchJobData(page)}
                            />
                        </div>
                        : null
                }

                {/* heading */}
                <h1>{isRecruiter ? "Jobs Posted by you" : "Jobs for you"}</h1>

                {/* jobPostings */}
                {jobPostings}
                {pageNavigation}

            </div>
        </React.Fragment>
    )
}

export default JobPostings