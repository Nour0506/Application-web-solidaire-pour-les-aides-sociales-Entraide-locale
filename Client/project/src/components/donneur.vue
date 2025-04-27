<script setup lang="ts">
import { ref, computed } from 'vue'

interface AideOffre {
  type: string
  titre: string
  description: string
  localisation: string
  disponibilite: {
    jours: string[]
    heures: string
  }
  contact: {
    methode: string
    valeur: string
  }
  photos: string[]
  categorie: string[]
  urgence: boolean
  quantite?: number
  etat?: string
}

const typeOptions = [
  { value: 'vetements', label: 'Vêtements', icon: '👕' },
  { value: 'nourriture', label: 'Nourriture', icon: '🥗' },
  { value: 'services', label: 'Services', icon: '🤝' },
  { value: 'temps', label: 'Temps', icon: '⏰' },
  { value: 'logement', label: 'Logement', icon: '🏠' },
  { value: 'transport', label: 'Transport', icon: '🚗' },
  { value: 'materiel', label: 'Matériel', icon: '📦' },
  { value: 'autre', label: 'Autre', icon: '✨' }
]

const categories = {
  vetements: ['Enfant', 'Adulte', 'Hiver', 'Été', 'Chaussures', 'Accessoires'],
  nourriture: ['Plats préparés', 'Produits frais', 'Non-périssable', 'Spécial régime'],
  services: ['Aide administrative', 'Bricolage', 'Informatique', 'Cours/Formation', 'Garde d\'enfants'],
  temps: ['Accompagnement', 'Écoute', 'Aide aux courses', 'Activités sociales'],
  logement: ['Temporaire', 'Long terme', 'Urgence', 'Colocation'],
  transport: ['Covoiturage régulier', 'Transport ponctuel', 'Déménagement'],
  materiel: ['Électroménager', 'Meubles', 'Électronique', 'Livres/Jouets'],
  autre: ['Divers']
}

const joursSemaine = [
  'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'
]

const contactMethods = [
  { value: 'telephone', label: 'Téléphone', icon: '📞' },
  { value: 'email', label: 'Email', icon: '📧' },
  { value: 'whatsapp', label: 'WhatsApp', icon: '💬' }
]

const etatsOptions = [
  'Neuf',
  'Très bon état',
  'Bon état',
  'État correct',
  'À réparer'
]

const formData = ref<AideOffre>({
  type: '',
  titre: '',
  description: '',
  localisation: '',
  disponibilite: {
    jours: [],
    heures: ''
  },
  contact: {
    methode: '',
    valeur: ''
  },
  photos: [],
  categorie: [],
  urgence: false,
  quantite: undefined,
  etat: undefined
})

const currentStep = ref(1)
const totalSteps = 4
const submitted = ref(false)
const errorMessage = ref('')
const previewImage = ref<string | null>(null)

const availableCategories = computed(() => {
  return formData.value.type ? categories[formData.value.type as keyof typeof categories] : []
})

const showQuantityField = computed(() => {
  return ['vetements', 'nourriture', 'materiel'].includes(formData.value.type)
})

const showStateField = computed(() => {
  return ['vetements', 'materiel'].includes(formData.value.type)
})

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        previewImage.value = e.target.result as string
        formData.value.photos.push(e.target.result as string)
      }
    }
    reader.readAsDataURL(input.files[0])
  }
}

const removePhoto = (index: number) => {
  formData.value.photos.splice(index, 1)
  if (index === 0) {
    previewImage.value = null
  }
}

const nextStep = () => {
  if (validateCurrentStep()) {
    currentStep.value++;
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll vers le haut
  } else {
    // Animation pour attirer l'attention sur l'erreur
    const errorEl = document.querySelector('.error-message');
    if (errorEl) {
      errorEl.classList.remove('shake');
      void (errorEl as HTMLElement).offsetWidth; // Déclenche le reflow
      errorEl.classList.add('shake');
    }
  }
};

