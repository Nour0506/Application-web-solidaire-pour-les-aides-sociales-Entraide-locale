<script setup lang="ts">
import { computed, ref } from 'vue';
import type { HelpPost, HelpCategory } from '../types';

const props = defineProps<{
  posts: HelpPost[]
}>();

const selectedType = ref<'all' | 'offer' | 'request'>('all');
const selectedCategory = ref<'all' | HelpCategory>('all');

const filteredPosts = computed(() => {
  return props.posts.filter(post => {
    const typeMatch = selectedType.value === 'all' || post.type === selectedType.value;
    const categoryMatch = selectedCategory.value === 'all' || post.category === selectedCategory.value;
    return typeMatch && categoryMatch;
  });
});
</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <div class="mb-6 flex gap-4">
      <select v-model="selectedType" class="p-2 border rounded">
        <option value="all">Tous les types</option>
        <option value="offer">Offres d'aide</option>
        <option value="request">Demandes d'aide</option>
      </select>

      <select v-model="selectedCategory" class="p-2 border rounded">
        <option value="all">Toutes les catégories</option>
        <option value="clothing">Vêtements</option>
        <option value="food">Repas</option>
        <option value="services">Services</option>
        <option value="other">Autre</option>
      </select>
    </div>

    <div class="grid gap-4">
      <div 
        v-for="post in filteredPosts" 
        :key="post.id"
        class="bg-white p-4 rounded-lg shadow"
      >
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-xl font-semibold">{{ post.title }}</h3>
          <span 
            :class="{
              'bg-green-100 text-green-800': post.type === 'offer',
              'bg-blue-100 text-blue-800': post.type === 'request'
            }"
            class="px-2 py-1 rounded text-sm"
          >
            {{ post.type === 'offer' ? 'Offre' : 'Demande' }}
          </span>
        </div>
        <p class="text-gray-600 mb-2">{{ post.description }}</p>
        <div class="flex gap-2 text-sm text-gray-500">
          <span>{{ post.category }}</span>
          <span>•</span>
          <span>{{ post.location }}</span>
        </div>
      </div>
    </div>
  </div>
</template>