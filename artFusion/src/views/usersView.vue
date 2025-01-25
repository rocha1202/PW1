<template>
    <v-app style="background-color: #0f0a30;">
        <Navbar />
        <v-container class="fill-height d-flex align-center justify-center">
            <v-card style="width: 100%; max-width: 1200px;">
                <v-card-title>User Management</v-card-title>
                <v-card-subtitle>Manage users registered in the system.</v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text>
                    <v-data-table :items="users" :headers="headers" item-value="id" class="elevation-1" :search="search"
                        fixed-header height="400px">
                        <template v-slot:top>
                            <v-text-field v-model="search" label="Search for users" class="mx-4" clearable
                                prepend-icon="mdi-magnify"></v-text-field>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-btn icon @click="editUser(item)">Edit </v-btn>
                            <v-btn icon color="red" @click="deleteUser(item.id)">Delete </v-btn>
                            <v-btn icon :color="item.isBlocked ? 'green' : 'orange'" @click="blockUser(item.id)">Block
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>

            <!-- Diálogo para edição de usuário -->
            <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                    <v-card-title>User Edition</v-card-title>
                    <v-card-text>
                        <v-form ref="form">
                            <v-text-field v-model="editedUser.name" label="Name" required></v-text-field>
                            <v-text-field v-model="editedUser.email" label="E-mail" required></v-text-field>
                            <v-select v-model="editedUser.role" :items="roles" label="Role" required></v-select>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="dialog = false">Cancel</v-btn>
                        <v-btn color="primary" @click="saveUser">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>

        <Footer />
    </v-app>
</template>

<script>
import { useUserStore } from "@/stores/userStore";
import Navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";

export default {
    name: "UsersView",
    components: {
        Navbar,
        Footer,
    },
    data() {
        return {
            search: "",
            dialog: false,
            editedUser: {}, // Usuário sendo editado
            headers: [
                { text: "ID", value: "id" },
                { text: "Nome", value: "name" },
                { text: "E-mail", value: "email" },
                { text: "Papel", value: "role" },
                { text: "Ações", value: "actions", sortable: false },
            ],
            roles: ["user", "organizer", "admin"], // Papéis disponíveis
        };
    },
    computed: {
        users() {
            const userStore = useUserStore();
            return userStore.getAccounts;
        },
    },
    methods: {
        editUser(user) {
            this.editedUser = { ...user }; // Clona o usuário para edição
            this.dialog = true;
        },
        saveUser() {
            const userStore = useUserStore();
            userStore.updateProfile(this.editedUser); // Atualiza o usuário na store
            this.dialog = false;
        },
        deleteUser(userId) {
            const userStore = useUserStore();
            const user = userStore.getUserById(userId);
            if (user) {
                if (confirm(`Are you sure you want to delete the user ${user.name}?`)) {
                    userStore.deleteUser(userId); // Remove da store
                }
            }
        },
        blockUser(userId) {
            const userStore = useUserStore();
            const user = userStore.getUserById(userId);
            if (user) {
                userStore.blockUser(userId); // Alterna o estado da store
                alert(
                    `User ${user.name} was ${user.isBlocked ? "blocked" : "unblocked"}.`
                );
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.fill-height {
    height: calc(100vh - 64px);
}

.v-container {
    margin-top: 50px;
}

.v-card {
    margin-bottom: 20px;
}
</style>