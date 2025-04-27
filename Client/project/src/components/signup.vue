<template>
    <div class="registration-page">
      <div class="content-wrapper">
        <!-- Left Panel - Company Info -->
        <div class="info-panel">
          <div class="info-content">
            <h1>Bienvenue à SolidaritéConnect</h1>
            <p>Your forever Partner</p>
            
            <div class="features">
              <div class="feature">
                <Truck class="feature-icon" />
                <span>🌍 Facilité d'accès</span>
              </div>
              <div class="feature">
                <Warehouse class="feature-icon" />
                <span>🤝 Solidarité locale</span>
              </div>
              <div class="feature">
                <Route class="feature-icon" />
                <span>♻️ Anti-gaspi </span>
              </div>
              <div class="feature">
                <Clock class="feature-icon" />
                <span>🆓 Gratuité</span>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Right Panel - Registration Form -->
        <div class="form-panel">
          <form @submit.prevent="handleSubmit" class="registration-form">
            <!-- Logo Upload -->
            <div class="logo-section">
              <input
                type="file"
                ref="logoInput"
                @change="handleFileUpload"
                accept="image/*"
                class="hidden"
                id="logo-upload"
              />
              <label for="logo-upload" class="logo-upload">
                <template v-if="logoPreview">
                  <img :src="logoPreview" alt="Preview" class="logo-preview" />
                </template>
                <template v-else>
                  <div class="upload-placeholder">
                    <Upload class="upload-icon" />
                    <span>Upload Logo</span>
                  </div>
                </template>
              </label>
              <button
                v-if="logoPreview"
                type="button"
                @click="removeImage"
                class="remove-logo"
              >
                <X class="remove-icon" />
              </button>
            </div>
  
            <!-- Form Fields -->
            <div class="fields-grid">
              <div class="field-group">
                <Building2 class="field-icon" />
                <input
                  type="text"
                  v-model="formData.FirstName"
                  placeholder="First Name"
                  required
                />
              </div>
  
              <div class="field-group">
                <Phone class="field-icon" />
                <input
                  type="tel"
                  v-model="formData.LastName"
                  placeholder="Last Name"
                  required
                />
              </div>
  
            
  
              <div class="field-group full-width">
                <MapPin class="field-icon" />
                <input
                  type="text"
                  v-model="formData.phoneNumber"
                  placeholder="Phone Number"
                  required
                />
              </div>
  
              <div class="field-group">
                <Mail class="field-icon" />
                <input
                  type="email"
                  v-model="formData.email"
                  placeholder="Email Address"
                  required
                />
              </div>
  
              <div class="field-group">
                <Lock class="field-icon" />
                <input
                  type="password"
                  v-model="formData.password"
                  placeholder="Password"
                  required
                />
              </div>
  
              <div class="field-group">
                <Lock class="field-icon" />
                <input
                  type="password"
                  v-model="formData.confirmPassword"
                  placeholder="Confirm Password"
                  required
                  :class="{ 'error': passwordMismatch }"
                />
              </div>
            </div>
  
            <!-- Form Actions -->
            <div class="form-actions">
              <button
                type="submit"
                :disabled="isSubmitting "
                class="submit-button"
              >
                <CheckCircle class="button-icon" />
                {{ isSubmitting ? 'Processing...' : 'Complete Registration' }}
              </button>
              <button
                type="button"
                @click="resetForm"
                class="reset-button"
              >
                <RotateCcw class="button-icon" />
                Reset
              </button>
            </div>
          </form>
  
          <!-- Messages -->
          <div v-if="errorMessage" class="message error">
            {{ errorMessage }}
            <button @click="errorMessage = ''" class="message-close">
              <X />
            </button>
          </div>
  
          <div v-if="successMessage" class="message success">
            {{ successMessage }}
            <button @click="successMessage = ''" class="message-close">
              <X />
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import axios from 'axios';
  
  // Configuration de l'API
  const api = axios.create({
    baseURL: 'http://localhost:3000/api' // Remplacez par votre URL d'API
  });
  
  interface FormData {
    FirstName : string;
    phoneNumber: string;
    LastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    logo?: File;
  }
  
  const formData = ref<FormData>({
    FirstName: '',
    phoneNumber: '',
    LastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const logoPreview = ref('');
  const isSubmitting = ref(false);
  const isLoading = ref(false);
  const errorMessage = ref('');
  const successMessage = ref('');
  const logoInput = ref<HTMLInputElement | null>(null);
  
  const passwordMismatch = computed(() => {
    return formData.value.password !== formData.value.confirmPassword && 
           formData.value.confirmPassword.length > 0;
  });
  
  
  const handleFileUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      formData.value.logo = file;
      logoPreview.value = URL.createObjectURL(file);
    }
  };
  
  const removeImage = () => {
    formData.value.logo = undefined;
    logoPreview.value = '';
    if (logoInput.value) logoInput.value.value = '';
  };
  
