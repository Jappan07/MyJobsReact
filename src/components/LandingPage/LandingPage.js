import React, { useEffect, useContext, useState } from "react"
import classes from "./LandingPage.module.css"
import { useHistory } from "react-router"

import AuthContext from "../../store/auth-context"

import HeroImage from "../../assets/hero-image.png"

import AlphabetLogo from "../../assets/alphabetLogo.png"
import GoogleLogo from "../../assets/Google-logo.png"
import MicrosoftLogo from "../../assets/microsoftLogo.png"
import SolayticLogo from "../../assets/solaytic-logo.png"
import NvidiaLogo from "../../assets/Nvidia-Symbol.jpg"
import FreshWorks from "../../assets/fresgwirks-color-1.png"
import AttlassianLogo from "../../assets/atlassian_logo-1200x630.png"
import CredLogo from "../../assets/cred-logo.png"
import FirebaseLogo from "../../assets/firebase-logo.png"

import Logo from "../UI/Logo/Logo"
import Button from "../UI/Button/Button"
import Card from "../UI/Card/Card"

const LandingPage = () => {
    const [title] = useState("Jobs Portal")
    const authCtx = useContext(AuthContext)

    const history = useHistory()

    useEffect(() => {
        document.title = title
    }, [title])

    const onButtonClickHandler = () => {
        authCtx.isLoggedIn
            ? history.push("/postings")
            : history.push("/auth")
    }

    return (
        <React.Fragment>
            <section className={[classes.HeroSection, classes.SiteSection].join(" ")}>
                <div className={classes.Content}>
                    <h1>Welcome to</h1>
                    <Logo size="60px" /><br />
                    <Button clicked={onButtonClickHandler}>Get Started</Button>
                </div>
                <img src={HeroImage} alt="heroImage" />
            </section>
            <section className={classes.SiteSection}>
                <h2>Why Us</h2>
                <div className={classes.FeaturesSection}>
                    <Card className={classes.Feature}
                        height={"222px"}
                        heading="Get More Visibility"
                        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" />
                    <Card className={classes.Feature}
                        height={"222px"}
                        heading="Organize Your Candidates"
                        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" />
                    <Card className={classes.Feature}
                        height={"222px"}
                        heading="Verify Their Abilities"
                        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" />
                </div>
            </section>
            <section className={classes.SiteSection2}>
                <h2>Companies Who Trust Us</h2>
                <div className={classes.CompaniesSection}>
                    <img src={AlphabetLogo} alt="Logo" />
                    <img src={MicrosoftLogo} alt="Logo" />
                    <img style={{ height: "80px" }} src={GoogleLogo} alt="Logo" />
                    <img style={{ height: "80px" }} src={CredLogo} alt="Logo" />
                    <img style={{ height: "55px" }} src={SolayticLogo} alt="Logo" />
                    <img style={{ height: "80px" }} src={NvidiaLogo} alt="Logo" />
                    <img style={{ height: "100px" }} src={AttlassianLogo} alt="Logo" />
                    <img style={{ height: "55px" }} src={FirebaseLogo} alt="Logo" />
                    <img style={{ height: "120px" }} src={FreshWorks} alt="Logo" />
                </div>
            </section>
        </React.Fragment>
    )
}

export default LandingPage