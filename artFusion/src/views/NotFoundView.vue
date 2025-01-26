<template>
    <v-app style="background-color: #0f0a30;">
        <v-container class="fill-height d-flex align-center justify-center">
            <v-card>
                <v-card-title class="headline">Page Not Found (404)</v-card-title>
                <v-card-text>
                    Oops! A página que você está tentando acessar não existe.
                </v-card-text>
                <v-card-actions>
                    <v-btn to="/" color="primary">Voltar para a página inicial</v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </v-app>
</template>

<script>
export default {
    name: "NotFoundView",
};
</script>