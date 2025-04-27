<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showInfo = ref(false)
const hoveredRole = ref<string | null>(null)
const isLoaded = ref(false)

const donorOfMonth = {
  name: 'Marie-Claire Dubois',
  avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150',
  contributions: 47,
  impact: '156 personnes aidées',
  speciality: 'Aide alimentaire',
  testimonial: 'Donner me permet de créer un impact positif dans ma communauté. Chaque sourire que je reçois est une récompense inestimable.',
  badges: ['Super Donneur', 'Impact Social', 'Communauté Active']
}

const selectRole = (role: 'donneur' | 'demandeur') => {
  router.push(`/${role}`)
}

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})
</script>

<template>
  <div class="welcome-container" :class="{ 'is-loaded': isLoaded }">
    <header class="header">
      <div class="logo-container animate-float">
        <div class="logo-circle">
          <span class="logo-icon">🤝</span>
        </div>
        <h1>Solidarité<span class="accent">Connect</span></h1>
      </div>
      <p class="subtitle">L'innovation au service de l'entraide communautaire</p>
      <div class="wave-animation">
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
    </header>

    <main class="main-content">
      <section class="hero-section">
        <div class="container">
          <div class="hero-grid">
            <div class="hero-text animate-slide-in">
              <h2>Ensemble, créons du changement</h2>
              <p>Rejoignez une communauté engagée dans l'entraide et la solidarité</p>
            </div>
            <div class="hero-stats animate-slide-in">
              <div class="stat-item">
                <span class="stat-number">2,458+</span>
                <span class="stat-label">Membres actifs</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">1,927</span>
                <span class="stat-label">Aides réalisées</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Donor of the Month Banner -->
    <div class="donor-banner" :class="{ 'show-details': showDonorDetails }">
      <div class="donor-banner-content">
        <div class="donor-badge" @click="showDonorDetails = !showDonorDetails">
          <img :src="donorOfMonth.avatar" alt="Donor of the month" class="donor-avatar">
          <div class="donor-crown">👑</div>
        </div>
        <div class="donor-info">
          <h3>Donneur du Mois</h3>
          <p class="donor-name">{{ donorOfMonth.name }}</p>
          <div class="donor-stats">
            <span class="stat">
              <strong>{{ donorOfMonth.contributions }}</strong> dons
            </span>
            <span class="stat">
              <strong>{{ donorOfMonth.impact }}</strong>
            </span>
          </div>
        </div>
      </div>
      
      <!-- Expanded Details -->
      <div class="donor-details" v-if="showDonorDetails">
        <div class="donor-testimonial">
          <p>"{{ donorOfMonth.testimonial }}"</p>
        </div>
        <div class="donor-badges">
          <span v-for="badge in donorOfMonth.badges" :key="badge" class="badge">
            {{ badge }}
          </span>
        </div>
        <div class="donor-speciality">
          <span class="speciality-label">Spécialité:</span>
          <span class="speciality-value">{{ donorOfMonth.speciality }}</span>
        </div>
      </div>
    </div>
      <section class="role-selection">
        <div class="container">
          <h2>Comment souhaitez-vous participer ?</h2>
          <div class="role-cards">
            <div 
              class="role-card"
              :class="{ active: hoveredRole === 'donneur' }"
              @mouseenter="hoveredRole = 'donneur'"
              @mouseleave="hoveredRole = null"
              @click="selectRole('donneur')"
            >
              <div class="card-icon">🎁</div>
              <h3>Je souhaite donner</h3>
              <p>Partagez vos ressources avec ceux qui en ont besoin</p>
              <div class="card-features">
                <span>Dons matériels</span>
                <span>Partage de compétences</span>
                <span>Bénévolat</span>
              </div>
            </div>

            <div 
              class="role-card"
              :class="{ active: hoveredRole === 'demandeur' }"
              @mouseenter="hoveredRole = 'demandeur'"
              @mouseleave="hoveredRole = null"
              @click="selectRole('demandeur')"
            >
              <div class="card-icon">🤲</div>
              <h3>Je cherche de l'aide</h3>
              <p>Trouvez le soutien dont vous avez besoin</p>
              <div class="card-features">
                <span>Aide alimentaire</span>
                <span>Support matériel</span>
                <span>Accompagnement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="testimonials">
        <div class="container">
          <div class="testimonial-card">
            <div class="quote">❝</div>
            <p>Cette plateforme a changé ma vie. J'ai pu trouver l'aide dont j'avais besoin rapidement et avec dignité.</p>
            <div class="author">
              <div class="author-avatar">S</div>
              <div class="author-info">
                <strong>Sophie M.</strong>
                <span>Membre depuis 2023</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <span class="footer-logo">🤝</span>
            <h3>SolidaritéConnect</h3>
            <p>Ensemble pour un monde meilleur</p>
          </div>
          <div class="footer-links">
            <div class="link-group">
              <h4>Explorer</h4>
              <a href="#">Comment ça marche</a>
              <a href="#">Témoignages</a>
              <a href="#">Impact social</a>
            </div>
            <div class="link-group">
              <h4>Légal</h4>
              <a href="#">Confidentialité</a>
              <a href="#">Conditions</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2024 SolidaritéConnect. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>

