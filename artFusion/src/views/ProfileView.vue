<template>
  <v-app style="background-color: #0f0a30; color:#F1F9FC;">
    <Navbar />

    <v-container class="fill-height d-flex align-center justify-center">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title class="text-h5">Editar Perfil</v-card-title>
            <v-card-text>
              <!-- Formulário de edição -->
              <v-form v-model="valid">
                <!-- Nome -->
                <v-text-field v-model="profile.name" label="Nome" :rules="[nameRule]" required />

                <!-- Email -->
                <v-text-field v-model="profile.email" label="Email" :rules="[emailRule]" required />

                <!-- Data de Nascimento -->
                <v-text-field v-model="profile.birthdate" label="Data de Nascimento" type="date"
                  :rules="[birthdateRule]" required />

                <!-- Senha -->
                <v-text-field v-model="profile.password" label="Senha" type="password" :rules="[passwordRule]"
                  required />

                

                <!-- Botão de Salvar -->
                <v-btn :disabled="!valid" color="primary" @click="saveProfile">
                  Salvar
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <Footer />

  </v-app>
</template>

<script>
import { useUserStore } from '@/stores/userStore.js'; // Importando o store
import Navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const userStore = useUserStore(); // Usando o store do Pinia
    const profile = userStore.profile; // Acessando os dados do perfil
    const valid = userStore.isValid; // Estado de validade do perfil

    const emailRule = [
      v => /.+@.+\..+/.test(v) || 'O email deve ser válido',
    ];
    const passwordRule = [
      v => v.length >= 6 || 'A senha deve ter pelo menos 6 caracteres',
    ];
    const nameRule = [
      v => !!v || 'O nome é obrigatório',
    ];
    const birthdateRule = [
      v => !!v || 'A data de nascimento é obrigatória',
    ];

    // Atualiza o perfil com os dados do formulário
    function updateProfile() {
      userStore.updateProfile(profile);
      userStore.validateProfile(); // Valida os dados
    }

    function saveProfile() {
      updateProfile();
      if (valid) {
        userStore.saveProfile();
      }
    }

    return {
      profile,
      valid,
      emailRule,
      passwordRule,
      nameRule,
      birthdateRule,
      saveProfile,
    };
  },
};
</script>

<style scoped>
.v-btn {
  margin-top: 20px;
}
</style>
