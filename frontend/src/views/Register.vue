<template>

  <section>

    <div class="container">
      <h2>Registrar Usuário!</h2>

      <p class="red" v-if="erro != ''">{{erro}}</p>
      <p>Nome</p>
      <input type="text" name="name" id="name" placeholder="Seu nome" v-model="name">

      <p>E-mail</p>
      <input type="text" name="email" id="email" placeholder="Seu e-mail" v-model="email">

      <p>Senha</p>
      <input type="password" name="password" id="password" placeholder="Sua senha" v-model="password">

      <button @click="register">Cadastrar</button>

    </div>
  </section>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',

      erro: ''
    }
  },


  methods: {
    register() {
      console.log(this.name);
      console.log(this.email);
      console.log(this.password);

      axios.post('http://localhost:8080/user', {
        name: this.name,
        email: this.email,
        password: this.password
      }).then(res => {
        console.log(res);
        this.erro = '';
        // redirect to home
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
