<script setup lang="ts">
import { ref } from 'vue'

interface Request {
  id: number
  requester: string
  type: string
  description: string
  status: 'pending' | 'accepted' | 'completed'
  date: string
}

interface Product {
  id: number
  name: string
  description: string
  category: string
  quantity: number
  image: string
}

const activeTab = ref('requests')
const showAddProduct = ref(false)

const requests = ref<Request[]>([
  {
    id: 1,
    requester: "Sophie Martin",
    type: "Aide alimentaire",
    description: "Besoin de produits alimentaires de base pour une famille de 4 personnes",
    status: "pending",
    date: "2024-03-15"
  },
  {
    id: 2,
    requester: "Lucas Bernard",
    type: "Matériel scolaire",
    description: "Recherche des fournitures scolaires pour la rentrée",
    status: "accepted",
    date: "2024-03-14"
  }
])

const products = ref<Product[]>([
  {
    id: 1,
    name: "Panier alimentaire",
    description: "Panier contenant des produits alimentaires de base",
    category: "Alimentation",
    quantity: 5,
    image: "https://images.pexels.com/photos/2611810/pexels-photo-2611810.jpeg?auto=compress&cs=tinysrgb&w=300"
  }
])

const newProduct = ref({
  name: '',
  description: '',
  category: '',
  quantity: 1,
  image: ''
})

const handleRequest = (requestId: number, action: 'accept' | 'complete') => {
  const request = requests.value.find(r => r.id === requestId)
  if (request) {
    request.status = action === 'accept' ? 'accepted' : 'completed'
  }
}

const addProduct = () => {
  products.value.push({
    id: products.value.length + 1,
    ...newProduct.value
  })
  showAddProduct.value = false
  newProduct.value = {
    name: '',
    description: '',
    category: '',
    quantity: 1,
    image: ''
  }
}
</script>

<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>Tableau de Bord Donneur</h1>
      <div class="tabs">
        <button 
          :class="['tab-btn', { active: activeTab === 'requests' }]"
          @click="activeTab = 'requests'"
        >
          Demandes
        </button>
        <button 
          :class="['tab-btn', { active: activeTab === 'products' }]"
          @click="activeTab = 'products'"
        >
          Mes Produits
        </button>
      </div>
    </header>

    <main class="dashboard-content">
      <!-- Requests Tab -->
      <div v-if="activeTab === 'requests'" class="requests-section">
        <div class="requests-grid">
          <div v-for="request in requests" :key="request.id" class="request-card">
            <div class="request-header">
              <span :class="['status-badge', request.status]">{{ request.status }}</span>
              <span class="request-date">{{ request.date }}</span>
            </div>
            <h3>{{ request.requester }}</h3>
            <p class="request-type">{{ request.type }}</p>
            <p class="request-description">{{ request.description }}</p>
            <div class="request-actions">
              <button 
                v-if="request.status === 'pending'"
                @click="handleRequest(request.id, 'accept')"
                class="btn-accept"
              >
                Accepter
              </button>
              <button 
                v-if="request.status === 'accepted'"
                @click="handleRequest(request.id, 'complete')"
                class="btn-complete"
              >
                Marquer comme terminé
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Products Tab -->
      <div v-if="activeTab === 'products'" class="products-section">
        <button 
          class="add-product-btn"
          @click="showAddProduct = true"
        >
          + Ajouter un produit
        </button>

        <div class="products-grid">
          <div v-for="product in products" :key="product.id" class="product-card">
            <img :src="product.image" :alt="product.name" class="product-image">
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="product-category">{{ product.category }}</p>
              <p class="product-description">{{ product.description }}</p>
              <div class="product-quantity">
                Quantité disponible: {{ product.quantity }}
              </div>
            </div>
          </div>
        </div>

        <!-- Add Product Modal -->
        <div v-if="showAddProduct" class="modal-overlay">
          <div class="modal">
            <h2>Ajouter un nouveau produit</h2>
            <form @submit.prevent="addProduct" class="add-product-form">
              <div class="form-group">
                <label>Nom du produit</label>
                <input v-model="newProduct.name" required>
              </div>
              <div class="form-group">
                <label>Description</label>
                <textarea v-model="newProduct.description" required></textarea>
              </div>
              <div class="form-group">
                <label>Catégorie</label>
                <input v-model="newProduct.category" required>
              </div>
              <div class="form-group">
                <label>Quantité</label>
                <input type="number" v-model="newProduct.quantity" min="1" required>
              </div>
              <div class="form-group">
                <label>Image URL</label>
                <input type="url" v-model="newProduct.image" required>
              </div>
              <div class="modal-actions">
                <button type="button" @click="showAddProduct = false" class="btn-cancel">
                  Annuler
                </button>
                <button type="submit" class="btn-submit">
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 2rem;
}

.dashboard-header {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  margin: 0 0 1.5rem;
  color: #1a1a1a;
}

.tabs {
  display: flex;
  gap: 1rem;
  border-bottom: 2px solid #eee;
  padding-bottom: 1rem;
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  color: #666666;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.tab-btn.active {
  background: #4CAF50;
  color: white;
}

/* Requests Styles */
.requests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.request-card {
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.request-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-badge.pending {
  background: #fff3cd;
  color: #856404;
}

.status-badge.accepted {
  background: #d4edda;
  color: #155724;
}

.status-badge.completed {
  background: #cce5ff;
  color: #004085;
}

.request-date {
  color:#666666;
  font-size: 0.875rem;
}

.request-type {
  color:#4CAF50;
  font-weight: 500;
  margin: 0.5rem 0;
}

.request-description {
  color:#666666;
  margin-bottom: 1rem;
}

.request-actions {
  display: flex;
  gap: 1rem;
}

.btn-accept, .btn-complete {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-accept {
  background: #4CAF50;
  color: white;
}

.btn-complete {
  background: var(--secondary);
  color: white;
}

/* Products Styles */
.products-section {
  position: relative;
}

.add-product-btn {
  position: absolute;
  top: -4rem;
  right: 0;
  padding: 0.75rem 1.5rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 1.5rem;
}

.product-category {
  color: #4CAF50;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0.5rem 0;
}

.product-description {
  color:#666666;
  margin-bottom: 1rem;
}

.product-quantity {
  font-weight: 500;
  color: #1a1a1a;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.add-product-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color:#1a1a1a;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

.btn-cancel,
.btn-submit {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-cancel {
  background: #eee;
  color: var(--gray);
}

.btn-submit {
  background:#4CAF50;
  color: white;
}

@media (max-width: 768px) {
  .dashboard {
    padding: 1rem;
  }
  
  .requests-grid,
  .products-grid {
    grid-template-columns: 1fr;
  }
  
  .add-product-btn {
    position: static;
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>