<script setup lang="ts">
import { ref } from 'vue';
import type { HelpPost, HelpCategory } from '../types';

const emit = defineEmits<{
  (event: 'submit', post: Omit<HelpPost, 'id' | 'createdAt'>): void
}>();

const type = ref<'offer' | 'request'>('offer');
const title = ref('');
const description = ref('');
const category = ref<HelpCategory>('other');
const location = ref('');

const categories: HelpCategory[] = ['clothing', 'food', 'services', 'other'];

const submitForm = () => {
  emit('submit', {
    type: type.value,
    title: title.value,
    description: description.value,
    category: category.value,
    location: location.value,
  });
  
  // Reset form
  title.value = '';
  description.value = '';
  category.value = 'other';
  location.value = '';
};
</script>

<template>
  <form @submit.prevent="submitForm" class="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
    <div class="mb-6">
      <label class="block mb-2">Type d'annonce</label>
      <div class="flex gap-4">
        <label class="flex items-center">
          <input type="radio" v-model="type" value="offer" class="mr-2">
          Je propose une aide
        </label>
        <label class="flex items-center">
          <input type="radio" v-model="type" value="request" class="mr-2">
          J'ai besoin d'aide
        </label>
      </div>
    </div>

    <div class="mb-4">
      <label class="block mb-2">Titre</label>
      <input 
        v-model="title" 
        required
        class="w-full p-2 border rounded"
        placeholder="Titre de votre annonce"
      >
    </div>

    <div class="mb-4">
      <label class="block mb-2">Catégorie</label>
      <select v-model="category" class="w-full p-2 border rounded">
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat.charAt(0).toUpperCase() + cat.slice(1) }}
        </option>
      </select>
    </div>

    <div class="mb-4">
      <label class="block mb-2">Localisation</label>
      <input 
        v-model="location" 
        required
        class="w-full p-2 border rounded"
        placeholder="Votre ville"
      >
    </div>

    <div class="mb-4">
      <label class="block mb-2">Description</label>
      <textarea 
        v-model="description"
        required
        rows="4"
        class="w-full p-2 border rounded"
        placeholder="Décrivez votre offre ou demande d'aide"
      ></textarea>
    </div>

    <button 
      type="submit"
      class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
    >
      Publier l'annonce
    </button>
  </form>
</template>