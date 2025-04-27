import express from 'express';
import bcrypt from 'bcryptjs';
import session from 'express-session';
import { User } from './models/User'; // Assurez-vous que vous avez défini un modèle User avec Mongoose

const router = express.Router();

// Middleware de session
router.use(session({
  secret: 'SECRET_KEY',  // Remplace par une clé secrète en production
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Si tu utilises HTTPS, mettez à true
}));

// --- Route de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Vérifier si l'utilisateur existe dans la base de données
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }

    // 2. Comparer le mot de passe avec celui stocké (haché) dans la base
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // 3. Créer une session pour l'utilisateur
    req.session.user = { id: user._id, email: user.email };
    res.status(200).json({ message: 'Connexion réussie', user: req.session.user });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error });
  }
});

// --- Route pour vérifier si l'utilisateur est connecté
router.get('/profile', (req, res) => {
  if (req.session.user) {
    res.status(200).json({ message: 'Utilisateur connecté', user: req.session.user });
  } else {
    res.status(401).json({ message: 'Veuillez vous connecter' });
  }
});

// --- Route de logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
    }
    res.status(200).json({ message: 'Déconnexion réussie' });
  });
});

export default router;
