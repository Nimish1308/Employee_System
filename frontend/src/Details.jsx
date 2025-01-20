import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { NavLink, useParams } from 'react-router-dom'
import { } from 'react-dom'
import axios from 'axios'


const Details = () => {
    const { id } = useParams();
    const [record, setRecord] = useState([]);
    const getRecord = async () => {
        const res = await axios.get(`http://localhost:5000/findbyid/${id}`)
        const store = res.data;
        setRecord(store)
    }

    useEffect(() => {
        getRecord();
    }, [])

    return (
        <>
            <div className="card mb-3" style={{ maxWidth: '70%', margin: '90px', border: '3px solid black', boxShadow: '20px 20px 10px' }}>
                <div className="row g-0">
                    <div className="col-md-4" style={{ display: 'flex' }}>
                        <img
                            src={record.photo}
                            alt="Trendy Pants and Shoes"
                            className="img-fluid rounded-start"
                            style={{ maxWidth: '100%' }}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h1 className="card-title">Employee Details</h1>
                            <h4 className="card-title">Name: {record.name}</h4>
                            <h4 className="card-title">Age: {record.age}</h4>
                            <h4 className="card-title">Gender: {record.gender}</h4>
                            <h4 className="card-title">Field: {record.field}</h4>
                            <h4 className="card-title">Description:</h4>
                            <p className="card-text">
                                {record.description}
                            </p>
                            {/* <p className="card-text">
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </p> */}

                            <NavLink to={`/`}><Button variant="warning" style={{ width: '20%' }}>Back</Button></NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Details
