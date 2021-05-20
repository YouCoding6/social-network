import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'

const Profile = () => {

    const [username, setUsername] = useState()
    const [description, setDescription] = useState()
    // const currentUserId = useSelector(state => state.authenticationReducer.user.id)
    const currentUserId = Cookies.get('id')
    const [userId, setUserId] = useState(currentUserId)
    const [posts, setPosts] = useState([])
    console.log('id', currentUserId)
    const token = Cookies.get('token')
    const history = useHistory()

    const data = {
        username: username,
        description: description
    }
    const fetchCurrentUser = async () => {

        const response = await fetch("http://localhost:1337/users/me", {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        console.log(data)
        setUsername(data.username)
        setDescription(data.description)
    }

    const updateCurrentUser = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:1337/users/me`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        const resp = await response.json()
        history.push('/')

    }

    const fetchPostCurrentUser = async () => {
        const response = await fetch(`http://localhost:1337/posts?user.id=${userId}`, {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const resp = await response.json()

        setPosts(resp)
        console.log('resp', resp)
    }

    const deletePost = async (id) => {
        const response = await fetch(`http://localhost:1337/posts/${id}`, {
            method: 'delete',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const resp = await response.json()
        history.push('/')
    }

    useEffect(() => {
        fetchCurrentUser()
        fetchPostCurrentUser()

    }, [token])


    return (
        <div>
            {username &&
                <div className="container mx-auto bg-dark w-50 rounded text-white p-4 mb-5">
                    <h5>{username}</h5>
                    <p>{description == null ? <span>Description doesn't exist</span>
                        : <span>{description}</span>} </p>
                </div>
            }
            <div className="container mx-auto bg-dark w-50 rounded text-white p-4">
                <div className="text-center my-2">
                    <h3>Edit Profile</h3>
                </div>
                <form>
                    <div className="form-group">
                        <label className="mb-1" type="text" name="username">Username</label>
                        <input className="form-control mb-2" value={username} type="text" name="username" onChange={(e) => setUsername(e.target.value)}></input>
                        <label className="mb-1" type="text" name="description">Description</label>
                        <textarea class="form-control mb-2" value={description} rows='4' type="text" name="description" onChange={(e) => setDescription(e.target.value)} />
                        <button className="btn btn-outline-secondary" type="submit" onClick={updateCurrentUser}>Update</button>
                    </div>
                </form>
            </div>

            <p className="mt-5">My posts</p>
            <div className="row ">
                {posts && posts.map((post, index) =>
                    <div key={index} className="col-md-3  p-3 me-3">
                        <p className="bg-dark rounded text-white py-4 px-3">{post.text}</p>
                        <button className="btn btn-outline-secondary" onClick={() => deletePost(post.id)}>Delete</button>
                    </div>
                )}
                {!posts && <p>Pas de posts encore</p>}
            </div>
        </div>
    )
}


export default Profile