const previousStep = () => {
  currentStep.value--
}
const validateCurrentStep = () => {
    errorMessage.value = ''; // Reset error message

if (currentStep.value === 1) {
  if (!formData.value.type) {
    errorMessage.value = 'Veuillez sélectionner un type d\'aide';
    return false;
  }
  
  // Validation spécifique pour certaines catégories
  if (formData.value.type !== 'autre' && formData.value.categorie.length === 0) {
    errorMessage.value = 'Veuillez sélectionner au moins une catégorie';
    return false;
  }
  
  return true;
}

  switch (currentStep.value) {
    case 1:
      if (!formData.value.type) {
        errorMessage.value = 'Veuillez sélectionner un type d\'aide';
        return false;
      }
      if (formData.value.categorie.length === 0) {
        errorMessage.value = 'Veuillez sélectionner au moins une catégorie';
        return false;
      }
      break;
      
    case 2:
      if (!formData.value.titre.trim()) {
        errorMessage.value = 'Veuillez saisir un titre pour votre annonce';
        return false;
      }
      if (!formData.value.description.trim()) {
        errorMessage.value = 'Veuillez saisir une description';
        return false;
      }
      break;
      
    case 3:
      if (!formData.value.localisation.trim()) {
        errorMessage.value = 'Veuillez indiquer une localisation';
        return false;
      }
      if (formData.value.disponibilite.jours.length === 0) {
        errorMessage.value = 'Veuillez sélectionner au moins un jour de disponibilité';
        return false;
      }
      break;
      
    case 4:
      if (!formData.value.contact.methode) {
        errorMessage.value = 'Veuillez sélectionner une méthode de contact';
        return false;
      }
      if (!formData.value.contact.valeur.trim()) {
        const fieldName = formData.value.contact.methode === 'email' ? 'adresse email' : 'numéro de téléphone';
        errorMessage.value = `Veuillez saisir votre ${fieldName}`;
        return false;
      }
      break;
  }
  
  return true;
};
const submitForm = () => {
  if (validateCurrentStep()) {
    // Here we would normally send the data to a backend
    console.log('Form submitted:', formData.value)
    submitted.value = true
  }
}

const resetForm = () => {
  formData.value = {
    type: '',
    titre: '',
    description: '',
    localisation: '',
    disponibilite: {
      jours: [],
      heures: ''
    },
    contact: {
      methode: '',
      valeur: ''
    },
    photos: [],
    categorie: [],
    urgence: false,
    quantite: undefined,
    etat: undefined
  }
  currentStep.value = 1
  submitted.value = false
  errorMessage.value = ''
  previewImage.value = null
}

const getStepTitle = (step: number) => {
  switch (step) {
    case 1: return 'Type d\'aide'
    case 2: return 'Description'
    case 3: return 'Localisation & Disponibilité'
    case 4: return 'Contact'
    default: return ''
  }
}
</script>

