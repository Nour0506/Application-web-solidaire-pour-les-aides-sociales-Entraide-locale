import { Schema, model } from 'mongoose';

const AideOffreSchema = new Schema({
  type: { type: String, required: true, enum: ['vetements', 'nourriture', 'services', 'temps', 'logement', 'transport', 'materiel', 'autre'] },
  titre: { type: String, required: true },
  description: { type: String, required: true },
  localisation: { type: String, required: true },
  disponibilite: {
    jours: [{ type: String, enum: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'] }],
    heures: String
  },
  contact: {
    methode: { type: String, enum: ['telephone', 'email', 'whatsapp'] },
    valeur: { type: String, required: true }
  },
  photos: [String],
  categorie: [String],
  urgence: { type: Boolean, default: false },
  quantite: Number,
  etat: { type: String, enum: ['Neuf', 'Très bon état', 'Bon état', 'État correct', 'À réparer'] },
  createdAt: { type: Date, default: Date.now }
});

export const AideOffre = model('AideOffre', AideOffreSchema);