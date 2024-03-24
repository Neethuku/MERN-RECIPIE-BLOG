import { Alert, Button, Modal, TextInput } from "flowbite-react"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase';
import { updateStart, updateSuccess, updateFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signoutSuccess } from "../redux/user/userSlice";
import {Link} from 'react-router-dom'


function DashProfile() {
  const {currentUser, error, loading} = useSelector(state => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormdata] = useState({});
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  console.log(imageFileUploadProgress,imageFileUploadError);
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) =>{
  const file = e.target.files[0];
  if(file){
    setImageFile(file);
    setImageFileUrl(URL.createObjectURL(file));
  }

  };
 
useEffect (() => {
  if(imageFile){
    uploadImage();
  }
}, [imageFile]);


const uploadImage = async () => {
  setImageFileUploading(true);
  setImageFileUploadError(null);
  const storage = getStorage(app);
  const fileName = new Date().getTime() + imageFile.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, imageFile);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImageFileUploadProgress(progress.toFixed(0));
    },
    (error) => {
      console.log(error);
      setImageFileUploadError('Could not upload image (file must be 2MB)');
      setImageFileUploadProgress(null);
      setImageFile(null);
      setImageFileUrl(null);
      setImageFileUploading(false);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImageFileUrl(downloadURL);
        setFormdata({...formData, profilePicture: downloadURL});
        setImageFileUploading(false);
      });
    }
  );
};

const handleChange = (e) => {
  setFormdata({...formData, [e.target.id]:e.target.value});
};
console.log(formData);

const handleSubmit = async (e) => {
  e.preventDefault();
  setUpdateUserError(null);
  setUpdateUserSuccess(null);
  if (Object.keys(formData).length === 0){
    setUpdateUserError('No changes made');
    return;
  }
if(imageFileUploading){
  setUpdateUserError('Please wait for image to upload');
  return;
}

  try {
    dispatch(updateStart());
    const res = await fetch(`/api/user/update/${currentUser._id}`,{
      method:'PUT',
      headers:{ 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok){
      dispatch(updateFailure(data.message));
      setUpdateUserError(data.message);
    }else{
      dispatch(updateSuccess(data));
      setUpdateUserSuccess('User profile updated successfully');
console.log('formData:', formData);
console.log('currentUser._id:', currentUser._id);
console.log('Server response:', data);

    }
  } catch (error) {
    dispatch(updateFailure(error.message));
    setUpdateUserError(error.message);
  }
  
};

const handleDeleteUser = async () => {
setShowModal(false);
try {
  dispatch(deleteUserStart());
  const res = await fetch(`/api/user/delete/${currentUser._id}`,{
    method : 'DELETE',   
  });
  const data = await res.json();
  if(!res.ok){
    dispatch(deleteUserFailure(data.message));
  }else{
    dispatch(deleteUserSuccess(data));
  }
} catch (error) {
  dispatch(deleteUserFailure(error.message));
}
};


const handleSignOut = async () => {
  try {
    const res = await fetch('/api/user/signout',{
      method : 'POST',
    });
    const data = await res.json();
    if(!res.ok){
      console.log(data.message);
    }else{
      dispatch(signoutSuccess());
   }
  } catch (error) {
    console.log(error.message);
  }
};
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={()=>filePickerRef.current.click()}>
        <img src={imageFileUrl || currentUser.profilePicture} alt="profile image" className="rounded-full w-full h-full object-cover border-8 border-[lightgray]" />
        </div>
        {imageFileUploadError && 
           <Alert color='failure'>{imageFileUploadError}</Alert>
        }
       
        <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username} onChange={handleChange}/>
        <TextInput type="email" id="email" placeholder="email" defaultValue={currentUser.email} onChange={handleChange} />
        <TextInput type="password" id="password" placeholder="password"onChange={handleChange} />
        <Button outline type="submit" disabled={loading || imageFileUploading}>
          { loading? 'Loading...' : 'Update'}
          </Button>
        {/* {
          currentUser.isAdmin && ( */}
            <Link to={'/create-post'}>
             <Button type="button" className="w-full">
              Create a Post
            </Button>
            </Link>
          {/* )
        } */}
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={()=>setShowModal(true)} className='cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='cursor-pointer'>Sign Out</span>
      </div>
      {
        updateUserSuccess && (
          <Alert className="mt-5" color='success'>{updateUserSuccess}</Alert>
        )
      }
       {
        updateUserError && (
          <Alert className="mt-5" color='failure'>{updateUserError}</Alert>
        )
      }
       {
        error && (
          <Alert className="mt-5" color='failure'>{updateUserError}</Alert>
        )
      }
      <Modal show={showModal}
      onClose={()=>setShowModal(false)}
      popup
      size='md'
      >
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure want to delete your account?</h3>
            <div className='flex justify-center gap-4'>
              <Button color="failure" onClick={handleDeleteUser}>Yes, Im sure</Button>
              <Button color="gray" onClick={() => setShowModal(false)}>No, Cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DashProfile