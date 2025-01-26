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
                        show-select :footer-props="{ itemsPerPageText: '', showCurrentPage: false, itemsPerPage: 0 }">
                        <template v-slot:top>
                            <v-text-field v-model="search" label="Search for users" class="mx-4" clearable
                                prepend-icon="mdi-magnify"></v-text-field>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <span class="action-text" @click="editUser(item)" @mouseover="hoveredAction = 'edit'"
                                @mouseleave="hoveredAction = null"
                                :style="{ color: hoveredAction === 'edit' ? '#2196f3' : '#000' }">
                                Edit
                            </span>
                            |
                            <span class="action-text" @click="deleteUser(item.id)" @mouseover="hoveredAction = 'delete'"
                                @mouseleave="hoveredAction = null"
                                :style="{ color: hoveredAction === 'delete' ? 'red' : '#000' }">
                                Delete
                            </span>
                            |
                            <span class="action-text" @click="blockUser(item.id)" @mouseover="hoveredAction = 'block'"
                                @mouseleave="hoveredAction = null" :style="{
                                    color: item.isBlocked
                                        ? hoveredAction === 'block'
                                            ? 'darkgreen'
                                            : 'green'
                                        : hoveredAction === 'block'
                                            ? 'darkorange'
                                            : 'orange'
                                }">
                                {{ item.isBlocked ? "Unblock" : "Block" }}
                            </span>
                        </template>
                    </v-data-table>

                    <!-- Controles de paginação -->
                    <v-pagination v-model="page" :length="pageCount" total-visible="5" color="primary"
                        class="mt-4"></v-pagination>
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
            hoveredAction: null,
            editedUser: {},
            headers: [
                { text: "ID", value: "id" },
                { text: "Name", value: "name" },
                { text: "E-mail", value: "email" },
                { text: "Role", value: "role" },
                { text: "Actions", value: "actions", sortable: false },
            ],
            roles: ["user", "organizer", "admin"],
            itemsPerPage: 5, // Número de itens por página
            page: 1, // Página atual
        };
    },
    computed: {
        users() {
            const userStore = useUserStore();
            const startIndex = (this.page - 1) * this.itemsPerPage;
            const endIndex = this.page * this.itemsPerPage;
            return userStore.getAccounts.slice(startIndex, endIndex); // Dividir os dados em páginas
        },
        pageCount() {
            const userStore = useUserStore();
            return Math.ceil(userStore.getAccounts.length / this.itemsPerPage); // Calcula o número total de páginas
        },
    },
    methods: {
        editUser(user) {
            this.editedUser = { ...user }; // Cria uma cópia dos dados do usuário para editar
            this.dialog = true; // Abre o diálogo para editar
        },
        saveUser() {
            const userStore = useUserStore();
            try {
                // Chama o método da store para atualizar o usuário
                userStore.updateUser(this.editedUser.id, this.editedUser);
                this.dialog = false; // Fecha o diálogo após salvar
                alert('User updated successfully.');
            } catch (error) {
                alert('Error updating user: ' + error.message);
            }
        },
        deleteUser(userId) {
            const userStore = useUserStore();
            const user = userStore.getUserById(userId);
            if (user) {
                if (confirm(`Are you sure you want to delete the user ${user.name}?`)) {
                    userStore.deleteUser(userId);
                }
            }
        },
        blockUser(userId) {
            const userStore = useUserStore();
            const user = userStore.getUserById(userId);
            if (user) {
                userStore.blockUser(userId);
                alert(
                    `User ${user.name} was ${user.isBlocked ? "blocked" : "unblocked"}.`
                );
            }
        },
    }

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

.action-text {
    cursor: pointer;
    transition: color 0.2s ease-in-out;
}
</style>
