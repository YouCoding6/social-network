import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { logoutSuccess } from 'redux/index'

const Navbar = () => {
    const isAuthenticated = useSelector(state => state.authenticationReducer.isAuthenticated);
    // console.log(isAuthenticate)
    const dispatch = useDispatch()
    const handleClick = (e) => {
        e.preventDefault()
        dispatch(logoutSuccess())
        Cookies.remove('token');
    }
    return (
        <div className="row navbar navbar-expand-lg align-items-center text-center py-3">
            <div className="col-md-2" >
                <Link className="nav-link link-dark ps-0" to="/">Home</Link>
            </div>
            {!isAuthenticated &&
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-3">
                            <Link className="nav-link link-dark" to="/register">Sign up</Link>
                        </div>
                        <div className="col-md-3">
                            <Link className="nav-link link-dark" to="/login">Sign in</Link>
                        </div>
                    </div>

                </div>
            }
            <div class="col-md-3">
                <Link className="nav-link link-dark" to="/profile">Profile</Link>
            </div>
            {isAuthenticated &&
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-4">
                            <Link className="nav-link link-dark" to="/posts">Create Post</Link>
                        </div>
                        <div className="col-md-3 offset-md-5">
                            <button className="btn btn-outline-secondary" onClick={handleClick}>Log out</button>
                        </div>
                    </div>

                </div>

            }
        </div >
    )

}


export default Navbar