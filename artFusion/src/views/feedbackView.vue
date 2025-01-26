<template>
    <v-app style="background-color: #0f0a30; color: #f1f9fc;">
        <Navbar />
        <v-container class="fill-height d-flex flex-column align-center py-16">
            <div class="form-container">
                <h1 class="text-center text-h4 font-weight-bold mb-6">Your Feedback goes here</h1>

                <v-form ref="feedbackForm" v-model="formValid" class="feedback-form">
                    <v-text-field
                        v-model="feedback.ticket"
                        label="Reference ticket/workshop"
                        outlined
                        class="mb-4 feedback-input"
                        :rules="[rules.required]"
                        placeholder="Inform us about the ticket/workshop you're referring to..."
                    ></v-text-field>

                    <v-textarea
                        v-model="feedback.comment"
                        label="Share your opinion"
                        outlined
                        rows="3"
                        class="mb-4 feedback-input"
                        :rules="[rules.required]"
                        placeholder="Write here your opinion about the ticket/workshop..."
                    ></v-textarea>

                    <div class="recommendation-container mb-4">
                        <label class="recommendation-label">Would you do it again?</label>
                        <v-btn-toggle v-model="feedback.recommend" class="recommendation-buttons" dense>
                            <v-btn value="Sim" color="success">Yes</v-btn>
                            <v-btn value="Não" color="error">No</v-btn>
                        </v-btn-toggle>
                    </div>

                    <v-file-input
                        v-model="feedback.files"
                        label="Share your photos, videos or files"
                        outlined
                        multiple
                        show-size
                        class="mb-4 feedback-input"
                    ></v-file-input>

                    <v-btn 
                        color="primary" 
                        block
                        class="submit-btn"
                        :disabled="!formValid"
                        @click="submitFeedback"
                    >
                        Submit Feedback
                    </v-btn>
                </v-form>
            </div>

            <v-divider class="my-12"></v-divider>

            <div class="submitted-feedbacks">
                <h2 class="text-center text-h5 font-weight-medium mb-6">Feedback received</h2>
                <v-row dense>
                    <v-col
                        v-for="(item, index) in feedbackList"
                        :key="index"
                        cols="12" md="6" lg="4"
                    >
                        <v-card class="feedback-card">
                            <v-card-title>
                                <span class="ticket-label">Reference:</span>
                                <span>{{ item.ticket }}</span>
                            </v-card-title>
                            <v-card-text>
                                <p><strong>opinion:</strong> {{ item.comment }}</p>
                                <p>
                                    <strong>Recomendation:</strong> 
                                    <span class="recommendation" :class="{'recommend-yes': item.recommend === 'Yes', 'recommend-no': item.recommend === 'No'}">
                                        {{ item.recommend }}
                                    </span>
                                </p>
                                <div v-if="item.files.length > 0" class="files-list mt-2">
                                    <strong>Files:</strong>
                                    <div v-for="file in item.files" :key="file.name" class="file-item">
                                        <template v-if="file.type.startsWith('image')">
                                            <img :src="file.content" :alt="file.name" class="file-image" />
                                        </template>
                                        <template v-else-if="file.type.startsWith('video')">
                                            <video :src="file.content" controls class="file-video"></video>
                                        </template>
                                        <template v-else>
                                            <span>{{ file.name }}</span>
                                        </template>
                                    </div>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
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
            },
            feedbackList: [],
            formValid: false,
            rules: {
                required: (value) => !!value || "Campo obrigatório.",
            },
        };
    },
    methods: {
        async submitFeedback() {
            if (this.$refs.feedbackForm.validate()) {
                const processedFiles = await Promise.all(
                    this.feedback.files.map(async (file) => {
                        const content = await this.readFileContent(file);
                        return {
                            name: file.name,
                            type: file.type,
                            content,
                        };
                    })
                );

                this.feedbackList.push({
                    ...this.feedback,
                    files: processedFiles,
                });
                this.resetForm();
            }
        },
        readFileContent(file) {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(file);
            });
        },
        resetForm() {
            this.feedback = {
                comment: "",
                ticket: "",
                recommend: "",
                files: [],
            };
            this.$refs.feedbackForm.resetValidation();
        },
    },
};
</script>

<style scoped>
.form-container {
    margin-top: 24px;
    max-width: 700px;
    width: 100%;
    background-color: #1a1736;
    padding: 24px;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.feedback-input {
    background-color: #2a2650;
    border-radius: 8px;
    padding: 12px;
}

.recommendation-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.recommendation-label {
    color: #f1f9fc;
    font-weight: bold;
}

.recommendation-buttons .v-btn {
    color: #032D3DFF;
    text-transform: none;
    padding: 6px 12px;
    border-radius: 8px;
}

.recommendation-buttons {
    display: flex;
    gap: 8px; 
}

.submit-btn {
    margin-top: 16px;
}

.submitted-feedbacks {
    margin-top: 32px;
    width: 100%;
}

.feedback-card {
    background-color: #1e1b3b;
    color: #f1f9fc;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.feedback-card .ticket-label {
    font-weight: bold;
    color: #ffd700;
    margin-right: 8px;
}

.recommendation {
    font-weight: bold;
    padding: 2px 6px;
    border-radius: 4px;
}

.recommend-yes {
    background-color: #4caf50;
    color: #fff;
}

.recommend-no {
    background-color: #f44336;
    color: #fff;
}

.files-list .file-item {
    display: block;
    margin-bottom: 8px;
    background-color: #2a2650;
    padding: 4px 8px;
    border-radius: 4px;
}

.file-image {
    max-width: 100%;
    border-radius: 8px;
    margin-top: 8px;
}

.file-video {
    width: 100%;
    border-radius: 8px;
    margin-top: 8px;
}
</style>
