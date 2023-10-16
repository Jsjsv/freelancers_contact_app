import React, { useState, useEffect, Fragment } from 'react'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CRUD = () => {
    const empdata = [
        {
            "username": "ch",
            "mail": "ch",
            "phone":1,
            "skillset":'ch',
            "hobby":"ch",

        }
    ]
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [username, setUsername] = useState('')
    const [mail, setMail] = useState('')
    const [phone, setPhone] = useState('')
    const [skillset, setSkillset] = useState('')
    const [hobby, setHobby] = useState('')
    //edit
    const [editID, setEditID] = useState('')
    const [editUsername, setEditUsername] = useState('')
    const [editMail, setEditMail] = useState('')
    const [editPhone, setEditPhone] = useState('')
    const [editSkillset, setEditSkillset] = useState('')
    const [editHobby, setEditHobby] = useState('')

    const [data, setData] = useState([]);

    useEffect(()=>{
        getData()
    })

    const getData = () => {
        axios.get('https://localhost:44330/api/Freelancers')
        .then((result)=>{
            setData(result.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const handleSave = () => {
        const url = 'https://localhost:44330/api/Freelancers';
        const data = {
            "username": username,
            "mail": mail,
            "phone": phone,
            "skillset": skillset,
            "hobby": hobby
        }
        axios.post(url, data)
        .then((result)=>{
            getData();
            clear();
            toast.success("Freelancer contact has been added.")
        })
        .catch((error)=>{
            toast.error(error)
        })
    }
    //this function used for clear the input after key 'submit' or 'edit'
    const clear = () => {
        setUsername('')
        setMail('');
        setPhone('');
        setSkillset('');
        setHobby('');
        setEditUsername('');
        setEditMail('');
        setEditPhone('')
        setEditSkillset('');
        setEditHobby('');
    }

    const handleEdit = (id) =>{
        handleShow()
        axios.get(`https://localhost:44330/api/Freelancers/${id}`)
        .then((result)=>{
            setEditID(id)
            setEditUsername(result.data.username)
            setEditMail(result.data.mail)
            setEditPhone(result.data.phone)
            setEditSkillset(result.data.skillset)
            setEditHobby(result.data.hobby)
            
        })
        .catch((error)=>{
            toast.error(error)
        })
    }

    const handleDelete = (id) => {
        if(window.confirm("Are you sure to delete this freelancer contact?") == true){
            axios.delete(`https://localhost:44330/api/Freelancers/${id}`)
            .then((result) => {
                toast.success('Freelancer has been deleted.')
                getData()
            })
            .catch((error)=>{
                toast.error(error)
            })
        }
    }

    const handleUpdate = () => {
        const url = `https://localhost:44330/api/Freelancers/${editID}`;
        const data = {
            "id":editID,
            "username": editUsername,
            "mail": editMail,
            "phone": editPhone,
            "skillset": editSkillset,
            "hobby": editHobby
        }
        axios.put(url, data)
        .then((result)=>{
            getData();
            clear();
            toast.success('Edit successful.')
        })
        .catch((error)=>{
            toast.error(error)
        })
    }
    return (
        <Fragment>
            <ToastContainer />
            <Container>
                <Row>
                    <Col>
                    <input type='text'  className='form-control' placeholder='Enter username' 
                    value={username} onChange={(e) => setUsername(e.target.value)}></input>
                    </Col>
                    <Col>
                    <input type='text'  className='form-control' placeholder='Enter email' 
                    value={mail} onChange={(e) => setMail(e.target.value)}></input>
                    </Col>
                    <Col>
                    <input type='text'  className='form-control' placeholder='Enter phone' 
                    value={phone} onChange={(e) => setPhone(e.target.value)}></input>
                    </Col>
                    <Col>
                    <input type='text'  className='form-control' placeholder='Enter skillset' 
                    value={skillset} onChange={(e) => setSkillset(e.target.value)}></input>
                    </Col>
                    <Col>
                    <input type='text'  className='form-control' placeholder='Enter hobby' 
                    value={hobby} onChange={(e) => setHobby(e.target.value)}></input>
                    </Col>
                    <Col>
                    <button className='btn btn-primary' onClick={()=>handleSave()}>Submit</button>
                    </Col>
                </Row>
            </Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Mail</th>
                        <th>Phone</th>
                        <th>Skillset</th>
                        <th>Hobby</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ?
                        data.map((item, index)=>{
                            return(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.username}</td>
                                    <td>{item.mail}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.skillset}</td>
                                    <td>{item.hobby}</td>
                                    <td colSpan={2}>
                                        <button className='btn btn-primary' onClick={()=>handleEdit(item.id)}>Edit</button>
                                        <button className='btn btn-primary' onClick={()=>handleDelete(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                        :
                        "Loading..."
                    }

                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Freelancer details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Row>
                    <Col>
                    <input type='text'  className='form-control' placeholder='Enter username' 
                    value={editUsername} onChange={(e) => setEditUsername(e.target.value)}></input>
                    </Col>
                    <Col>
                    <input type='text'  className='form-control' placeholder='Enter email' 
                    value={editMail} onChange={(e) => setEditMail(e.target.value)}></input>
                    </Col>
                    <Col>
                    <input type='text'  className='form-control' placeholder='Enter phone' 
                    value={editPhone} onChange={(e) => setEditPhone(e.target.value)}></input>
                    </Col>
                    <Col>
                    <input type='text'  className='form-control' placeholder='Enter skillset' 
                    value={editSkillset} onChange={(e) => setEditSkillset(e.target.value)}></input>
                    </Col>
                    <Col>
                    <input type='text'  className='form-control' placeholder='Enter hobby' 
                    value={editHobby} onChange={(e) => setEditHobby(e.target.value)}></input>
                    </Col>
                </Row>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default CRUD;