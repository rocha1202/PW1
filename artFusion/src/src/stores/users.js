import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore("user", {
  state: () => ({
    isUserAuthenticated: false,
    user: null,
    users: [
      {
        id: 1,
        email: 'ines@email.com',
        password: "1234",
      },
      {
        id: 2,
        email: 'beatriz@email.com',
        password: "1234",
      },
      {
        id: 3,
        email: 'sergio@email.com',
        password: "1234",
      },
    ],
  }),
  getters: {
    getUser: (state) => state.user,
    getUsers: (state) => state.users,
    getUserId: (state) => (id) => state.users.find((user) => user.id == id),
    isUser: (state) => state.isUserAuthenticated,
  },
  actions: {
    login(email, password) {
      const user = this.users.find(
        (user) => user.email == email && user.password == password
      );

      if (user) {
        this.isUserAuthenticated = true;
        this.user = user;
      } else {
        throw Error("Invalid Data!");
      }
    },
    signup(email, password, confirmPassword) {
      let userEmail = this.users.find((user) => user.email == email);

if (userEmail) {
        throw Error('E-mail already linked to an account');
      } else if (
        email === '' ||
        password === '' ||
        confirmPassword === ''
      ) {
        throw Error('Fill all fields to create your account');
      } else if (password != confirmPassword) {
        throw Error('Passwords must match');
      } else {
        let newUser = {
          id: this.users.length + 1,
          email: email,
          password: password,
        };
        this.users.push(newUser);
        console.log(this.users);
        this.user = newUser;
        this.isUserAuthenticated = true;
      }
    },
    logout() {
      this.isUserAuthenticated = false;
      this.user = null;
    },
    
  },
  persist: true,
});
