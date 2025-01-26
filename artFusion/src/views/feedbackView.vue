<template>
    <v-app style="background-color: #0f0a30; color: #f1f9fc;">
        <Navbar />
        <v-container class="fill-height d-flex flex-column align-center py-16">
            <h1 class="text-center text-h4 font-weight-bold mb-8">Deixe seu Feedback</h1>

            <v-form ref="feedbackForm" v-model="formValid" class="feedback-form">
                <v-textarea
                    v-model="feedback.comment"
                    label="Sua opinião"
                    outlined
                    dense
                    rows="4"
                    required
                    :rules="[rules.required]"
                    class="mb-4 feedback-input"
                ></v-textarea>

                <v-text-field
                    v-model="feedback.ticket"
                    label="Ticket que foi ver"
                    outlined
                    dense
                    required
                    :rules="[rules.required]"
                    class="mb-4 feedback-input"
                ></v-text-field>

                <v-radio-group
    v-model="feedback.recommend"
    label="Você voltaria a repetir a experiência?"
    row
    class="mb-4 feedback-radio-group"
>
    <v-radio class="feedback-radio" value="Sim">
        <template v-slot:default>
            Sim
        </template>
    </v-radio>
    <v-radio class="feedback-radio" value="Não">
        <template v-slot:default>
            Não
        </template>
    </v-radio>
</v-radio-group>


                <v-file-input
                    v-model="feedback.files"
                    label="Carregar arquivos (imagens ou vídeos)"
                    outlined
                    dense
                    multiple
                    show-size
                    truncate-length="30"
                    class="mb-4 feedback-file-input"
                ></v-file-input>

                <div class="rating-container mb-4">
                    <span class="rating-label">Avaliação:</span>
                    <v-rating
                        v-model="feedback.rating"
                        color="yellow"
                        background-color="#4a4a4a"
                        empty-icon="mdi-star-outline"
                        full-icon="mdi-star"
                        half-icon="mdi-star-half"
                        length="5"
                        large
                        class="ml-2 feedback-rating"
                    ></v-rating>
                </div>

                <v-btn 
                    color="primary" 
                    @click="submitFeedback" 
                    :disabled="!formValid"
                    class="mt-4"
                    block
                >
                    Submeter
                </v-btn>
            </v-form>

            <v-divider class="my-12"></v-divider>

            <h2 class="text-center text-h5 font-weight-medium mb-6">Feedbacks Submetidos</h2>

            <v-row>
                <v-col
                    v-for="(item, index) in feedbackList"
                    :key="index"
                    cols="12" md="6" lg="4"
                >
                    <v-card class="feedback-card">
                        <v-card-title class="text-h6 font-weight-bold">{{ item.ticket }}</v-card-title>
                        <v-card-subtitle class="text-subtitle-2 text-grey">{{ item.recommend }}</v-card-subtitle>
                        <v-card-text>
                            <p class="text-body-2">{{ item.comment }}</p>
                            <v-rating
                                :value="item.rating"
                                color="yellow"
                                background-color="#4a4a4a"
                                empty-icon="mdi-star-outline"
                                full-icon="mdi-star"
                                half-icon="mdi-star-half"
                                length="5"
                                readonly
                                dense
                                class="mt-2"
                            ></v-rating>
                            <p v-if="item.files.length > 0" class="mt-2 text-body-2">
                                <strong>Arquivos:</strong> {{ item.files.map(file => file.name).join(', ') }}
                            </p>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <Footer />
    </v-app>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";

export default {
    components: {
        Navbar,
        Footer,
    },
    data() {
        return {
            feedback: {
                comment: "",
                ticket: "",
                recommend: "",
                files: [],
                rating: 0,
            },
            feedbackList: [],
            formValid: false,
            rules: {
                required: (value) => !!value || "Este campo é obrigatório.",
            },
        };
    },
    methods: {
        submitFeedback() {
            if (this.$refs.feedbackForm.validate()) {
                this.feedbackList.push({ ...this.feedback });
                this.resetForm();
            }
        },
        resetForm() {
            this.feedback = {
                comment: "",
                ticket: "",
                recommend: "",
                files: [],
                rating: 0,
            };
            this.$refs.feedbackForm.resetValidation();
        },
    },
};
</script>

<style scoped>
.feedback-form {
    max-width: 600px;
    width: 100%;
    padding: 20px;
    background-color: #1a1736;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.feedback-input {
    background-color: #2a2650;
    border-radius: 8px;
}

.feedback-radio-group {
    display: flex;
    align-items: center;
    gap: 16px;
    background-color: #2a2650;
    border-radius: 8px;
    padding: 10px;
    border: 1px solid #f1f9fc;
}

.feedback-radio {
    display: flex;
    align-items: center;
    color: #f1f9fc;
}

.feedback-radio input {
    margin-right: 8px;
    accent-color: #ffd700;
    width: 20px;
    height: 20px;
    border: 2px solid #f1f9fc;
    border-radius: 50%;
    background-color: transparent;
    outline: none;
}

.feedback-radio:hover input {
    border-color: #ffd700;
    box-shadow: 0 0 6px #ffd700;
}

.feedback-radio input:focus-visible {
    outline: 2px solid #ffd700;
    outline-offset: 2px;
}


.feedback-file-input {
    background-color: #2a2650;
    border-radius: 8px;
    padding: 10px;
}

.feedback-card {
    background-color: #1e1b3b;
    color: #f1f9fc;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    padding: 16px;
}

.feedback-card .v-card-title {
    margin-bottom: 8px;
}

.rating-container {
    display: flex;
    align-items: center;
}

.feedback-rating {
    --v-rating-size: 32px;
}

.rating-label {
    font-size: 1rem;
    color: #f1f9fc;
}
</style>
