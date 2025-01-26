<template>
    <v-app style="background-color: #0f0a30;">
        <v-container class="fill-height d-flex align-center justify-center">
            <v-card>
                <v-card-title class="headline">Page Not Found (404)</v-card-title>
                <v-card-text>
                    Oops! The page you are trying to access does not exist.
                </v-card-text>
                <v-card-actions>
                    <v-btn to="/" color="primary">Back to home page</v-btn>
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