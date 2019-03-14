import React from 'react';
import Layout from '../components/layout';
import Nav from '../components/nav';

import './contact.css';

const Contact = () => (
    <Layout>
        <Nav />
        <div className='background'></div>
        <div className='contact__section'>
            <div className='contact__form'>
            <h1>Contact</h1>
                <div className='inner'>
                        <form method='post' name='contact' data-netlify='true' netlify-honeypot='bot'>
                            <div className='field__hidden'>
                                <label htmlFor='bot'>Don't fill this out, human</label>
                                <input type='text' name='bot' />
                            </div>
                            <div className='field'>
                                <label htmlFor='name'>Name</label>
                                <input type='text' name='name' id='name' />
                            </div>
                            <div className='field'>
                                <label htmlFor='email'>Email</label>
                                <input type='text' name='email' id='email' />
                            </div>
                            <div className='field'>
                                <label htmlFor='message'>Message</label>
                                <textarea name='message' id='message' rows='6'></textarea>
                            </div>
                            <ul className='actions'>
                                <li><input type='submit' value='Send' className='btn__med' /></li>
                            </ul>
                        </form>
                </div>
            </div>
        </div>
    </Layout>
)

export default Contact