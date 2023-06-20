<template>
    <v-container>
        <v-row class="d-flex justify-center">
            <v-col cols="10" sm="8" md="7" lg="6" xl="5">
                <v-card :loading="waitting" class="d-flex flex-column">
                    <v-card-title> 課程論壇 </v-card-title>
                    <v-form validate-on="submit" @submit.prevent="login">
                        <v-card-text>
                            <v-row class="d-flex flex-column">
                                <v-row class="d-flex flex-column align-center">
                                    <v-col cols="11" class="py-1">
                                        <v-text-field
                                            label="學號"
                                            :rules="rules"
                                            v-model="loginData.username"
                                            variant="outlined"
                                            :disabled="disabled"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row class="d-flex flex-column align-center">
                                    <v-col cols="11" class="py-0">
                                        <v-text-field
                                            label="密碼"
                                            :rules="rules"
                                            v-model="loginData.password"
                                            variant="outlined"
                                            :disabled="disabled"
                                            type="password"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-row>
                            <v-card-actions>
                                <v-row class="pt-4">
                                    <v-col class="d-flex justify-center">
                                        <v-btn
                                            variant="elevated"
                                            width="250"
                                            color="rgba(71, 105,147, 1)"
                                            type="submit"
                                            :disabled="disabled"
                                        >
                                            <span style="color: white">登入</span>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-actions>
                        </v-card-text>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/Auth.js';
import { useAlertStore } from '@/store/Alert.js';
const authStore = useAuthStore();
const alertStore = useAlertStore();
const disabled = ref(false);
const waitting = ref(false);
const rules = [
    (value) => {
        if (value) return true;
        return '輸入值不得為空';
    },
];
const router = useRouter();
const loginData = reactive({
    username: '',
    password: '',
});
async function login(event) {
    waitting.value = true;
    disabled.value = true;
    const result = await event;
    if (result.valid) {
        const fetchResult = await authStore.login(loginData);
        console.log(fetchResult.statusCode);
        if (fetchResult.status) {
            router.push('/home');
        } else {
            alertStore.callAlert('帳號密碼錯誤', 'error');
        }
    }
    waitting.value = false;
    disabled.value = false;
}
</script>
