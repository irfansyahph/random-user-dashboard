<script setup>
import { onMounted, computed, ref } from "vue";
import { useUserStore } from "../stores/userStore";
import SkeletonLoader from "@/components/loaders/SkeletonLoader.vue";

const userStore = useUserStore();
const users = computed(() => userStore.users);
const stats = computed(() => userStore.stats);
const isLoading = ref(true);
const errorMessage = ref("");

onMounted(async () => {
  try {
    await userStore.fetchUsers();
  } catch (error) {
    errorMessage.value = "Failed to load data. Please try again later.";
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen flex flex-col p-4 sm:p-6 bg-gray-100">
    <div class="mb-4 font-bold text-lg">Member Dashboard</div>

    <div v-if="isLoading">
      <SkeletonLoader />
    </div>
    <div v-else-if="errorMessage" class="text-red-500 text-center py-4">
      {{ errorMessage }}
    </div>
    <div v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div class="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <h3 class="text-xl font-bold">{{ stats.totalNationalities }}</h3>
            <p class="text-gray-400 text-sm">Different Nationality</p>
          </div>
          <div class="flex items-center justify-center w-12 h-12">
            <FontAwesomeIcon :icon="['fas', 'flag']" class="text-4xl text-black" />
          </div>
        </div>

        <div class="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <h3 class="text-xl font-bold capitalize">{{ stats.mostGender }}</h3>
            <p class="text-gray-400 text-sm">Most Gender</p>
          </div>
          <div class="flex items-center justify-center w-12 h-12">
            <FontAwesomeIcon
              :icon="['fas', stats.mostGender.toLowerCase() === 'female' ? 'venus' : 'mars']"
              class="text-4xl text-black"
            />
          </div>
        </div>

        <div class="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <h3 class="text-xl font-bold">~{{ stats.averageAge }}</h3>
            <p class="text-gray-400 text-sm">Average Age</p>
          </div>
          <div class="flex items-center justify-center w-12 h-12">
            <FontAwesomeIcon :icon="['fas', 'walking']" class="text-4xl text-black" />
          </div>
        </div>

        <div class="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <h3 class="text-xl font-bold">~{{ stats.averageMembership }} year</h3>
            <p class="text-gray-400 text-sm">Average Membership</p>
          </div>
          <div class="flex items-center justify-center w-12 h-12">
            <FontAwesomeIcon :icon="['fas', 'users']" class="text-4xl text-black" />
          </div>
        </div>
      </div>

      <div class="sm:p-6 flex-grow overflow-auto">
        <table class="w-full table-auto">
          <tbody>
            <tr v-for="(user, index) in users" :key="index">
              <td class="p-2 min-w-[56px]">
                <img
                  class="rounded-full"
                  :src="user.picture.thumbnail"
                  :alt="'image' + user.name.first"
                  width="40"
                  height="40"
                />
              </td>
              <td class="p-2">
                <div>{{ user.name.first }} {{ user.name.last }}</div>
                <div class="text-gray-400 text-sm">{{ user.email }}</div>
              </td>
              <td class="p-2">{{ user.dob.age }}</td>
              <td class="p-2">
                <span
                  :class="
                    user.gender === 'male' ? 'bg-blue-600 opacity-50' : 'bg-pink-500 opacity-50'
                  "
                  class="text-white px-2 py-1 rounded"
                >
                  {{ user.gender }}
                </span>
              </td>
              <td class="p-2 min-w-[40px]">
                <img
                  :src="`https://flagcdn.com/16x12/${user.nat.toLowerCase()}.png`"
                  width="24"
                  height="24"
                  :alt="user.nat"
                />
              </td>
              <td class="p-2 text-nowrap">
                {{ user.location.street.name }} {{ user.location.street.number }},
                {{ user.location.city }}, {{ user.location.country }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
