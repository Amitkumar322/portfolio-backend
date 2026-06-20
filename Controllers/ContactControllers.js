const mongoose = require('mongoose');
const Contact = require('../models/Contact');
const sendEmail = require('../Utils/sendEmail');

const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Save to DB only if mongoose is connected
    if (mongoose.connection.readyState === 1) {
      try {
        await Contact.create({ name, email, subject, message });
        console.log('Contact inquiry saved to database.');
      } catch (dbError) {
        console.error('⚠️ DB Save Error:', dbError.message);
      }
    } else {
      console.log('ℹ️ Database connection is inactive. Skipping DB save.');
    }

    // Send Email
    await sendEmail({ name, email, subject, message });
    console.log('Contact email sent successfully.');

    res.status(200).json({ success: true, message: 'Message sent!' });
  } catch (error) {
    console.error('Form submission failed:', error);
    res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
  }
};

module.exports = { submitContact };