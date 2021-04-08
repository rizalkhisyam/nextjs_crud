import fetch from 'isomorphic-unfetch'
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import { Confirm, Button, Loader } from 'semantic-ui-react'

const Post = ({note}) => {

    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();
    
    useEffect(() => {
        if (isDeleting) {
            deletePost();
        }
        return () => {
            
        }
    }, [isDeleting])

    const open = () => setConfirm(true);
    const close = () => setConfirm(false);

    const deletePost = async () => {
        const postId = router.query.id;
        try {
            const deleted = await fetch(`http://localhost:3000/api/notes/${postId}`, {
                method: 'DELETE',

            });
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const handlerDelete = async () => {
        setIsDeleting(true);
        close();
    }

    return (
        <div className="note-container">
            {
                isDeleting ?
                <Loader active />
                :
                <>
                    <h1>{note.title}</h1>
                    <p>{note.description}</p>

                    <Button color="red" onClick={open}>Delete</Button>
                </> 
            }

            <Confirm
            open={confirm}
            onCancel={close}
            onConfirm={handlerDelete}
            />
        </div>
    )
}

Post.getInitialProps = async ({ query: {id} }) => {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`);

    const { data } = await res.json();
    return {note: data}
}

export default Post;