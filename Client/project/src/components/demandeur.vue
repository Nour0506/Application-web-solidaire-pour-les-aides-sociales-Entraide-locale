<script setup lang="ts">
import { ref, computed } from 'vue'

interface AideOffre {
  id: string
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
  datePublication: string
}

// Simulated data - In a real app, this would come from your backend
const offres = ref<AideOffre[]>([
  {
    id: '1',
    type: 'vetements',
    titre: 'Vêtements d\'hiver pour enfants',
    description: 'Lot de vêtements chauds pour enfants de 3-4 ans en très bon état.',
    localisation: 'Paris 15ème',
    disponibilite: {
      jours: ['Lundi', 'Mercredi', 'Vendredi'],
      heures: '14h-18h'
    },
    contact: {
      methode: 'email',
      valeur: 'contact@example.com'
    },
    photos: ['https://media.istockphoto.com/id/1338894509/photo/woman-choosing-a-new-style-for-herself.jpg?s=2048x2048&w=is&k=20&c=G_SNYZ5-65STW4Hcq2Ef6CsBSuKXuEimV2fpzS49BB8='],
    categorie: ['Enfant', 'Hiver'],
    urgence: false,
    quantite: 5,
    etat: 'Très bon état',
    datePublication: '2024-03-15'
  },
  {
    id: '2',
    type: 'nourriture',
    titre: 'Repas faits maison',
    description: 'Je propose des repas faits maison, cuisine traditionnelle française.',
    localisation: 'Lyon 3ème',
    disponibilite: {
      jours: ['Mardi', 'Jeudi'],
      heures: '11h-14h'
    },
    contact: {
      methode: 'telephone',
      valeur: '+33612345678'
    },
    photos: ['https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'],
    categorie: ['Plats préparés'],
    urgence: true,
    quantite: 3,
    datePublication: '2024-03-16'
  },
  {
    id: '3',
    type: 'services',
    titre: 'Cours de mathématiques',
    description: 'Professeur expérimenté propose du soutien en mathématiques niveau collège/lycée.',
    localisation: 'Bordeaux Centre',
    disponibilite: {
      jours: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
      heures: '16h-19h'
    },
    contact: {
      methode: 'whatsapp',
      valeur: '+33687654321'
    },
    photos: ['https://images.pexels.com/photos/4260325/pexels-photo-4260325.jpeg'],
    categorie: ['Cours/Formation'],
    urgence: false,
    datePublication: '2024-03-14'
  }
])

const typeIcons: Record<string, string> = {
  vetements: '👕',
  nourriture: '🥗',
  services: '🤝',
  temps: '⏰',
  logement: '🏠',
  transport: '🚗',
  materiel: '📦',
  autre: '✨'
}

const typeLabels: Record<string, string> = {
  vetements: 'Vêtements',
  nourriture: 'Nourriture',
  services: 'Services',
  temps: 'Temps',
  logement: 'Logement',
  transport: 'Transport',
  materiel: 'Matériel',
  autre: 'Autre'
}

const searchQuery = ref('')
const selectedType = ref<string>('')
const selectedLocation = ref<string>('')
const showUrgentOnly = ref(false)

const filteredOffres = computed(() => {
  return offres.value.filter(offre => {
    const matchesSearch = offre.titre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         offre.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesType = !selectedType.value || offre.type === selectedType.value
    const matchesLocation = !selectedLocation.value || 
                           offre.localisation.toLowerCase().includes(selectedLocation.value.toLowerCase())
    const matchesUrgent = !showUrgentOnly.value || offre.urgence

    return matchesSearch && matchesType && matchesLocation && matchesUrgent
  })
})

