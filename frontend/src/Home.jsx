import React, { useEffect, useState } from 'react'
import { Button, Form, Tab, Tabs } from 'react-bootstrap'
import Records from './Records'
import axios from 'axios';

import PieChart from './PieChart';

const Home = () => {
     //Create
     const [input, setInput] = useState({
        name: "",
        age: "",
        gender: "",
        field: "",
        description: "",
        photo: "",
    });

    const handleChange=(event)=>{
        setInput({
            ...input,
            [event.target.name]:event.target.value,
        })
    }

    const handleSubmit=async(event)=>{
        event.preventDefault();
        const res=await axios.post(`https://employee-system-api.vercel.app/create`,input,{ withCredentials: true } );
       
        console.log(`Record Created`)
    }
 
     
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
                    <Form.Control type="text" placeholder="Enter name" name='name'
                    value={input.name} onChange={handleChange} 

                    />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Age:</Form.Label>
                    <Form.Control type="text" placeholder="Enter age" name='age'
                    value={input.age} onChange={handleChange} 

                    />

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
                    <Form.Control as="select" name='field'
                    value={input.field} onChange={handleChange}
                    >
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
                    <Form.Control type="file" name='photo'
                    onChange={handleChange} 
                    />

                </Form.Group>

                <Button variant="primary" type="submit">
                    Create
                </Button>

                <Button variant="primary" type="reset" style={{ margin: '4px' }}>
                    Reset
                </Button>
            </Form>

            <Tabs
                defaultActiveKey="record"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="record" title="Records">
                   <Records />
                </Tab>
                <Tab eventKey="graph" title="Graphs">
               
                    <PieChart/>
                </Tab>
                <Tab eventKey="contact" title="Contact" disabled>
                    Tab content for Contact
                </Tab>
            </Tabs>
        </>
    )
}

export default Home
