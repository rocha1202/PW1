// src/components/__tests__/Home.spec.js
import { mount } from '@vue/test-utils';
import Home from '@/views/HomeView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { describe, it, expect } from 'vitest';

// Criação de um mock para o router
const routes = [
  { path: '/workshop', component: { template: '<div>Workshop Page</div>' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe('HomeView.vue', () => {
  it('should navigate to /workshop when the button is clicked', async () => {
    // Monta o componente com o router
    const wrapper = mount(Home, {
      global: {
        plugins: [router],
      },
    });

    // Localiza o botão
    const button = wrapper.find('button'); // Selecione o botão diretamente

    // Verifica se o botão está presente
    expect(button.exists()).toBe(true);

    // Clica no botão
    await button.trigger('click');

    // Aguarda a navegação
    await router.isReady();

    // Verifica se a rota foi alterada
    expect(wrapper.vm.$route.path).toBe('/workshop'); // Verifica a rota atual
  });
});