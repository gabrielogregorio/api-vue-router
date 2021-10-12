<template>
  <section>
    <div class="container">
      <h2>Login Usuário!</h2>

      <p class="red" v-if="erro != ''">{{erro}}</p>
      <p>E-mail</p>
      <input type="text" name="email" id="email" placeholder="Seu e-mail" v-model="email">

      <p>Senha</p>
      <input type="password" name="password" id="password" placeholder="Sua senha" v-model="password">

      <button @click="login">Ligar</button>
    </div>
  </section>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',

      erro: ''
    }
  },


  methods: {
    login() {


      axios.post('http://localhost:8080/login', {
        email: this.email,
        password: this.password
      }).then(res => {
        console.log(res);
        this.erro = '';
        localStorage.setItem('token', res.data.token);
        this.$router.push({name: 'Home'});
      }).catch(error => {
        this.erro = error.response.data.error;
        console.log(this.erro);
      })
    }
  }

}
</script>

<style scoped>

</style>
