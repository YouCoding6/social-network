import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'redux/store';
import Navbar from 'components/Navbar'
import SignIn from 'pages/SignIn'
import SignUp from 'pages/SignUp'
import Home from 'pages/Home'
import Profile from 'pages/Profile'
import CreatePost from 'components/Post/CreatePost'
import PrivateRoute from 'components/PrivateRoute'
import OtherProfil from 'components/OtherProfil'

const App = () => {

    // useEffect(() => {
    //     store.dispatch(userLoad())
    // }, [userLoad])


    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Navbar />
                    <main className="p-5 ms-4">
                        <Switch>
                            <Route path="/" exact>
                                <Home />
                            </Route>
                            <Route path="/register">
                                <SignUp />
                            </Route>
                            <Route path="/login">
                                <SignIn />
                            </Route>
                            <PrivateRoute path="/profile" component={Profile} exact />
                            <PrivateRoute path="/posts" component={CreatePost} />
                            <Route path="/profile/:idSlug">
                                <OtherProfil />
                            </Route>
                        </Switch>
                    </main>
                </div>

            </Router>
        </Provider >
    );
};





export default App;