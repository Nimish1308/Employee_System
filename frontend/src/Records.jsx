import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Records = () => {
    // Fetch All Records
    const [record, setRecord] = useState([]);
    const [btnFilter, setFilter] = useState([]);
    const [genderData, setGenderData] = useState({ male: 0, female: 0 });

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;

    const currentIndex = btnFilter.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(record.length / rowsPerPage);

    const btnPrev = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    }

    const btnNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    }

    const nextProceed = (current) => {
        setCurrentPage(current);
    }



    const getRecord = async () => {
        const res = await axios.get(`https://employee-system-api.vercel.app/find`,{ withCredentials: true } );
        const store = res.data;
        setRecord(store);
        setFilter(store);
        console.log(`All Record Fetched`);
    };


    // Btn Filter
    const getFilter = async (cat) => {
        const updatedFilter = await record.filter((e) => e.field === cat);
        setFilter(updatedFilter);

    };

    // Btn Search
    const handleSearch = (e) => {
        const text = e.target.value.toLowerCase();
        if (text === '') {
            setFilter(record);

        } else {
            const updatedSearch = btnFilter.filter((item) => {
                return (
                    item.field.toLowerCase().includes(text) ||
                    item.name.toLowerCase().includes(text)
                );
            });
            setFilter(updatedSearch);

        }
    };

    useEffect(() => {
        getRecord();
        const interval = setInterval(getRecord, 2000);
        return () => clearInterval(interval);
    }, []);

    // Delete
    const handleDelete = async (id) => {
        const res = await axios.delete(`https://employee-system-api.vercel.app/delete/${id}`,{ withCredentials: true } );
        getRecord();
        console.log("Record Deleted");
    };


    return (
        <>
            <div className="container" style={{ margin: '10px' }}>
                <b>Sort By Field:</b>
                <Button variant="warning" style={{ margin: '5px' }} onClick={() => setFilter(record)}>
                    All
                </Button>

                <Button variant="warning" style={{ margin: '5px' }} onClick={() => getFilter('MERN')}>
                    MERN
                </Button>

                <Button variant="warning" style={{ margin: '5px' }} onClick={() => getFilter('FSD')}>
                    FSD
                </Button>

                <Button variant="warning" style={{ margin: '5px' }} onClick={() => getFilter('Associate')}>
                    Associate
                </Button>

                <Button variant="warning" style={{ margin: '5px' }} onClick={() => getFilter('IT')}>
                    IT
                </Button>

                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    style={{ float: 'right', width: '400px', border: '2px solid black' }}
                    onChange={handleSearch}
                />
            </div>

            <hr/>
            <Table
                striped
                bordered
                hover
                className="container"
                style={{ margin: '10px', padding: '10px', border: '2px solid black' }}
            >
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Field</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentIndex.map((item, i) => (
                        <tr key={i}>
                            <td>{indexOfFirstItem + i + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>{item.gender}</td>
                            <td>{item.field}</td>
                            <td>{item.description.substring(0, 13)}..</td>
                            <td>
                            <div data-aos="zoom-out">
                                
                            </div>
                                <NavLink to={`/findbyid/${item._id}`}>
                                    <Button variant="success" style={{ margin: '2px' }}>
                                        Details
                                    </Button>
                                </NavLink>

                                <NavLink to={`/update/${item._id}`}>
                                    <Button variant="warning" style={{ margin: '2px' }}>
                                        Update
                                    </Button>
                                </NavLink>
                                <Button
                                    variant="danger"
                                    style={{ margin: '2px' }}
                                    onClick={() => handleDelete(item._id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="container" style={{ margin: '10px' }}>
                <Button variant="primary" onClick={btnPrev} disabled={currentPage === 1}>Prev</Button>
                {
                    Array.from({ length: totalPages }, (_, index) => (
                        <Button variant="primary" style={{ margin: '2px' }} onClick={() => nextProceed(index + 1)} className={currentPage === index + 1 ? 'active' : ''} key={index}>
                            {index + 1}
                        </Button>
                    ))
                }
                <Button variant="primary" onClick={btnNext} disabled={currentPage === totalPages}>Next</Button>
            </div>
        </>
    );
};

export default Records;