:root {
  --primary: #4CAF50;
  --primary-light: #81C784;
  --secondary: #2196F3;
  --success: #66BB6A;
  --white: #ffffff;
  --dark: #1a1a1a;
  --gray: #666666;
  font-family: 'Poppins', system-ui, -apple-system, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  
  color-scheme: light;
  background-color: #f7f9fc;
  
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.welcome-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.welcome-container.is-loaded {
  opacity: 1;
  transform: translateY(0);
}

.header {
  background: linear-gradient(135deg, #4CAF50, #2196F3);
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.logo-container {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  animation: float 6s ease-in-out infinite;
}

.logo-circle {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.logo-icon {
  font-size: 2.5rem;
}

h1 {
  color: white;
  font-size: 3rem;
  margin: 0;
}

.accent {
  color: #FFD700;
}

.subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  margin-top: 1rem;
}

/* Donor Banner Styles */
.donor-banner {
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  z-index: 1000;
  transition: all 0.3s ease;
  max-width: 400px;
  border: 2px solid rgba(76, 175, 80, 0.1);
}

.donor-banner:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.donor-banner-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.donor-badge {
  position: relative;
  cursor: pointer;
}

.donor-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--primary);
  padding: 3px;
  background: white;
  transition: transform 0.3s ease;
}

.donor-crown {
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 1.5rem;
  animation: float 3s ease-in-out infinite;
}

.donor-info h3 {
  color: var(--primary);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
}

.donor-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0.2rem 0;
  color: var(--dark);
}

.donor-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: var(--gray);
}

.stat strong {
  color: var(--primary);
}

.donor-details {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  animation: slideDown 0.3s ease-out;
}

.donor-testimonial {
  font-style: italic;
  color: var(--gray);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.donor-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.badge {
  background: rgba(76, 175, 80, 0.1);
  color: var(--primary);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.donor-speciality {
  font-size: 0.9rem;
}

.speciality-label {
  color: var(--gray);
  margin-right: 0.5rem;
}

.speciality-value {
  color: var(--primary);
  font-weight: 500;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .donor-banner {
    position: relative;
    top: 0;
    right: 0;
    margin: 1rem auto;
    width: calc(100% - 2rem);
  }
}
.wave-animation {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  overflow: hidden;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background: url('data:image/svg+xml,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg"><path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="%23ffffff" opacity="0.1"/></svg>') repeat-x;
  animation: wave 25s linear infinite;
}

.wave:nth-child(2) {
  bottom: 0;
  animation: wave 15s linear reverse infinite;
  opacity: 0.5;
}

.wave:nth-child(3) {
  bottom: 0;
  animation: wave 20s linear infinite;
  opacity: 0.2;
}

@keyframes wave {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.main-content {
  flex: 1;
}

.hero-section {
  padding: 4rem 0;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
}

.hero-text h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.stat-item {
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: #4CAF50;
}

.role-selection {
  padding: 4rem 0;
  background: #f8f9fa;
}

.role-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.role-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.role-card.active {
  border-color: #4CAF50;
  transform: translateY(-5px);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.card-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
  justify-content: center;
}

.card-features span {
  background: #f0f4f8;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.testimonials {
  padding: 4rem 0;
}

.testimonial-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.quote {
  font-size: 4rem;
  color: #4CAF50;
  position: absolute;
  top: -1rem;
  left: 1rem;
  opacity: 0.2;
}

.author {
  display: flex;
  align-items: center;
  margin-top: 2rem;
}

.author-avatar {
  width: 50px;
  height: 50px;
  background: #4CAF50;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 1rem;
}

.footer {
  background: #1a1a1a;
  color: white;
  padding: 4rem 0 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  margin-left: 5rem;
}

.footer-brand h3 {
  color: white;
  margin: 1rem 0 0.5rem;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
}

.link-group h4 {
  color: white;
  margin-bottom: 1rem;
}

.link-group a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.link-group a:hover {
  color: white;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 3rem;
  padding-top: 2rem;
  padding-left: 5rem;
  text-align: center;
}

@media (max-width: 768px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
  
  .role-cards {
    grid-template-columns: 1fr;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .header {
    padding: 3rem 1rem;
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-slide-in {
  animation: slideIn 0.5s ease-out forwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>