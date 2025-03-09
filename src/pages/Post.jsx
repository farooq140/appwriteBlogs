import  { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";

import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
 
    const { slug } = useParams();
    const navigate = useNavigate();  
    
    const userData = useSelector((state) => state.auth.userData);    
const isAuthor = async()=>{
  return await post && userData ? post?.userId ===userData?.userId : false;
}
    

    useEffect(() => {
     console.log(isAuthor, "isAuth")      
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");

            });
        } else navigate("/");
    
    }, [slug, navigate]);

    
    console.log("PPPPPPPPPPPPPPPPPPPPPost",isAuthor,userData,"post", post ,"isAuthor")

        
    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-4 ">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="w-full h-72 object-cover object-center"
                    />

                    {isAuthor && (
                        <div className=" right-3 top-5">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
                </div>

                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}