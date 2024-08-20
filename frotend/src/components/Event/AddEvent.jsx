import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    FaUserCircle,
    FaCalendarAlt,
    FaGlobe,
    FaEnvelope,
    FaLink,
    FaClipboardList,
    FaBuilding,
    FaCalendarDay,
    FaClipboard,
    FaFlag,
    FaMapMarkerAlt,
    FaLock,
} from 'react-icons/fa';

const EventForm = () => {
    const [formData, setFormData] = useState({
        event_name: '',
        event_type: '',
        event_category: '',
        event_topic: '',
        country: '',
        state: '',
        city: '',
        org_name: '',
        organizer_name: '',
        organizer_email: '',
        password: '',
        confirm_password: '',
        contact_person_event: '',
        org_society: '',
        event_enq_email: '',
        web_url: '',
        event_stat: '',
        event_end: '',
        abstract_deadline: '',
        short_desc: '',
        keywords: [],
        date_post: '',
        status: 'New',
        message: '',
        reason: '',
        reg_counter: '',
        venue: '',
    });

    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const [topics, setTopics] = useState([]);
    const [categoryWithTopics, setCategoryWithTopics] = useState([]);

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSeeMore = () => {
        setIsExpanded((prevState) => !prevState);
    };

    useEffect(() => {
        // Fetch categories and keywords from API
        axios.get(`${process.env.REACT_APP_API_URL}/event_cat`)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });

        axios.get(`${process.env.REACT_APP_API_URL}/event_cat/topics`)
            .then((response) => {
                setCategoryWithTopics(response.data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });

        // Fetch countries from API
        axios.get(`${process.env.REACT_APP_API_URL}/countries`)
            .then((response) => {
                setCountries(response.data);
            })
            .catch((error) => {
                console.error('Error fetching countries:', error);
            });
    }, []);

    useEffect(() => {
        // Fetch topics based on selected category ID
        if (!formData.event_category) return;
        axios.get(`${process.env.REACT_APP_API_URL}/event_cat/${formData.event_category}/event-topics`)
            .then((response) => {
                setTopics(response.data);
            })
            .catch((error) => {
                console.error('Error fetching topics:', error);
            });
    }, [formData.event_category]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (category, keyword) => {
        const updatedKeywords = [...formData.keywords];
        const keywordIndex = updatedKeywords.findIndex((kw) => kw === keyword);

        if (keywordIndex > -1) {
            updatedKeywords.splice(keywordIndex, 1);
        } else {
            updatedKeywords.push(keyword);
        }

        setFormData({ ...formData, keywords: updatedKeywords });
    };

    const [org_id, setOrgID] = useState('');
    const handleOrgSubmit = async (e) => {
        e.preventDefault();

        const orgData = {
            contact_person_name: formData.organizer_name,
            orginisation_name: formData.org_name,
            logo: "", // Assuming this is handled separately
            org_mail: formData.organizer_email,
            org_pass: formData.password,
            reg_date: new Date().toLocaleDateString('en-CA'),
            status: "New",
            val_code: "", // Assuming a default value
            report: "" // Assuming a default value
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/org/`, orgData);
            console.log('Organization created:', response.data);
            setOrgID(response.data.org_id);
        } catch (error) {
            console.error('Error creating organization:', error);
        }
    };


    useEffect(() => {

        handleEventSubmit();
    }, [org_id])


    const handleEventSubmit = async () => {

        if (org_id === '') return;
        const eventData = {
            org_id: org_id,
            event_topic: formData.event_topic,
            event_type: formData.event_type,
            event_name: formData.event_name,
            country: formData.country,
            state: formData.state,
            city: formData.city,
            org_society: formData.org_society,
            contact_person_event: formData.contact_person_event,
            event_enq_email: formData.event_enq_email,
            web_url: formData.web_url,
            event_stat: formData.event_stat,
            event_end: formData.event_end,
            abstract_deadline: formData.abstract_deadline,
            short_desc: formData.short_desc,
            keywords: formData.keywords,
            date_post: new Date().toLocaleDateString('en-CA'),
            status: formData.status,
            message: formData.message,
            reason: formData.reason,
            reg_counter: formData.reg_counter,
            venue: formData.venue
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/events/`, eventData);
            console.log('Event created:', response.data);
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };


    return (
        <div>


            <div className="bg-[#034F75] text-white p-4 ">
                <h1 className="text-xl md:text-2xl font-bold">Add New Event</h1>
            </div>
            <form onSubmit={handleOrgSubmit} className="max-w-7xl mx-auto p-6 bg-white text-black rounded-lg mt-4 mb-6 border shadow-md">
                {/* Organizer Details */}

                <div>
                    <h2 className="text-xl font-bold mb-4">Organizer Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                        <div className="mb-4 col-span-2 md:col-span-1">
                            <label htmlFor="organizer_name" className="flex items-center mb-2">
                                <FaUserCircle className="mr-2 text-black" />
                                Organizer Name *
                            </label>
                            <input
                                type="text"
                                id="organizer_name"
                                name="organizer_name"
                                value={formData.organizer_name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                                required
                            />
                        </div>
                        <div className="mb-4 col-span-2 md:col-span-1">
                            <label htmlFor="org_name" className="flex items-center mb-2">
                                <FaBuilding className="mr-2 text-black" />
                                Name of Organization *
                            </label>
                            <input
                                type="text"
                                id="org_name"
                                name="org_name"
                                value={formData.org_name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                                required
                            />
                        </div>
                        <div className="mb-4 col-span-2">
                            <label htmlFor="organizer_email" className="flex items-center mb-2">
                                <FaEnvelope className="mr-2 text-black" />
                                Organizer Email *
                            </label>
                            <input
                                type="email"
                                id="organizer_email"
                                name="organizer_email"
                                value={formData.organizer_email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                                required
                            />
                        </div>
                        <div className="mb-4 col-span-2 md:col-span-1">
                            <label htmlFor="password" className="flex items-center mb-2">
                                <FaLock className="mr-2 text-black" />
                                Password *
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirm_password" className="flex items-center mb-2">
                                <FaLock className="mr-2 text-black" />
                                Confirm Password *
                            </label>
                            <input
                                type="password"
                                id="confirm_password"
                                name="confirm_password"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Event Details */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Event Details</h2>
                    <div className="mb-4">
                        <label htmlFor="event_name" className="flex items-center mb-2">
                            <FaCalendarDay className="mr-2 text-black" />
                            Event Name *
                        </label>
                        <input
                            type="text"
                            id="event_name"
                            name="event_name"
                            value={formData.event_name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 text-black"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="event_type" className="flex items-center mb-2">
                            <FaClipboardList className="mr-2 text-black" />
                            Event Type *
                        </label>
                        <select
                            id="event_type"
                            name="event_type"
                            value={formData.event_type}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 text-black"
                            required
                        >
                            <option value="">Select Event Type</option>
                            <option value="Seminar">Seminar</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Webinar">Webinar</option>
                            <option value="Continuing professional development event">Continuing professional development event</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="event_category" className="flex items-center mb-2">
                            <FaClipboardList className="mr-2 text-black" />
                            Event Category
                        </label>
                        <select
                            id="event_category"
                            name="event_category"
                            value={formData.event_category}
                            onChange={(e) => {
                                setFormData({ ...formData, event_category: e.target.value });
                            }}
                            className="w-full border border-gray-300 rounded-md p-2 text-black"
                        >
                            <option value="">Select a Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.category}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="event_topic" className="flex items-center mb-2">
                            <FaCalendarAlt className="mr-2 text-black" />
                            Event Topic
                        </label>
                        <select
                            id="event_topic"
                            name="event_topic"
                            value={formData.event_topic}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 text-black"
                        >
                            <option value="">Choose a Topic</option>
                            {topics.map((topic) => (
                                <option key={topic.topic_id} value={topic.topic}>{topic.topic}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Location Details */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Location Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="mb-4">
                            <label htmlFor="country" className="flex items-center mb-2">
                                <FaGlobe className="mr-2 text-black" />
                                Country *
                            </label>
                            <select
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                                required
                            >
                                <option value="">Choose a Country</option>
                                {countries.map((country) => (
                                    <option key={country.id} value={country.country}>{country.country}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="state" className="flex items-center mb-2">
                                <FaFlag className="mr-2 text-black" />
                                State or Province
                            </label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="city" className="flex items-center mb-2">
                                <FaMapMarkerAlt className="mr-2 text-black" />
                                City *
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Additional Details */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Additional Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-4">
                            <label htmlFor="contact_person_event" className="flex items-center mb-2">
                                <FaUserCircle className="mr-2 text-black" />
                                Contact Person for Event
                            </label>
                            <input
                                type="text"
                                id="contact_person_event"
                                name="contact_person_event"
                                value={formData.contact_person_event}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="org_society" className="flex items-center mb-2">
                                <FaBuilding className="mr-2 text-black" />
                                Organization/Society
                            </label>
                            <input
                                type="text"
                                id="org_society"
                                name="org_society"
                                value={formData.org_society}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="event_enq_email" className="flex items-center mb-2">
                                <FaEnvelope className="mr-2 text-black" />
                                Event Enquiry Email
                            </label>
                            <input
                                type="email"
                                id="event_enq_email"
                                name="event_enq_email"
                                value={formData.event_enq_email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="web_url" className="flex items-center mb-2">
                                <FaLink className="mr-2 text-black" />
                                Website URL
                            </label>
                            <input
                                type="url"
                                id="web_url"
                                name="web_url"
                                value={formData.web_url}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                            />
                        </div>
                    </div>
                </div>

                {/* Dates and Keywords */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Event Dates & Keywords</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="mb-4">
                            <label htmlFor="event_stat" className="flex items-center mb-2">
                                <FaClipboard className="mr-2 text-black" />
                                Event Start Date
                            </label>
                            <input
                                type="date"
                                id="event_stat"
                                name="event_stat"
                                value={formData.event_stat}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="event_end" className="flex items-center mb-2">
                                <FaClipboard className="mr-2 text-black" />
                                Event End Date
                            </label>
                            <input
                                type="date"
                                id="event_end"
                                name="event_end"
                                value={formData.event_end}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="abstract_deadline" className="flex items-center mb-2">
                                <FaClipboard className="mr-2 text-black" />
                                Abstract Submission Deadline
                            </label>
                            <input
                                type="date"
                                id="abstract_deadline"
                                name="abstract_deadline"
                                value={formData.abstract_deadline}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                            />
                        </div>
                    </div>
                    <div className="mt-8">
                        <div className="mt-8">
                            <h2 className="text-xl font-bold mb-4">Event Keywords</h2>
                            {(isExpanded ? categoryWithTopics : categoryWithTopics.slice(0, 2)).map((category) => (
                                <div key={category.category_id} className="mb-4">
                                    <h3 className="text-lg font-bold mb-3">{category.category}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        {(category.topics).map((topic) => (
                                            <div key={topic.topic_id} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={topic.topic}
                                                    name={topic.topic}
                                                    checked={formData.keywords.includes(topic.topic)}
                                                    onChange={() => handleCheckboxChange(category.category, topic.topic)}
                                                    className="mr-2"
                                                />
                                                <label htmlFor={topic.topic}>{topic.topic}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {categoryWithTopics.some(category => category.topics.length > 4) && (
                                <button
                                    onClick={toggleSeeMore}
                                    className="mt-2 text-blue-500 hover:text-blue-700"
                                >
                                    {isExpanded ? 'See Less' : 'See More'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">Create Event</button>
            </form>
        </div>
    );
};

export default EventForm;