<template>
  <div class="donneur-page">
    <nav class="navigation">
      <router-link to="/" class="back-button">
        ← Retour à l'accueil
      </router-link>
    </nav>

    <div class="content-container" :class="{ 'success-view': submitted }">
      <div v-if="!submitted" class="form-wrapper">
        <div class="progress-bar">
          <div 
            v-for="step in totalSteps" 
            :key="step"
            class="step"
            :class="{ 
              'active': step === currentStep,
              'completed': step < currentStep
            }"
          >
            <div class="step-number">{{ step }}</div>
            <div class="step-title">{{ getStepTitle(step) }}</div>
          </div>
        </div>

        <form @submit.prevent="currentStep === totalSteps ? submitForm() : nextStep()" class="aide-form">
          <!-- Step 1: Type d'aide -->
          <div v-show="currentStep === 1" class="form-step">
            <h2>Que souhaitez-vous offrir ?</h2>
            
            <div class="type-grid">
              <button
                v-for="option in typeOptions"
                :key="option.value"
                type="button"
                class="type-button"
                :class="{ selected: formData.type === option.value }"
                @click="formData.type = option.value"
              >
                <span class="type-icon">{{ option.icon }}</span>
                <span>{{ option.label }}</span>
              </button>
            </div>

            <div v-if="formData.type" class="categories-section">
              <h3>Catégories spécifiques</h3>
              <div class="categories-grid">
                <label 
                  v-for="cat in availableCategories"
                  :key="cat"
                  class="category-checkbox"
                >
                  <input
                    type="checkbox"
                    v-model="formData.categorie"
                    :value="cat"
                  >
                  <span>{{ cat }}</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Step 2: Description -->
          <div v-show="currentStep === 2" class="form-step">
            <h2>Décrivez votre offre</h2>
            
            <div class="form-group">
              <label for="titre">Titre de l'annonce *</label>
              <input 
                type="text"
                id="titre"
                v-model="formData.titre"
                placeholder="Ex: Vêtements d'hiver pour enfants"
                
              >
            </div>

            <div class="form-group">
              <label for="description">Description détaillée *</label>
              <textarea 
                id="description"
                v-model="formData.description"
                placeholder="Décrivez ce que vous proposez..."
                rows="4"
                
              ></textarea>
            </div>

            <div v-if="showQuantityField" class="form-group">
              <label for="quantite">Quantité disponible</label>
              <input 
                type="number"
                id="quantite"
                v-model="formData.quantite"
                min="1"
              >
            </div>

            <div v-if="showStateField" class="form-group">
              <label for="etat">État</label>
              <select id="etat" v-model="formData.etat">
                <option value="">Sélectionnez l'état</option>
                <option v-for="etat in etatsOptions" :key="etat" :value="etat">
                  {{ etat }}
                </option>
              </select>
            </div>

            

            <div class="photo-upload">
              <label for="photo" class="photo-upload-label">
                <span class="upload-icon">📸</span>
                Ajouter des photos
              </label>
              <input 
                type="file"
                id="photo"
                accept="image/*"
                @change="handleFileUpload"
                class="hidden"
              >
              
              <div v-if="formData.photos.length" class="photo-preview">
                <div 
                  v-for="(photo, index) in formData.photos"
                  :key="index"
                  class="preview-item"
                >
                  <img :src="photo" alt="Preview">
                  <button 
                    type="button"
                    class="remove-photo"
                    @click="removePhoto(index)"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Localisation & Disponibilité -->
          <div v-show="currentStep === 3" class="form-step">
            <h2>Où et quand ?</h2>
            
            <div class="form-group">
              <label for="localisation">Localisation *</label>
              <input 
                type="text"
                id="localisation"
                v-model="formData.localisation"
                placeholder="Ville ou quartier"
               
              >
            </div>

            <div class="disponibilite-section">
              <h3>Disponibilité</h3>
              
              <div class="jours-selection">
                <label 
                  v-for="jour in joursSemaine"
                  :key="jour"
                  class="jour-checkbox"
                >
                  <input
                    type="checkbox"
                    v-model="formData.disponibilite.jours"
                    :value="jour"
                  >
                  <span>{{ jour.substring(0, 3) }}</span>
                </label>
              </div>

              <div class="form-group">
                <label for="heures">Heures de disponibilité</label>
                <input 
                  type="text"
                  id="heures"
                  v-model="formData.disponibilite.heures"
                  placeholder="Ex: 9h-12h, 14h-18h"
                >
              </div>
            </div>
          </div>

          <!-- Step 4: Contact -->
          <div v-show="currentStep === 4" class="form-step">
            <h2>Comment vous contacter ?</h2>
            
            <div class="contact-method">
              <div class="method-buttons">
                <button
                  v-for="method in contactMethods"
                  :key="method.value"
                  type="button"
                  class="method-button"
                  :class="{ selected: formData.contact.methode === method.value }"
                  @click="formData.contact.methode = method.value"
                >
                  <span class="method-icon">{{ method.icon }}</span>
                  <span>{{ method.label }}</span>
                </button>
              </div>

              <div v-if="formData.contact.methode" class="form-group">
                <label :for="formData.contact.methode">
                  {{ formData.contact.methode === 'email' ? 'Adresse email' : 'Numéro de téléphone' }}
                </label>
                <input 
                  :type="formData.contact.methode === 'email' ? 'email' : 'tel'"
                  :id="formData.contact.methode"
                  v-model="formData.contact.valeur"
                  :placeholder="formData.contact.methode === 'email' ? 'votre@email.com' : '+33 6 12 34 56 78'"
                  
                >
              </div>
            </div>
          </div>

          <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>

          <div class="form-navigation">
            <button 
              type="button" 
              class="nav-button previous"
              v-if="currentStep > 1"
              @click="previousStep"
            >
              Précédent
            </button>
            
            <button 
              type="submit" 
              class="nav-button next"
              :class="{ 'submit': currentStep === totalSteps }"
            >
              {{ currentStep === totalSteps ? 'Publier l\'annonce' : 'Suivant' }}
            </button>
          </div>
        </form>
      </div>

      <div v-else class="success-view">
        <div class="success-content">
          <div class="success-icon">🎉</div>
          <h2>Merci pour votre générosité!</h2>
          <p>Votre offre d'aide a été publiée avec succès.</p>
          <div class="offer-summary">
            <h3>Récapitulatif de votre offre</h3>
            <div class="summary-details">
              <p><strong>Type:</strong> {{ typeOptions.find(t => t.value === formData.type)?.label }}</p>
              <p><strong>Titre:</strong> {{ formData.titre }}</p>
              <p><strong>Localisation:</strong> {{ formData.localisation }}</p>
              <p><strong>Catégories:</strong> {{ formData.categorie.join(', ') }}</p>
            </div>
          </div>
          <button @click="resetForm" class="new-offer-button">
            Proposer une nouvelle aide
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.donneur-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  flex-direction: column;
}

