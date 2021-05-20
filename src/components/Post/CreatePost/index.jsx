import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createPostSuccess, createPostFailure } from 'redux/index'

const CreatePost = () => {

    const currentUserId = useSelector(state => state.authenticationReducer.user.id);
    const [userId, setUserId] = useState(currentUserId);
    const [postText, setPostText] = useState("");
    const token = Cookies.get('token');

    console.log(token)
    const dispatch = useDispatch()
    const history = useHistory();

    const data =
    {
        user: userId,
        text: postText
    }


    const fetchcreatePost = (e) => {

        e.preventDefault()

        fetch('http://localhost:1337/posts', {
            method: 'post',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log('datafetch', data)
                if (data.error === "Bad Request") {
                    dispatch(createPostFailure(data.message[0].messages[0].message));
                } else {
                    dispatch(createPostSuccess(data.user, data.text))
                    history.push('/')
                }
            })
            .catch((error) => console.log(error))
    }


    return (
        <div className="container mx-auto bg-dark w-50 rounded text-white p-4">
            <div className="text-center my-2">
                <h3>Create Post</h3>
            </div>
            <form>
                <div className="form-group">
                    <label className="mb-1">Put here your text post</label>
                    <textarea class="form-control mb-2" rows='4' type="text" name="textPost" onChange={(e) => setPostText(e.target.value)} />
                    <button className="btn btn-outline-secondary" type="submit" onClick={fetchcreatePost}>Submit</button>
                </div>
            </form>
        </div>

    )
}


export default CreatePost