<template>
  <v-app style="background-color: #0f0a30; color:#F1F9FC;">
    <Navbar />

    <v-container class="fill-height d-flex align-center justify-center">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title class="text-h5">Edit Profile</v-card-title>
            <v-card-text>
              <!-- Formulário de edição -->
              <v-form v-model="valid">
                <!-- Nome -->
                <v-text-field v-model="localProfile.name" label="Name" :rules="[nameRule]" required />

                <!-- Email -->
                <v-text-field v-model="localProfile.email" label="Email" :rules="[emailRule]" required />

                <!-- Data de Nascimento -->
                <v-text-field v-model="localProfile.birthdate" label="Date of birth" type="date"
                  :rules="[birthdateRule]" required />

                <!-- Senha -->
                <v-text-field v-model="localProfile.password" label="Password" type="password" :rules="[passwordRule]"
                  required />

                <!-- Botão de Salvar -->
                <v-btn :disabled="!valid" color="primary" @click="saveProfile">
                  Save
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
import { useUserStore } from "@/stores/userStore.js"; // Importando o store
import Navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";
import { reactive, ref } from "vue";

export default {
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const userStore = useUserStore(); // Usando o store do Pinia
    const localProfile = reactive({ ...userStore.profile }); // Cria uma cópia reativa do perfil
    const valid = ref(false); // Estado de validade do formulário

    const emailRule = [
      (v) => /.+@.+\..+/.test(v) || "O email deve ser válido",
    ];
    const passwordRule = [
      (v) => v.length >= 6 || "A senha deve ter pelo menos 6 caracteres",
    ];
    const nameRule = [
      (v) => !!v || "O nome é obrigatório",
    ];
    const birthdateRule = [
      (v) => !!v || "A data de nascimento é obrigatória",
    ];

    // Atualiza o perfil no store
    function saveProfile() {
      try {
        // Aqui o ID é implicitamente o do usuário logado, porque 'userStore.profile' já tem o ID do usuário logado
        userStore.updateProfile(localProfile); // Passa os dados atualizados para o store
        alert("Perfil atualizado com sucesso!");
      } catch (error) {
        alert("Erro ao atualizar o perfil: " + error.message);
      }
    }

    return {
      localProfile,
      valid,
      emailRule,
      passwordRule,
      nameRule,
      birthdateRule,
      saveProfile,
    };
  }

};
</script>

<style scoped>
.v-btn {
  margin-top: 20px;
}
</style>
