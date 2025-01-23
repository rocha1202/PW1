import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia'; 
import router from '@/router';
import navbar from '@/components/navbar.vue';
import { describe, it, expect } from 'vitest';

describe('navbar.vue', () => {
  it('router is /tickets', async () => {
    const pinia = createPinia();
    setActivePinia(pinia); 

    const wrapper = mount(navbar, {
      global: {
        plugins: [router, pinia], 
      },
    });

    await router.push('/tickets');
    await router.isReady();

    expect(window.location.pathname).toBe('/'); 
  });
});
