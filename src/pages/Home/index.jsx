import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'



const Home = () => {

    const isAuthenticated = useSelector(state => state.authenticationReducer.isAuthenticated)
    const token = Cookies.get('token')
    const [posts, setPost] = useState([])
    const [countPost, setCountPost] = useState("")
    let display = true

    const fetchAllPosts = () => {

        fetch('http://localhost:1337/posts?_limit=20&_sort=created_at:desc', {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setPost(data)
                console.log('datafetch', data)
            })
            .catch((error) => console.log(error))
    }

    const fetchCountPosts = () => {

        fetch('http://localhost:1337/posts/count', {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('data', data)
                setCountPost(data)
            })
            .catch((error) => console.log(error))
    }

    console.log("isAut", isAuthenticated)


    useEffect(() => {
        fetchAllPosts()
        fetchCountPosts()
    }, [])


    return (
        <div>
            <h6 className="py-2">Welcome on<span className="fw-bold"> My Social Network</span> . This website is a training to Redux and React. We use auth and routing to create a small social media website</h6>
            <h6 className="py-2">Subsribe or log in to create posts</h6>
            {isAuthenticated &&
                <div>
                    <div className="my-5">
                        <span class="badge bg-secondary"> {countPost}</span>
                        {countPost == 0 || countPost == 1 ? " Post" : " Posts"}
                    </div>
                    <div className="row">
                        {posts.map((post, index) =>
                            <div key={index} className="col-md-3 bg-dark rounded text-white p-3 me-3">
                                <Link className="nav-link link fs-4" to={`/profile/${post.user.id}`}>{post.user.username}</Link>
                                <p>{post.text}</p>
                            </div>)}
                    </div>
                </div>
            }

        </div>
    )
}

export default Home