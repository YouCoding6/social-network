import { useState } from 'react'
import { registerFailure, registerSuccess } from 'redux/index'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'


const SignUp = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const [data, setData] = useState(
        {
            username: "",
            email: "",
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

    const fetchRegister = (e) => {
        e.preventDefault();
        console.log(e)

        fetch("http://localhost:1337/auth/local/register", {
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
                    dispatch(registerFailure(data.message[0].messages[0].message));
                } else {
                    dispatch(registerSuccess(data.user, data.jwt))
                    Cookies.set('token', data.jwt)
                    history.push('/')
                }
            })
            .catch((error) => console.log(error))
    }
    return (
        <div>
            <div className="container mx-auto bg-dark w-50 rounded text-white p-4">
                <div className="text-center my-2">
                    <h3>Sign Up</h3>
                </div>
                <form onSubmit={fetchRegister}>
                    <div className="form-group">
                        <label className="mb-1" name="username">Username</label>
                        <input class="form-control mb-2" type="text" name="username" onChange={handleChange} />
                        <label className="mb-1" type="text" name="email">Email</label>
                        <input className="form-control mb-2" type="text" name="email" onChange={handleChange} />
                        <label className="mb-1" type="text" name="password">Password</label>
                        <input class="form-control mb-3" rows='4' type="password" name="password" onChange={handleChange} />
                        <button className="btn btn-outline-secondary" type="submit">Sign un</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default SignUp