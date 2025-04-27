import express from 'express';
const app = express();
const PORT = 3000;
import signin from './controllers/Login.js';
import Signup from './controllers/Signup.js';
// Middleware pour parser le JSON
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use('/api/login',signin);
app.use('/api/signup',Signup);
// Route de base
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


export default app;