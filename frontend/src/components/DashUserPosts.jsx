import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

function DashPost() {
  const [showMore, setShowMore] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);

  
    useEffect(()=>{
        const fetchPosts = async () => {
          const res = await fetch('/api/post/getPosts');
          const data = await res.json();
          console.log(data);
          setPosts(data.posts);
        }
        fetchPosts()
       
      },[])
     



  
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        <h1 className="text-center font-bold">ALL POSTS </h1>
      {
       currentUser.isAdmin &&posts.length > 0 ? (
          <>
          <Table hoverable className="shadow-md ">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              {/* <Table.HeadCell>Category</Table.HeadCell> */}
            </Table.Head>
            {
              posts.map((post) => (
                <Table.Body className="divide-y" key={post._id}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>
                        <img src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                        />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link className="font-medium text-gray-900 dark:text-white" to={`/post/${post.slug}`}>{post.title}</Link>
                    </Table.Cell>
                    {/* <Table.Cell>{post.category}</Table.Cell> */}
                  </Table.Row>
                </Table.Body>
              ))
            }
          </Table>
         
          </>
        ):(
          <p>You have no post yet</p>
        )
      }
    </div>
  )
}

export default DashPost