const locations = computed(() => {
  return [...new Set(offres.value.map(offre => offre.localisation))]
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

const getContactIcon = (methode: string) => {
  switch (methode) {
    case 'email': return '📧'
    case 'telephone': return '📞'
    case 'whatsapp': return '💬'
    default: return '📱'
  }
}

const selectedOffer = ref<AideOffre | null>(null)

const openOfferDetails = (offre: AideOffre) => {
  selectedOffer.value = offre
}

const closeOfferDetails = () => {
  selectedOffer.value = null
}
</script>

<template>
  <div class="demandeur-page">
    <nav class="navigation">
      <router-link to="/" class="back-button">
        ← Retour à l'accueil
      </router-link>
    </nav>

    <div class="search-section">
      <h1>Trouvez l'aide dont vous avez besoin</h1>
      <p class="subtitle">Le prix de ces articles est votre sourire 😊</p>
      
      <div class="search-filters">
        <div class="search-bar">
          <input 
            type="text"
            v-model="searchQuery"
            placeholder="Rechercher une offre..."
            class="search-input"
          >
        </div>

        <div class="filters">
          <select 
            v-model="selectedType"
            class="filter-select"
          >
            <option value="">Tous les types</option>
            <option 
              v-for="(label, type) in typeLabels" 
              :key="type"
              :value="type"
            >
              {{ typeIcons[type] }} {{ label }}
            </option>
          </select>

          <select 
            v-model="selectedLocation"
            class="filter-select"
          >
            <option value="">Toutes les localisations</option>
            <option 
              v-for="location in locations"
              :key="location"
              :value="location"
            >
              📍 {{ location }}
            </option>
          </select>

          
        </div>
      </div>
    </div>

    <div class="offers-grid">
      <div 
        v-for="offre in filteredOffres"
        :key="offre.id"
        class="offer-card"
        @click="openOfferDetails(offre)"
      >
        <div class="offer-image">
          <img 
            :src="offre.photos[0]" 
            :alt="offre.titre"
            class="card-image"
          >
          <div v-if="offre.urgence" class="urgent-badge">
            URGENT
          </div>
        </div>

        <div class="offer-content">
          <div class="offer-header">
            <span class="offer-type">
              {{ typeIcons[offre.type] }} {{ typeLabels[offre.type] }}
            </span>
            <span class="offer-date">
              {{ formatDate(offre.datePublication) }}
            </span>
          </div>

          <h2 class="offer-title">{{ offre.titre }}</h2>
          <p class="offer-location">📍 {{ offre.localisation }}</p>
          
          <div class="offer-categories">
            <span 
              v-for="(cat, index) in offre.categorie"
              :key="index"
              class="category-tag"
            >
              {{ cat }}
            </span>
          </div>

          <div class="offer-footer">
            <div class="availability">
              🗓️ {{ offre.disponibilite.jours.length }} jours disponibles
            </div>
            <button class="details-button">
              Voir les détails →
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Offer Details Modal -->
    <div 
      v-if="selectedOffer"
      class="modal-overlay"
      @click="closeOfferDetails"
    >
      <div 
        class="modal-content"
        @click.stop
      >
        <button 
          class="close-button"
          @click="closeOfferDetails"
        >
          ×
        </button>

        <div class="modal-body">
          <div class="modal-image">
            <img 
              :src="selectedOffer.photos[0]"
              :alt="selectedOffer.titre"
            >
            <div v-if="selectedOffer.urgence" class="urgent-badge">
              URGENT
            </div>
          </div>

          <div class="modal-info">
            <div class="offer-header">
              <span class="offer-type">
                {{ typeIcons[selectedOffer.type] }} {{ typeLabels[selectedOffer.type] }}
              </span>
              <span class="offer-date">
                {{ formatDate(selectedOffer.datePublication) }}
              </span>
            </div>

            <h2>{{ selectedOffer.titre }}</h2>
            <p class="location">📍 {{ selectedOffer.localisation }}</p>

            <div class="description">
              <h3>Description</h3>
              <p>{{ selectedOffer.description }}</p>
            </div>

            <div v-if="selectedOffer.quantite" class="detail-item">
              <strong>Quantité disponible:</strong> {{ selectedOffer.quantite }}
            </div>

            <div v-if="selectedOffer.etat" class="detail-item">
              <strong>État:</strong> {{ selectedOffer.etat }}
            </div>

            <div class="categories">
              <span 
                v-for="(cat, index) in selectedOffer.categorie"
                :key="index"
                class="category-tag"
              >
                {{ cat }}
              </span>
            </div>

            <div class="availability-details">
              <h3>Disponibilité</h3>
              <div class="days">
                <span 
                  v-for="(jour, index) in selectedOffer.disponibilite.jours"
                  :key="index"
                  class="day-tag"
                >
                  {{ jour }}
                </span>
              </div>
              <p class="hours">🕒 {{ selectedOffer.disponibilite.heures }}</p>
            </div>

            <div class="contact-info">
              <h3>Contact</h3>
              <p>
                {{ getContactIcon(selectedOffer.contact.methode) }}
                {{ selectedOffer.contact.valeur }}
              </p>
            </div>

            <div class="reminder">
              <p>💝 Le prix de cet article est votre sourire</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demandeur-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
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

.search-section {
  padding: 6rem 2rem 2rem;
  text-align: center;
}

h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.subtitle {
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.search-filters {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.search-bar {
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  max-width: 600px;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  border: 2px solid #eee;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.filters {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.filter-select {
  padding: 0.75rem 1rem;
  border: 2px solid #eee;
  border-radius: 8px;
  background: white;
  min-width: 200px;
  cursor: pointer;
}

.urgent-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 2px solid #eee;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.urgent-filter:hover {
  background: #f8f9fa;
}

.offers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.offer-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.offer-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.offer-image {
  position: relative;
  height: 200px;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.urgent-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #e74c3c;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.9rem;
}

.offer-content {
  padding: 1.5rem;
}

.offer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.offer-type {
  font-weight: 500;
  color: #666;
}

.offer-date {
  font-size: 0.9rem;
  color: #999;
}

.offer-title {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.offer-location {
  color: #666;
  margin-bottom: 1rem;
}

.offer-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.category-tag {
  background: #f0f2f5;
  color: #666;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.9rem;
}

.offer-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.availability {
  color: #666;
  font-size: 0.9rem;
}

.details-button {
  color: #3498db;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}

.details-button:hover {
  color: #2980b9;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: white;
  border: none;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.modal-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.modal-image {
  position: relative;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-info {
  padding: 2rem;
}

.modal-info h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.location {
  color: #666;
  margin-bottom: 1.5rem;
}

.description {
  margin-bottom: 1.5rem;
}

.description h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.description p {
  color: #666;
  line-height: 1.6;
}

.detail-item {
  margin-bottom: 1rem;
  color: #666;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.availability-details {
  margin-bottom: 1.5rem;
}

.days {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.day-tag {
  background: #f0f2f5;
  color: #666;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.hours {
  color: #666;
  margin-top: 0.5rem;
}

.contact-info {
  margin-bottom: 1.5rem;
}

.contact-info h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.contact-info p {
  color: #666;
  font-size: 1.1rem;
}

.reminder {
  text-align: center;
  padding: 1rem;
  background: #f1f8e9;
  border-radius: 12px;
  color: #43A047;
  font-weight: 500;
}

@media (max-width: 768px) {
  .modal-body {
    grid-template-columns: 1fr;
  }

  .modal-image {
    height: 300px;
  }

  .search-section {
    padding: 5rem 1rem 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  .offers-grid {
    padding: 1rem;
    gap: 1rem;
  }
}
</style>