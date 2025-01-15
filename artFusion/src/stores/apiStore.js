import { defineStore } from "pinia";
import * as api from "../api/api";

const ART_API_BASE_URL = 'https://api.artic.edu/api/v1';

export const useApiStore = defineStore("api", {
  state: () => ({
    artistDetails: null, // Store artist details here
  }),
  getters: {
    getArtistDetails: (state) => state.artistDetails, // Getter for artist details
  },
  actions: {
    async fetchArtistById(artistId) {
      try {
        // Make a GET request to fetch the artist details by ID
        const data = await api.get(ART_API_BASE_URL, `artists/${artistId}`);
        this.artistDetails = data.data; // Store the artist details in the state
      } catch (error) {
        console.error("Error fetching artist details:", error);
        throw error;
      }
    },
  },
});
