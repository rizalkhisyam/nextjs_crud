import Link from 'next/link'
import {useState, useEffect, createContext} from 'react'
import fetch from 'isomorphic-unfetch'
import {Button, Form, Loader} from 'semantic-ui-react'
import { useRouter } from 'next/router'

const NewNote = () => {
    const [form, setForm] = useState({ title: '', description: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState({})
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createPost();
                // alert('Success');
            }
        }else {
            setIsSubmitting(false);
        }

        return () => {
            
        }
    }, [errors]);

    const createPost = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/notes', {
                method: 'POST',
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
            <h1>Create New Post</h1>
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
                        onChange={handlerChange} 
                        />

                        <Form.TextArea
                        fluid
                        error={errors.description ? {content: 'Masukkan Description dahulu', pointing: 'below'} : null}
                        label="Description"
                        placeholder="Description"
                        name="description"
                        onChange={handlerChange}
                        />

                        <Button type="submit">Save</Button>
                    </Form>
                }
            </div>
        </div>
    )
}

export default NewNote;