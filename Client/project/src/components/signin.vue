<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const showPassword = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  try {
    // Effectuer l'appel API pour la connexion
    const response = await axios.post('/api/signup', {
      email: email.value,
      password: password.value,
    })
   console.log(response.data) // Affiche les données reçues de l'API
    
  } catch (error) {
    console.error('Erreur lors de la connexion:', error)
    // Gérer l'erreur, afficher un message, etc.
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="signin-container">
    <div class="signin-background">
      <div class="animated-circles">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
    </div>
    
    <div class="signin-content">
      <div class="signin-header">
        <div class="logo-container animate-float">
          <div class="logo-circle">
            <span class="logo-icon">🤝</span>
          </div>
          <h1>Solidarité<span class="accent">Connect</span></h1>
        </div>
        <p class="welcome-text">Bienvenue dans votre espace personnel</p>
      </div>

      <form @submit.prevent="handleSubmit" class="signin-form">
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <div class="input-container">
            <input 
              id="email"
              v-model="email"
              type="email"
              class="form-input"
              placeholder="votre@email.com"
              required
            >
            <span class="input-icon">✉️</span>
          </div>
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Mot de passe</label>
          <div class="input-container">
            <input 
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="form-input"
              placeholder="Votre mot de passe"
              required
            >
            <button 
              type="button"
              class="password-toggle"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>
        </div>

        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox">
            <span>Se souvenir de moi</span>
          </label>
          <a href="#" class="forgot-password">Mot de passe oublié ?</a>
        </div>

        <button 
          type="submit" 
          class="submit-button"
          :class="{ loading: isLoading }"
           @click="handleSubmit"

        >
          <span class="button-text">{{ isLoading ? 'Connexion...' : 'Se connecter' }}</span>
          <span class="button-loader"></span>
        </button>
      </form>

      <div class="signin-footer">
        <p>Pas encore membre ?</p>
        <a href="#" class="register-link">Créer un compte</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signin-container {
  min-height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
}

.signin-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  z-index: 0;
}

.animated-circles {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circle {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 20s infinite;
}

.circle:nth-child(1) {
  width: 300px;
  height: 300px;
  top: -150px;
  right: -150px;
  animation-delay: 0s;
}

.circle:nth-child(2) {
  width: 500px;
  height: 500px;
  bottom: -250px;
  left: -250px;
  animation-delay: -5s;
}

.circle:nth-child(3) {
  width: 200px;
  height: 200px;
  top: 50%;
  right: 10%;
  animation-delay: -10s;
}

.signin-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 440px;
  margin: auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.signin-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo-container {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}

.logo-circle {
  width: 60px;
  height: 60px;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.logo-icon {
  font-size: 2rem;
}

h1 {
  font-size: 2rem;
  color: var(--dark);
  margin: 0;
}

.accent {
  color: var(--primary);
}

.welcome-text {
  color: var(--gray);
  font-size: 1.1rem;
  margin-top: 0.5rem;
}

.signin-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.9rem;
  color: var(--gray);
  font-weight: 500;
}

.input-container {
  position: relative;
}

.form-input {
  width: 90%;
  padding: 1rem;
  padding-right: 3rem;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.form-input:focus {
  border-color: var(--primary);
  outline: none;
  box-shadow: 0 0 0 4px rgba(76, 175, 80, 0.1);
}

.input-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  opacity: 0.5;
}

.password-toggle {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 1.2rem;
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.password-toggle:hover {
  opacity: 1;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.forgot-password {
  color: var(--primary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: var(--primary-light);
}

.submit-button {
  position: relative;
  width: 100%;
  padding: 1rem;
  background: rgba(235, 234, 213, 0.856) ;
  color: rgba(109, 108, 49, 0.856);
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.submit-button:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
}

.submit-button.loading .button-text {
  opacity: 0;
}

.submit-button.loading .button-loader {
  opacity: 1;
}

.button-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s infinite linear;
  opacity: 0;
}

@keyframes spin {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

.signin-footer {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
}

.register-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
  margin-left: 0.5rem;
  transition: color 0.3s ease;
}

.register-link:hover {
  color: var(--primary-light);
}

@media (max-width: 480px) {
  .signin-content {
    padding: 1.5rem;
    margin: 1rem;
    border-radius: 16px;
  }

  h1 {
    font-size: 1.75rem;
  }

  .welcome-text {
    font-size: 1rem;
  }
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(5%, 5%);
  }
  50% {
    transform: translate(10%, -5%);
  }
  75% {
    transform: translate(-5%, 5%);
  }
}
</style>