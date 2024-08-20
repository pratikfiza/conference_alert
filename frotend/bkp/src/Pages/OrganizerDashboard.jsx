import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; // Make sure to import Sidebar from the correct path
import {
    FiLogOut,
} from "react-icons/fi";
import EventForm from '../components/Event/OrgAddEvent';

export default function OrganizerDashboard() {
    const [acceptedEvents, setAcceptedEvents] = useState([]);
    const [rejectedEvents, setRejectedEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [verificationEvents, setVerificationEvents] = useState([]);
    const [currentTab, setCurrentTab] = useState('accepted');

    useEffect(() => {
        // Fetch accepted events
        axios.get(`${process.env.REACT_APP_API_URL}/events/accepted`)
            .then(response => setAcceptedEvents(response.data))
            .catch(error => console.error('Error fetching accepted events:', error));

        // Fetch rejected events
        axios.get(`${process.env.REACT_APP_API_URL}/events/rejected`)
            .then(response => setRejectedEvents(response.data))
            .catch(error => console.error('Error fetching rejected events:', error));

        // Fetch past successful events
        axios.get(`${process.env.REACT_APP_API_URL}/events/past-successful`)
            .then(response => setPastEvents(response.data))
            .catch(error => console.error('Error fetching past events:', error));

        // Fetch events in process of verification
        axios.get(`${process.env.REACT_APP_API_URL}/events/verification`)
            .then(response => setVerificationEvents(response.data))
            .catch(error => console.error('Error fetching verification events:', error));
    }, []);

    const renderEvents = (events) => (
        <table className="min-w-full">
            <thead>
                <tr>
                    <th className="px-4 py-2">Event Id</th>
                    <th className="px-4 py-2">Event Name</th>
                    <th className="px-4 py-2">Start Date</th>
                    <th className="px-4 py-2">Edit</th>
                </tr>
            </thead>
            <tbody>
                {events.map(event => (
                    <tr key={event.event_id}>
                        <td className="border px-4 py-2">{event.event_id}</td>
                        <td className="border px-4 py-2">{event.event_name}</td>
                        <td className="border px-4 py-2">{event.event_stat}</td>
                        <td className="border px-4 py-2"><button>Edit</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="flex">
            <Sidebar setCurrentTab={setCurrentTab} />
            <div className="flex-grow">
                <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
                    <h1 className="text-xl">Organizer Dashboard</h1>
                    <div onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = '/login';
                    }} className="flex items-center cursor-pointer">
                        <span className="mr-4">LogOut</span>
                        <button className="text-white"><FiLogOut /></button>
                    </div>
                </header>
                <main className="p-4">
                    {currentTab === 'accepted' && renderEvents(acceptedEvents)}
                    {currentTab === 'rejected' && renderEvents(rejectedEvents)}
                    {currentTab === 'past' && renderEvents(pastEvents)}
                    {currentTab === 'verification' && renderEvents(verificationEvents)}
                    {currentTab === 'add' && <AddNewEvent />}
                    {currentTab === 'organizer' && <ManageOrganizer />}
                    {currentTab === 'password' && <ChangePassword />}
                </main>
            </div>
        </div>
    );
}

const AddNewEvent = () => {
  

    return (
       <EventForm/>
    );
};

const ManageOrganizer = () => {
    const [formData, setFormData] = useState({
        contact_person_name: '',
        orginisation_name: '',
        org_mail: '',
    });

    useEffect(() => {
        const orgId = localStorage.getItem('org_id');
        if (orgId) {
            axios.get(`${process.env.REACT_APP_API_URL}/org/${orgId}`)
                .then(response => {
                    setFormData({
                        contact_person_name: response.data.contact_person_name,
                        orginisation_name: response.data.orginisation_name,
                        org_mail: response.data.org_mail
                    });
                })
                .catch(error => console.error('Error fetching organizer:', error));
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const orgId = localStorage.getItem('org_id');
        axios.put(`${process.env.REACT_APP_API_URL}/org/${orgId}`, formData)
            .then(response => {
                alert(response.data);
            })
            .catch(error => console.error('Error updating organizer:', error));
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="contact_person_name" className="block mb-2">Contact Person Name</label>
                    <input
                        type="text"
                        id="contact_person_name"
                        name="contact_person_name"
                        value={formData.contact_person_name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="orginisation_name" className="block mb-2">Organization Name</label>
                    <input
                        type="text"
                        id="orginisation_name"
                        name="orginisation_name"
                        value={formData.orginisation_name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="org_mail" className="block mb-2">Email</label>
                    <input
                        type="email"
                        id="org_mail"
                        name="org_mail"
                        value={formData.org_mail}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update Organizer</button>
            </form>
        </div>
    );
};

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/organizer/change-password`, { old_password: oldPassword, new_password: newPassword })
            .then(response => alert(response.data.message))
            .catch(error => console.error('Error changing password:', error));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required className="w-full p-2 border rounded" />
            <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="w-full p-2 border rounded" />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Change Password</button>
        </form>
    );
};
