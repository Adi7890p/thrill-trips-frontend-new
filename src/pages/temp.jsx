import React, { useState, useEffect } from "react";
import { Tabs, Tab, Modal, Button, Form, Toast, ToastContainer, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admin.css";
import Header from "../components/Header";
import axios from "axios";

export default function AdminPanel() {
    const [parks, setParks] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [editPark, setEditPark] = useState(null);
    const [showParkModal, setShowParkModal] = useState(false);
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [showToast, setShowToast] = useState({ message: "", type: "" });


    useEffect(() => {
        axios.get("https://react.adityakuril.me/parks")
            .then(res => setParks(res.data))
            .catch(err => console.error(err));

        axios.get("https://react.adityakuril.me/admins")
            .then(res => setAdmins(res.data))
            .catch(err => console.error(err));
    }, []);



    const handleParkSave = async (e) => {
        e.preventDefault();
        const form = e.target;
        const file = form.parkImage.files[0];

        const formData = new FormData();
        formData.append("parkName", form.parkName.value);
        formData.append("parkCategory", form.parkCategory.value);
        formData.append("pcity", form.pcity.value);
        formData.append("parkPrice", form.parkPrice.value);
        formData.append("description", form.description.value);
        if (file) formData.append("parkImage", file);

        try {
            let res;
            if (editPark) {
                // Update existing park
                res = await axios.put(`https://react.adityakuril.me/updatepark/${editPark.pid}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                setParks(parks.map(p => (p.pid === editPark.pid ? res.data.park : p)));
                setEditPark(null);
            } else {
                // Add new park
                formData.append("parkId", form.parkId.value);
                res = await axios.post("https://react.adityakuril.me/addpark", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                setParks(res.data.parks);
            }

            setShowParkModal(false);
            showToastMsg("Park saved successfully", "success");
        } catch (err) {
            console.error(err);
            showToastMsg("Failed to save park", "danger");
        }
    };

    const handleParkDelete = async (pid) => {
        try {
            await axios.delete(`https://react.adityakuril.me/deletepark/${pid}`);
            setParks(parks.filter(p => p.pid !== pid));
            showToastMsg("Park deleted", "danger");
        } catch (err) {
            console.error(err);
            showToastMsg("Failed to delete park", "danger");
        }
    };

    const openEditPark = (park) => {
        setEditPark(park);
        setShowParkModal(true);
    };



    const handleAdminSave = async (e) => {
        e.preventDefault();
        const form = e.target;
        const unm = form.adminName.value;
        const password = form.adminPassword.value;

        try {
            const res = await axios.post("https://react.adityakuril.me/addadmin", { unm, password });
            setAdmins([...admins, res.data.admin]);
            setShowAdminModal(false);
            showToastMsg("Admin added successfully", "success");
        } catch (err) {
            console.error(err);
            showToastMsg("Failed to add admin", "danger");
        }
    };

    const handleAdminDelete = async (unm) => {
        try {
            await axios.delete(`https://react.adityakuril.me/deleteadmin/${unm}`);
            setAdmins(admins.filter(a => a.unm !== unm));
            showToastMsg("Admin deleted", "danger");
        } catch (err) {
            console.error(err);
            showToastMsg("Failed to delete admin", "danger");
        }
    };


    const showToastMsg = (message, type) => {
        setShowToast({ message, type });
        setTimeout(() => setShowToast({ message: "", type: "" }), 3000);
    };


    return (
        <div>
            <Header />

            <div className="container-fluid mt-4">
                <Tabs defaultActiveKey="parks" id="adminTabs" className="mb-3">
                    <Tab eventKey="parks" title="Manage Parks">
                        <div className="d-flex justify-content-end mb-2">
                            <Button
                                variant="success"
                                size="sm"
                                onClick={() => {
                                    setEditPark(null);
                                    setShowParkModal(true);
                                }}
                            >
                                + Add Park
                            </Button>
                        </div>
                        <div className="table-responsive">
                            <Table striped bordered hover variant="dark" className="align-middle">
                                <thead>
                                    <tr>
                                        <th>Park Id</th>
                                        <th>Park Name</th>
                                        <th>Category</th>
                                        <th>City</th>
                                        <th>Price</th>
                                        <th>Image</th>
                                        <th>Description</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {parks.map((park) => (
                                        <tr key={park.pid}>
                                            <td>{park.pid}</td>
                                            <td>{park.pname}</td>
                                            <td>{park.category}</td>
                                            <td>{park.pcity}</td>
                                            <td>{park.price}</td>
                                            <td>
                                                {park.pimage && (
                                                    <img
                                                        src={`https://react.adityakuril.me/uploads/${park.pimage}`}
                                                        alt={park.pname}
                                                        style={{ height: '120px', width: '180px' }}

                                                    />
                                                )}
                                            </td>
                                            <td>{park.description}</td>
                                            <td>
                                                <div className="d-flex gap-1">
                                                    <Button
                                                        variant="warning"
                                                        size="sm"
                                                        onClick={() => openEditPark(park)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleParkDelete(park.pid)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Tab>

                    <Tab eventKey="admins" title="Manage Admins">
                        <div className="d-flex justify-content-end mb-2">
                            <Button
                                variant="success"
                                size="sm"
                                onClick={() => setShowAdminModal(true)}
                            >
                                + Add Admin
                            </Button>
                        </div>
                        <div className="table-responsive">
                            <Table striped bordered hover variant="dark" className="align-middle">
                                <thead>
                                    <tr>
                                        <th>Admin Name</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {admins.map((admin) => (
                                        <tr key={admin.unm}>
                                            <td>{admin.unm}</td>
                                            <td>
                                                <div className="d-flex gap-1">
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleAdminDelete(admin.unm)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Tab>



                </Tabs>
            </div>

            {/* --- Park Modal --- */}
            <Modal
                style={{ overflowY: 'hidden' }}


                show={showParkModal}
                onHide={() => setShowParkModal(false)}
                centered
            >
                <Modal.Header style={{ marginBottom: '-20px' }} closeButton className="bg-dark text-light">
                    <Modal.Title>{editPark ? "Edit Park" : "Add Park"}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleParkSave} encType="multipart/form-data">
                    <Modal.Body className="bg-dark text-light">
                        <Form.Group className="mb-2">
                            <Form.Control type="text" name="parkId" placeholder="Park Id" style={{ textAlign: 'left', fontWeight: 'bolder' }} defaultValue={editPark?.pid || ""} required />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Control type="text" name="parkName" style={{ textAlign: 'left', fontWeight: 'bolder' }} placeholder="Park Name" defaultValue={editPark?.pname || ""} required />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Select name="parkCategory" defaultValue={editPark?.category || "Adventure Park"}>
                                <option>Adventure Park</option>
                                <option>Water Park</option>
                                <option>Theme Park</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Control type="text" name="pcity" style={{ textAlign: 'left', fontWeight: 'bolder' }} placeholder="City" defaultValue={editPark?.pcity || ""} required />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Control type="text" name="parkPrice" placeholder="Price" style={{ textAlign: 'left', fontWeight: 'bolder' }} defaultValue={editPark?.price || ""} required />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label style={{ marginBottom: '-20px' }} >Park Image</Form.Label>
                            <Form.Control type="file" name="parkImage" accept="image/*" style={{ textAlign: 'left', fontWeight: 'bolder' }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control style={{ marginBottom: '-20px', resize: 'none', textAlign: 'left', fontWeight: 'bolder' }} as="textarea" name="description" placeholder="Description" defaultValue={editPark?.description || ""} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className="bg-dark text-light">
                        <Button type="submit" variant="success">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            {/* --- Admin Modal --- */}
            <Modal show={showAdminModal} onHide={() => setShowAdminModal(false)} centered>
                <Modal.Header closeButton className="bg-dark text-light">
                    <Modal.Title>Add Admin</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleAdminSave}>
                    <Modal.Body className="bg-dark text-light">
                        <Form.Group className="mb-3">
                            <Form.Control type="text" name="adminName" placeholder="Admin Name" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="password" name="adminPassword" placeholder="Password" required />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className="bg-dark text-light">
                        <Button type="submit" variant="success">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>


            {/* --- Toast --- */}
            <ToastContainer position="top-end" className="p-3">
                <Toast onClose={() => setShowToast({ message: "", type: "" })} show={!!showToast.message} bg={showToast.type === "danger" ? "danger" : "success"} delay={3000} autohide>
                    <Toast.Body>{showToast.message}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
}

