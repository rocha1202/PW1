import { defineStore } from "pinia";

export const useMerchStore = defineStore("merchStore", {
  state: () => ({
    items: [], // Lista de itens carregados da API
  }),
  actions: {
    async fetchMerch() {
      try {
        const response = await fetch("https://678e8c6fa64c82aeb120b722.mockapi.io/api/merch");
        if (!response.ok) {
          throw new Error(`Erro ao buscar dados: ${response.statusText}`);
        }
        this.items = await response.json(); // Atualiza os itens no estado da store
      } catch (error) {
        console.error("Erro ao buscar os itens:", error);
      }
    },
  },
});