.navigation {
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
.shake {
  animation: shake 0.5s;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-5px); }
  40%, 80% { transform: translateX(5px); }
}
.back-button {
  color: #2c3e50;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

.back-button:hover {
  color: #3498db;
  background: rgba(52, 152, 219, 0.1);
}

.content-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 6rem 2rem 2rem;
}

.form-wrapper {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 900px;
  overflow: hidden;
}

.progress-bar {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  flex: 1;
}

.step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 1rem;
  right: -50%;
  width: 100%;
  height: 2px;
  background: #ddd;
  z-index: 1;
}

.step.completed:not(:last-child)::after {
  background: #43A047;
}

.step-number {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: #ddd;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.step.active .step-number {
  background: #43A047;
  transform: scale(1.2);
}

.step.completed .step-number {
  background: #43A047;
}

.step-title {
  font-size: 0.9rem;
  color: #666;
  text-align: center;
}

.aide-form {
  padding: 2rem;
}

.form-step {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

h2 {
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1.8rem;
}

.type-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.type-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem;
  border: 2px solid #eee;
  border-radius: 12px;
  background: white;
  transition: all 0.3s ease;
  cursor: pointer;
}

.type-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.type-button.selected {
  border-color: #43A047;
  background: #f1f8e9;
}

.type-icon {
  font-size: 2rem;
}

.categories-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.category-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-checkbox:hover {
  background: #f8f9fa;
}

.category-checkbox input {
  width: 1.2rem;
  height: 1.2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  color: #2c3e50;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

input, select, textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus, select:focus, textarea:focus {
  border-color: #43A047;
  outline: none;
  box-shadow: 0 0 0 3px rgba(67, 160, 71, 0.1);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.photo-upload {
  margin-top: 2rem;
}

.photo-upload-label {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 2px dashed #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.photo-upload-label:hover {
  border-color: #43A047;
  background: #f1f8e9;
}

.upload-icon {
  font-size: 1.5rem;
}

.hidden {
  display: none;
}

.photo-preview {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  overflow-x: auto;
  padding: 0.5rem;
}

.preview-item {
  position: relative;
  width: 100px;
  height: 100px;
}

.preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.remove-photo {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: #e74c3c;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  padding: 0;
}

.disponibilite-section {
  margin-top: 2rem;
}

.jours-selection {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.jour-checkbox {
  flex: 1;
  min-width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.jour-checkbox:hover {
  background: #f8f9fa;
}

.jour-checkbox input:checked + span {
  color: #43A047;
  font-weight: bold;
}

.contact-method {
  margin-bottom: 2rem;
}

.method-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.method-button {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 12px;
  background: white;
  transition: all 0.3s ease;
  cursor: pointer;
}

.method-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.method-button.selected {
  border-color: #43A047;
  background: #f1f8e9;
}

.method-icon {
  font-size: 1.5rem;
}

.error-message {
  color: #e74c3c;
  text-align: center;
  margin: 1rem 0;
  padding: 0.75rem;
  background: #fdf3f2;
  border-radius: 8px;
}

.form-navigation {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
}

.nav-button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.previous {
  background: #f8f9fa;
  color: #2c3e50;
}

.next {
  background: #43A047;
  color: white;
}

.next:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(67, 160, 71, 0.2);
}

.next.submit {
  background: linear-gradient(135deg, #43A047 0%, #2E7D32 100%);
  padding: 1rem 3rem;
}

.success-view {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: bounce 1s ease;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-30px); }
  60% { transform: translateY(-15px); }
}

.success-content h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.offer-summary {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  text-align: left;
}

.summary-details {
  margin-top: 1rem;
}

.summary-details p {
  margin: 0.5rem 0;
}

.new-offer-button {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.new-offer-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.2);
}

@media (max-width: 768px) {
  .content-container {
    padding: 5rem 1rem 1rem;
  }

  .form-wrapper {
    border-radius: 12px;
  }

  .aide-form {
    padding: 1.5rem;
  }

  .type-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }

  .method-buttons {
    flex-direction: column;
  }

  .progress-bar {
    padding: 1rem;
  }

  .step-title {
    display: none;
  }
}
</style>