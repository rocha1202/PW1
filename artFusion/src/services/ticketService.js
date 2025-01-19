import { useApiStore } from "../stores/apiStore";

async function updateArtistNames(tickets) {
  const apiStore = useApiStore(); // Obter a store
  const updatedTickets = [];

  for (const ticket of tickets) {
    try {
      // Supondo que `artist` seja o nome ou ID do artista (ajustar conforme a API)
      const artistId = ticket.artist.split(" ").pop(); // Extraindo ID se aplicável
      await apiStore.fetchArtistById(artistId); // Buscar detalhes
      const artistDetails = apiStore.getArtistDetails;

      if (artistDetails) {
        // Atualizar nome do artista
        ticket.artist = artistDetails.title || ticket.artist; // Usar título retornado ou o nome original
      }
    } catch (error) {
      console.error(`Erro ao buscar artista para o ticket ${ticket.id}:`, error);
    }

    updatedTickets.push(ticket);
  }

  return updatedTickets;
}

// Exemplo de uso
(async () => {
  const tickets = [ /* JSON acima */ ];
  const ticketsWithUpdatedArtists = await updateArtistNames(tickets);
  console.log(ticketsWithUpdatedArtists);
})();
