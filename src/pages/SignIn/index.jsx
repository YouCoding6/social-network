import { useState } from 'react'
import { loginFailure, loginSuccess } from 'redux/index'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'
const SignIn = () => {
    const dispatch = useDispatch()
    const history = useHistory();

    const [data, setData] = useState(
        {
            identifier: "",
            password: ""
        }
    )

    const handleChange = (e) => {
        e.preventDefault();
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const fetchLogin = (e) => {
        e.preventDefault();

        fetch("http://localhost:1337/auth/local", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.error === "Bad Request") {
                    dispatch(loginFailure(data.message[0].messages[0].message));
                } else {
                    dispatch(loginSuccess(data.user, data.jwt))
                    Cookies.set('token', data.jwt)
                    history.push('/')
                }
            })
    }

    return (
        <div className="container mx-auto bg-dark w-50 rounded text-white p-4">
            <div className="text-center my-2">
                <h3>Sign In</h3>
            </div>
            <form onSubmit={fetchLogin}>
                <div className="form-group">
                    <label className="mb-1" type="text" name="identifier">Email</label>
                    <input className="form-control mb-2" type="text" name="identifier" onChange={handleChange} />
                    <label className="mb-1" type="text" name="password">Password</label>
                    <input class="form-control mb-3" rows='4' type="password" name="password" onChange={handleChange} />
                    <button className="btn btn-outline-secondary" type="submit">Sign in</button>
                </div>
            </form>
        </div>
    )
}


export default SignIn