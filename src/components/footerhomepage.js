import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Link, useNavigate } from 'react-router-dom';
import './styles/footerhomepage.css';
import footer from "../images/footer2.jpeg"
import facebook from "../images/facebook.png"
import instagram from "../images/instagram.png"
import linkedin from "../images/linkedin.png"
import up from "../images/up.png"
import phone from "../images/phone.png"
import { getUserRole } from "./Util/GetUserData";

function Footerhomepage() {
    const navigate = useNavigate();
    const role = getUserRole();
    const form = useRef();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const goToDashboard = ()=>{
        if(role === "admin"){navigate("/admin/*")
    } else if (role === "seller"){navigate("/seller/*")}
    window.location.reload();
}

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(process.env.REACT_APP_YOUR_SERVICE_ID, process.env.REACT_APP_YOUR_TEMPLATE_ID, form.current, process.env.REACT_APP_YOUR_USER_ID)
            .then((result) => {
                console.log(result.text);
                setFormData({})
            })
            .catch((error) => {
                console.log(error.text);
            });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    document.addEventListener('DOMContentLoaded', function () {
        const currentYear = new Date().getFullYear();
        document.getElementById('copyright').innerText = `© ${currentYear} All rights reserved`;
    });

    return (
    <div>
        <img src={footer} className="size-16 h-96 w-full pt-10" alt="footer image"></img>
        <div id="Contact" className="footer-container-homepage">
            </div>
            <div className="footer-social full-width">
                <div>
                    <h2 className="footer-social-header">+961 81 001996</h2>
                    <img src={phone} className='phone' alt="" />
                </div>
                <div className='up'>
                <Link to="">
                        <img src={up} onClick="scrolltotop" alt="" />
                    </Link>
                </div>
                <div>
                    <h2 className="phone-number">Follow us</h2>
                </div>
                <div className="footer-social-icons">
                    <Link to="">
                        <img src={facebook} alt="" />
                    </Link>
                    <Link to="">
                        <img src={instagram} alt="" />
                    </Link>
                    <Link to="">
                        <img src={linkedin} alt="" />
                    </Link>
                </div>
            </div>
            <div className="footer-copyright">
                <p id="copyright" onClick={goToDashboard}>© 2024 All rights reserved</p>
            </div>
        </div>
    );
}

export default Footerhomepage;