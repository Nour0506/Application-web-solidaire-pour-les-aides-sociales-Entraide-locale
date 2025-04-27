import { AideOffre } from '../models/AideOffre.js';
import express from 'express';

const router = express.Router();
// GET all AideOffres
export const getAllAideOffres = async (req, res) => {
  try {
    const offres = await AideOffre.find();
    res.status(200).json(offres);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des offres', error });
  }
};

// UPDATE une AideOffre
export const updateAideOffre = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedOffre = await AideOffre.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updatedOffre) {
      return res.status(404).json({ message: 'Offre non trouvée' });
    }

    res.status(200).json(updatedOffre);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'offre', error });
  }
};
const addAideOffre = async (req, res) => {
  try {
    const nouvelleOffre = new AideOffre(req.body);
    await nouvelleOffre.save();
    res.status(201).json(nouvelleOffre);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de l\'ajout de l\'offre', error });
  }
};
// DELETE une AideOffre
export const deleteAideOffre = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOffre = await AideOffre.findByIdAndDelete(id);

    if (!deletedOffre) {
      return res.status(404).json({ message: 'Offre non trouvée' });
    }

    res.status(200).json({ message: 'Offre supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'offre', error });
  }
};
router.post('/', addAideOffre);
router.get('/', getAllAideOffres);
router.put('/:id', updateAideOffre);
router.delete('/:id', deleteAideOffre);

export default router;