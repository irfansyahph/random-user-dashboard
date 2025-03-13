<template>
  <div class="animate-pulse space-y-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
        <div class="space-y-2">
          <div class="h-6 bg-gray-300 rounded w-16"></div>
          <div class="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div class="w-12 h-12 bg-gray-300 rounded-full"></div>
      </div>
      <div class="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
        <div class="space-y-2">
          <div class="h-6 bg-gray-300 rounded w-16"></div>
          <div class="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div class="w-12 h-12 bg-gray-300 rounded-full"></div>
      </div>
      <div class="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
        <div class="space-y-2">
          <div class="h-6 bg-gray-300 rounded w-16"></div>
          <div class="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div class="w-12 h-12 bg-gray-300 rounded-full"></div>
      </div>
      <div class="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
        <div class="space-y-2">
          <div class="h-6 bg-gray-300 rounded w-16"></div>
          <div class="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div class="w-12 h-12 bg-gray-300 rounded-full"></div>
      </div>
    </div>
    <div class="space-y-2">
      <div v-for="index in 5" :key="index" class="h-12 bg-gray-300 rounded w-full"></div>
    </div>
  </div>
</template>
