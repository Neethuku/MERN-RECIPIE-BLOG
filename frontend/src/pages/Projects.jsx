// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import Card from 'react-bootstrap/Card';



// function Projects() {
//   const [posts, setPosts] = useState([]);
//   const { currentUser } = useSelector((state) => state.user);
//   const userId = currentUser._id;

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const res = await fetch(`/api/post/getposts/${userId}`);
//         const data = await res.json();
//         setPosts(data); // Update posts state with fetched data
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchPost();
//   }, [userId]);

//   return (
//     <div className="container p-8">
//     <div className="row">
//       {posts.map((post) => (
//         <div className="col-md-4 mb-4" key={post._id}>
//           <Card style={{ width: '100%' }}>
//             <Card.Img variant="top" src={post.image} style={{ height: '200px', objectFit: 'cover' }} />
//             <Card.Body>
//               <Card.Title>{post.title}</Card.Title>
//               <Card.Text>{post.content}</Card.Text>
//             </Card.Body>
//           </Card>
//         </div>
//       ))}
//     </div>
//   </div>
//   );
// }

// export default Projects;

import DashPost from "../components/DashPost"
function Projects() {
  return (
    <div>
      <DashPost/>
    </div>
  )
}

export default Projects