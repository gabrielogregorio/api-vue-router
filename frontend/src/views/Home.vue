<template>
    <div>
        <nav>
            <router-link class="active" :to="{name: 'Home'}">Inicio</router-link>
            <router-link :to="{name: 'Users'}">Usuários</router-link>
        </nav>
    </div>
</template>


<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>
