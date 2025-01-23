// rotas.spec.js
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia'; 
import router from '@/router';
import LoginView from '@/views/LoginView.vue';
import { describe, it, expect } from 'vitest';
import { nextTick } from 'vue';

describe('LoginView.vue', () => {
  it('should navigate to /home on successful login', async () => {
    const pinia = createPinia();
    setActivePinia(pinia); 

    const wrapper = mount(LoginView, {
      global: {
        plugins: [router, pinia], 
      },
    });

    // Preenche o email e a senha
    await wrapper.find('input[type="email"]').setValue('ines@email.com');
    await wrapper.find('input[type="password"]').setValue('1234');

    // Clica no botão de submit
    await wrapper.find('button[type="submit"]').trigger('click');

    // Espera a navegação ocorrer
    await nextTick();
    await router.isReady();

    // Verifica se a navegação foi bem-sucedida para a página /home
    expect(router.currentRoute.value.path).toBe('/');
  });

  it('should show an error on failed login', async () => {
    const pinia = createPinia();
    setActivePinia(pinia); 

    const wrapper = mount(LoginView, {
      global: {
        plugins: [router, pinia], 
      },
    });

    // Preenche o email e a senha incorretos
    await wrapper.find('input[type="email"]').setValue('ines@email.com');
    await wrapper.find('input[type="password"]').setValue('wrongpass');

    // Clica no botão de submit
    await wrapper.find('button[type="submit"]').trigger('click');

    // Espera a navegação ou a exibição de uma mensagem de erro
    await nextTick();
    
    // Verifica se não houve navegação para /home
    expect(router.currentRoute.value.path).not.toBe('/');
  });
});