const handleSubmit = async () => {
  isLoading.value = true
  try {
    // Effectuer l'appel API pour la connexion
    const response = await axios.post('/api/signup', {
      email: formData.value.email,
      password: formData.value.password,
    })
   console.log(response.data) // Affiche les données reçues de l'API
    
  } catch (error) {
    console.error('Erreur lors de la connexion:', error)
    // Gérer l'erreur, afficher un message, etc.
  } finally {
    isLoading.value = false
  }
}
  
  const resetForm = () => {
    formData.value = {
      FirstName: '',
      LastName: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    removeImage();
    errorMessage.value = '';
  };
  </script>
  
  <style scoped>
  .registration-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);
    font-family: system-ui, -apple-system, sans-serif;
  }
  
  .content-wrapper {
    display: grid;
    grid-template-columns: 35% 65%;
    max-width: 1400px;
    margin: 0 auto;
    min-height: 100vh;
  }
  
  /* Left Panel Styles */
  .info-panel {
    background: linear-gradient(135deg, #efe8d0 0%, #ab934d 100%);
    padding: 3rem;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .info-content {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .info-content h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  .info-content p {
    font-size: 1.2rem;
    opacity: 0.9;
    margin-bottom: 2rem;
  }
  
  .features {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .feature {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .feature-icon {
    width: 24px;
    height: 24px;
    color: #60a5fa;
  }
  
  /* Right Panel Styles */
  .form-panel {
    background: white;
    padding: 3rem;
    overflow-y: auto;
  }
  
  .registration-form {
    max-width: 800px;
    margin: 0 auto;
  }
  
  /* Logo Upload Styles */
  .logo-section {
    width: 150px;
    height: 150px;
    margin: 0 auto 2rem;
    position: relative;
  }
  
  .logo-upload {
    width: 100%;
    height: 100%;
    border: 2px dashed #c0a569;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
    background: white;
    transition: all 0.3s ease;
  }
  
  .logo-upload:hover {
    border-color: #cac890;
    background: #f0f9ff;
  }
  
  .upload-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: #c56741;
  }
  
  .upload-icon {
    width: 32px;
    height: 32px;
  }
  
  .logo-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .remove-logo {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
  }
  
  .remove-logo:hover {
    background: #dc2626;
  }
  
  .remove-icon {
    width: 16px;
    height: 16px;
  }
  
  /* Form Fields Styles */
  .fields-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .field-group {
    position: relative;
  }
  
  .field-group.full-width {
    grid-column: span 2;
  }
  
  .field-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    color: #64748b;
  }
  
  .field-group input,
  .field-group select {
    width: 80%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.95rem;
    background: white;
    transition: all 0.3s ease;
  }
  
  .field-group input:focus,
  .field-group select:focus {
    border-color: #60a5fa;
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
    outline: none;
  }
  
  .field-group input.error {
    border-color: #ef4444;
  }
  
  /* Form Actions */
  .form-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
  
  .submit-button,
  .reset-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .submit-button {
    background: #8b6a21;
    color: white;
    border: none;
  }
  
  .submit-button:hover:not(:disabled) {
    background: #1d4ed8;
    transform: translateY(-1px);
  }
  
  .submit-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  .reset-button {
    background: white;
    color: #64748b;
    border: 1px solid #e2e8f0;
  }
  
  .reset-button:hover {
    background: #f8fafc;
    border-color: #60a5fa;
    color: #2563eb;
  }
  
  .button-icon {
    width: 20px;
    height: 20px;
  }
  
  /* Messages */
  .message {
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .message.error {
    background: #fef2f2;
    color: #dc2626;
    border-left: 4px solid #dc2626;
  }
  
  .message.success {
    background: #f0fdf4;
    color: #16a34a;
    border-left: 4px solid #16a34a;
  }
  
  .message-close {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
  }
  
  .hidden {
    display: none;
  }
  
  /* Responsive Design */
  @media (max-width: 1024px) {
    .content-wrapper {
      grid-template-columns: 1fr;
    }
  
    .info-panel {
      display: none;
    }
  
    .form-panel {
      padding: 2rem;
    }
  
    .fields-grid {
      grid-template-columns: 1fr;
    }
  
    .field-group.full-width {
      grid-column: auto;
    }
  
    .form-actions {
      flex-direction: column;
    }
  
    .submit-button,
    .reset-button {
      width: 100%;
      justify-content: center;
    }
  }
  </style>