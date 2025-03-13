import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [],
    stats: {
      totalNationalities: 0,
      mostGender: "",
      averageAge: 0,
      averageMembership: 0,
    },
  }),
  actions: {
    async fetchUsers() {
      try {
        const apiBaseUrl = import.meta.env.VITE_RANDOM_USER_BASE_URL;
        const response = await axios.get(`${apiBaseUrl}/?results=25`);

        this.users = response.data.results;

        // Total Nationalities
        const nationalities = [...new Set(this.users.map((u) => u.nat))].length;

        // Most Gender
        const genderCount = this.users.reduce((acc, user) => {
          acc[user.gender] = (acc[user.gender] || 0) + 1;
          return acc;
        }, {});

        const mostGender = Object.keys(genderCount).reduce((a, b) =>
          genderCount[a] > genderCount[b] ? a : b
        );

        // Average Age
        const averageAge =
          this.users.reduce((sum, user) => sum + user.dob.age, 0) / this.users.length;

        // Average Membership
        const currentDate = new Date();
        const totalMembershipYears = this.users.reduce((sum, user) => {
          const registeredDate = new Date(user.registered.date);
          const membershipDuration = (currentDate - registeredDate) / (1000 * 60 * 60 * 24 * 365);
          return sum + membershipDuration;
        }, 0);
        const averageMembership = totalMembershipYears / this.users.length;

        this.stats = {
          totalNationalities: nationalities,
          mostGender,
          averageAge: Math.round(averageAge),
          averageMembership: Math.round(averageMembership),
        };
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
  },
});
