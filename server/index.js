
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
    res.json({ message: 'Test' })
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
  }
};

connectDB();

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

const Contact = mongoose.model('Contact', contactSchema);




// // Routes
app.get('/contacts', async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

app.post('/contacts', async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.json(contact);
});

// app.delete('/contacts/:id', async (req, res) => {
//   await Contact.findByIdAndDelete(req.params.id);
//   res.json({ message: 'Deleted' });
// });


