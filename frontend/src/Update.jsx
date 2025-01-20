import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { NavLink, useParams } from 'react-router-dom'

const Update = () => {
    const { id } = useParams();
    const [input, setInput] = useState({
        name: "",
        age: "",
        gender: "",
        field: "",
        description: "",
        photo: "",
    })

    const [image,setImage]=useState([]);

    const handleChange = (event) => {
        const { name, files } = event.target;
        if (name === 'photo') {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setInput((prev) => ({
                    ...prev,
                    photo: reader.result
                }))
            }
            reader.readAsDataURL(file)
        }
        else {
            setInput((prev) => ({
                ...prev,
                [event.target.name]: event.target.value,
            }))
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await axios.put(`https://employee-system-api.vercel.app/update/${id}`, input);
        getRecord();
        console.log("Record Updated")
        window.alert("Record Updated");
    }

    const getRecord = async () => {
        const res = await axios.get(`https://employee-system-api.vercel.app/findbyid/${id}`);
        setInput({
            name: res.data.name,
            age: res.data.age,
            gender: res.data.gender,
            field: res.data.field,
            description: res.data.description,
        })
        setImage(res.data);
    }

    useEffect(() => {
        getRecord()
    }, [])
    return (
        <>
            <Form className='container' style={{ margin: '10px', padding: '20px', border: '2px solid black', borderRadius: '30px' }}
                onSubmit={handleSubmit}
                onReset={() => setInput({
                    name: "",
                    age: "",
                    gender: "",
                    field: "",
                    description: ""
                })}
            >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Full Name:</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name='name' value={input.name} onChange={handleChange} />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Age:</Form.Label>
                    <Form.Control type="text" placeholder="Enter age" name='age' value={input.age} onChange={handleChange} />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail" style={{ display: 'flex' }}>
                    <Form.Label>Gender: &nbsp;</Form.Label>
                    <Form.Check
                        type='radio'
                        label="Male"
                        name='gender'
                        value="Male"
                        style={{ marginRight: '10px' }}
                        checked={input.gender === 'Male'}
                        onChange={handleChange}
                    />

                    <Form.Check
                        type='radio'
                        label="Female"
                        name='gender'
                        value="Female"
                        style={{ marginRight: '10px' }}
                        checked={input.gender === 'Female'}
                        onChange={handleChange}
                    />

                    <Form.Check
                        type='radio'
                        label="Other"
                        name='gender'
                        value="Other"
                        style={{ marginRight: '10px' }}
                        checked={input.gender === 'Other'}
                        onChange={handleChange}
                    />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicField">
                    <Form.Label>Field:</Form.Label>
                    <Form.Control as="select" name='field' value={input.name} onChange={handleChange}>
                        <option value="">Select Field</option>
                        <option value="MERN">MERN</option>
                        <option value="FSD">FSD</option>
                        <option value="Associate">Associate</option>
                        <option value="IT">IT</option>
                    </Form.Control>


                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea"
                        rows={4}
                        placeholder="Enter description"
                        name='description'
                        value={input.description}
                        onChange={handleChange}
                    />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Upload Photo:</Form.Label>
                    <Form.Control type="file" name='photo' onChange={handleChange} />

                </Form.Group>

                <b>Image Preview: </b> <br/>
                {
                    image.photo && (<img src={image.photo} style={{width:'90px',height:'90px'}}/>)
                }
                <br/>

                <Button variant="primary" type="submit">
                    Update
                </Button>

                <NavLink to={`/`}>
                    <Button variant="primary" type="reset" style={{ margin: '4px' }}>
                        Back
                    </Button>
                </NavLink>
            </Form>
        </>
    )
}

export default Update
