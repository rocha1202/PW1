import { defineStore } from "pinia";
import axios from "axios";

export const useArtistStore = defineStore("artist", {
  state: () => ({
    artists: [], // Array de artistas
    loading: false, // Para controlar o estado de carregamento
    error: null, // Para armazenar erros
  }),
  getters: {
    // Getter para obter um artista pelo ID
    getArtistById: (state) => (id) => {
      return state.artists.find((artist) => artist.id === id);
    },
  },
  actions: {
    /**
     * Carrega os artistas da API do Art Institute of Chicago
     *
     * @param {number} page N mero da p gina a ser carregada
     * @param {number} limit N mero de items a serem carregados por p gina
     *
     * @returns {Promise<void>} Uma promessa que   resolvida quando os artistas s o carregados
     *                            ou rejeitada caso ocorra um erro
     */
    async fetchArtists(page = 1, limit = 12) {
      this.loading = true; // Ativa o estado de carregamento
      this.error = null; // Limpa qualquer erro anterior

      try {
        let totalLoaded = 0; // Contador para acompanhar o número de artistas carregados
        const allArtists = []; // Array para armazenar todos os artistas carregados
        const totalPages = Math.ceil(1166 / limit); // Calcula o número total de páginas

        while (totalLoaded < 1166 && page <= totalPages) {
          const response = await axios.get(
            `https://api.artic.edu/api/v1/artists?page=${page}&limit=${limit}`
          );
          if (response.data && response.data.data) {
            allArtists.push(...response.data.data); // Adiciona os artistas da página atual
            totalLoaded += response.data.data.length; // Incrementa o contador de artistas carregados
          } else {
            throw new Error("Dados de artistas não encontrados");
          }

          page++; // Avança para a próxima página
        }

        this.artists = allArtists; // Armazena todos os artistas carregados
      } catch (error) {
        this.error = "Erro ao carregar artistas: " + error.message; // Armazena o erro
        console.error(this.error);
      } finally {
        this.loading = false; // Desativa o estado de carregamento
      }
    },
  },
});
