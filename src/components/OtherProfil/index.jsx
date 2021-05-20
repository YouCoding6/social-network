import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'



const OtherProfil = () => {

    const { idSlug } = useParams()
    const token = Cookies.get('token')
    const [username, setUsername] = useState()
    const [description, setDescription] = useState()
    const [posts, setPosts] = useState([])



    const fetchProfilUser = async () => {

        const response = await fetch(`http://localhost:1337/users/${idSlug}`, {
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

    const fetchPostsUser = async () => {

        const response = await fetch(`http://localhost:1337/posts?user.id=${idSlug}`, {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        setPosts(data)

    }

    useEffect(() => {
        fetchProfilUser()
        fetchPostsUser()
    }, [])


    return (
        <div>
            <div className="container mx-auto bg-dark w-50 rounded text-white p-4">
                {username &&
                    <div className="pb-3">
                        <h5>{username}</h5>
                        <p>{description == null ? <span>Description doesn't exist</span>
                            : <span>{description}</span>} </p>
                    </div>
                }
            </div>
            <div className="p-4">
                <h4 className="mt-5">Posts</h4>
                <div className="row">
                    {posts ? posts.map((post, index) =>
                        <div key={index} className="col-md-3 bg-dark rounded text-white me-3 p-3" key="index">
                            <p>{post.user.username}</p>
                            <p>{post.text}</p>
                        </div>) :
                        <p>Pas de posts encore</p>}
                </div>
            </div>
        </div>

    )
}



export default OtherProfil