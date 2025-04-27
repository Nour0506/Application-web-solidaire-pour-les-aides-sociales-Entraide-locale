import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User'; // Assurez-vous que vous avez défini un modèle User avec Mongoose

const router = express.Router();

// --- Route pour s'inscrire (sign up)
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Vérifier si l'email est déjà utilisé
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'L\'email est déjà utilisé' });
    }

    // 2. Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10); // Le "10" est le nombre de tours de hachage

    // 3. Créer un nouvel utilisateur
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // 4. Sauvegarder l'utilisateur dans la base de données
    await newUser.save();

    // 5. Réponse si l'inscription réussie
    res.status(201).json({ message: 'Inscription réussie' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'inscription', error });
  }
});

export default router;
