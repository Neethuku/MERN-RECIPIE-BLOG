// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from'dotenv';
// import userRoute from './routes/userRoutes.js';
// import authRoutes from './routes/authRoutes.js';
// import cookieParser from 'cookie-parser';
// import postRoutes from './routes/postRouts.js';
// import commentRoutes from './routes/commentRoutes.js';
// import path from 'path';

// dotenv.config();

// mongoose.connect(process.env.MONGO)
// .then(()=>{
//  console.log('Mongodb is connected');
// }).catch(err =>{
//     console.log(err);
// });

// const __dirname = path.resolve();

// const app = express();


// app.use(express.json());
// app.use(cookieParser());


// app.listen(3000, ()=>{
//     console.log('Server is running on port 3000');
// });

// app.use('/api/user',userRoute);
// app.use('/api/auth', authRoutes);
// app.use('/api/post',postRoutes);
// app.use('/api/comment',commentRoutes);


// app.use(express.static(path.join(__dirname,'/frontend/dist')));

// app.get('/',(req,res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
// });

// app.use((err, req, res, next) =>{
//     const statusCode = err.statusCode || 500;
//     const message = err.message || 'Internal Server Error';
//     res.status(statusCode).json({
//         success: false,
//         statusCode,
//         message,
//     })
// })

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/postRoutes.js'; // corrected typo in import path
import commentRoutes from './routes/commentRoutes.js';
import path from 'path';

dotenv.config();

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('Mongodb is connected');
  }).catch(err => {
    console.error('MongoDB connection error:', err);
  });

const app = express();

app.use(express.json());
app.use(cookieParser());

// Serve static files from the 'frontend/dist' directory
const frontendPath = path.resolve(__dirname, 'frontend', 'dist');
app.use(express.static(frontendPath));

// Define API routes
app.use('/api/user', userRoute);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

// Serve index.html for all other routes (client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Error handling middleware (should be placed at the end)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
