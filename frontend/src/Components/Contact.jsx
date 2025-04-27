import React from 'react';
import Swal from 'sweetalert2';
import './Contact.css';


const Contact = () => {

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
    
        formData.append("access_key", "b16cdec3-4b21-4913-be8c-40bc89295688");
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
    
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: json
        }).then((res) => res.json());
    
        if (res.success) {
            Swal.fire({
                title: "Success!",
                text: "Message sent successfully!",
                icon: "success"
              });
        }
      };
  return (
    <section className='contact'>
        <form  onSubmit={onSubmit}>
            <h2>Contact Form</h2>
            <div className='input-box'>
                <label>Full Name</label>
                <input type="text" className='field' placeholder='Enter your Name' name='name' required />
            </div>

            <div className='input-box'>
                <label>Email Address</label>
                <input type="email" className='field' placeholder='Enter your Email' name='email' required />
            </div>

            <div className='input-box'>
                <label>Your Message</label>
                <textarea name="message" className="field" placeholder="Enter Your message"></textarea>
 
            </div>
            <button type='submit'>Send Message</button>
        </form>

    </section>
  )
}

export default Contact
