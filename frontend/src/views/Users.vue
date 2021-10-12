<template>
    <div>
        <nav>
            <router-link :to="{name: 'Home'}">Inicio</router-link>
            <router-link class="active" :to="{name: 'Users'}">Usuários</router-link>
        </nav>
    <section>

        <div class="container-large">
        <h1>Painel administrador</h1>
        <table>
            <tr>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th>Cargo</th>
            <th>Ações</th>
            </tr>
            <tr v-for="user in users" :key="user.id">
            <td>{{user.id}}</td>
            <td>{{user.name}}</td>
            <td>{{user.email}}</td>
            <td>{{user.role | processRole}}</td>
            <td>
                <router-link class="orange" :to="{name: 'EditUser', params: {id: user.id}}">  editar</router-link>
                <button class="red" @click="deleteUser(user.id, user.name)">Deletar</button>
            </td>
            </tr>
        </table>
        </div>
    </section>
  </div>
</template>
<script>
import axios from 'axios';
import req from '../getTokenLocalstorage';

export default {
  created(){
    axios.get('http://localhost:8080/users', req).then(res => {
      this.users = res.data;
    }).catch(error => {
      console.log(error, req);
    })
  },

  methods: {
    deleteUser(id, name){
      var decision = confirm("Quer mesmo deletar " + name + ' de id ' + id);
      if (decision) {
        axios.delete('http://localhost:8080/user/' + id, req).then(res => {
           console.log(res);
           this.users = this.users.filter(user => user.id != id);
        }).catch(error => {
          console.log(error);
        })
      } else {
        console.log('Delete de artigo negado!')
      }
    }

  },
  data() {
    return {
      users: []
    }
  },

  filters: {
    processRole: (value) => {
      if (value == 0) {
        return 'Usuario';
      } else if (value == 1) {
        return 'Admin';
      }
      return value
    }
  }
}
</script>


<style scoped>

</style>
