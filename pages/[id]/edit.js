
import {useState, useEffect, createContext} from 'react'
import fetch from 'isomorphic-unfetch'
import {Button, Form, Loader} from 'semantic-ui-react'
import { useRouter } from 'next/router'

const EditPost = ({post}) => {
    const [form, setForm] = useState({ title: post.title, description: post.description })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState({})
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updatePost();
                // alert('Success');
            }
        }else {
            setIsSubmitting(false);
        }

        return () => {
            
        }
    }, [errors]);

    const updatePost = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/notes/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept" : "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    };
    const handlerChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    const validate = () => {
        let err = {};
        if (!form.title) {
            err.title = 'Title harus disisi';
        }

        if (!form.description) {
            err.description = 'Description harus diisi';
        }

        return err;
    }

    return (
        <div className="form-container">
            <h1>Update Post: {post.title}</h1>
            <div>
                {
                    isSubmitting ? 
                    <Loader active inline="centered"></Loader> :
                    <Form onSubmit={handlerSubmit}>
                        <Form.Input 
                        fluid
                        error={errors.title ? {content: 'Masukkan Title dahulu', pointing: 'below'} : null}
                        label="Title"
                        placeholder="Title"
                        name="title"
                        value={form.title}
                        onChange={handlerChange} 
                        />

                        <Form.TextArea
                        fluid
                        error={errors.description ? {content: 'Masukkan Description dahulu', pointing: 'below'} : null}
                        label="Description"
                        placeholder="Description"
                        name="description"
                        value={form.description}
                        onChange={handlerChange}
                        />

                        <Button type="submit">Update</Button>
                    </Form>
                }
            </div>
        </div>
    )
}

EditPost.getInitialProps = async ({ query: {id} }) => {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`);
    const {data} = await res.json();

    return {post: data};

}

export default EditPost;