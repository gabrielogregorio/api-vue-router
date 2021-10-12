<template>

    <div>
        <nav>
            <router-link :to="{name: 'Home'}">Inicio</router-link>
            <router-link :to="{name: 'Users'}">Usuários</router-link>
        </nav>

    <section>
        <div class="container">
        <h2>Editar Usuário!</h2>

        <p class="red" v-if="erro != ''">{{erro}}</p>

        <p>Nome</p>
        <input type="text" name="name" id="name" placeholder="Seu nome" v-model="name">

        <p>E-mail</p>
        <input type="text" name="email" id="email" placeholder="Seu e-mail" v-model="email">

        <button @click="updateUser">Atualizar</button>

        </div>
    </section>
</div>
</template>


<script>
import axios from 'axios';
import req from '../getTokenLocalstorage';

export default {
  created() {
    axios.get('http://localhost:8080/user/' + this.$route.params.id, req).then(res => {
      console.log(res);
      this.name = res.data.name;
      this.email = res.data.email;
      this.id = res.data.id;
    }).catch(error => {
      console.log(error);
      this.$router.push({name: 'Users'})

    })
  },
  data() {
    return {
      name: '',
      email: '',
      id: '',
      erro: ''
    }
  },


  methods: {

    updateUser() {
      console.log(this.name, this.email, this.id)

      axios.put('http://localhost:8080/user', {
        name: this.name,
        email: this.email,
        id: this.id
      }, req).then(res => {
        console.log(res);
        this.erro = '';
        // redirect to home
        this.$router.push({name: 'Users'});
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
