import React, { Suspense } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { AuthContextProvider } from "./store/auth-context"
import { UserRoleContextProvider } from "./store/userRole-context";

import Layout from "./components/Layout/Layout"
import LandingPage from "./components/LandingPage/LandingPage"
import ForgotPassword from "./containers/ForgotPassword/ForgotPassword";
import ResetPassword from "./containers/ResetPassword/ResetPassword"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import NotFound from "./components/NotFound/NotFound";

const JobPostings = React.lazy(() => {
  return import("./containers/Jobs/JobPostings/JobPostings")
})

const PostJob = React.lazy(() => {
  return import("./containers/Jobs/PostJob/PostJob")
})

const AppliedJobs = React.lazy(() => {
  return import("./containers/Jobs/AppliedJobs/AppliedJobs")
})

const Auth = React.lazy(() => {
  return import("./containers/Auth/Auth")
})

const App = () => {

  let routes = (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/auth" component={Auth} />
      <Route exact path="/validate" component={ForgotPassword} />
      <Route exact path="/resetpassword" component={ResetPassword} />
      <PrivateRoute exact path="/postings" component={JobPostings} />
      <PrivateRoute exact path="/postjob" component={PostJob} />
      <PrivateRoute exact path="/appliedjobs" component={AppliedJobs} />
      <Route component={NotFound} />
    </Switch>
  )

  return (
    <AuthContextProvider>
      <UserRoleContextProvider>
        <BrowserRouter>
          <div className="App">
            <Layout>
              <Suspense fallback={<p></p>}>
                {routes}
              </Suspense>
            </Layout>
          </div>
        </BrowserRouter>
      </UserRoleContextProvider>
    </AuthContextProvider>
  );
}

export default App;
