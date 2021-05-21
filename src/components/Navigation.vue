<template functional>
    <div>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand href="#"></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-dropdown size="sm" right v-if="props.loggedIn" variant="link" toggle-class="text-decoration-none" no-caret>
          <template #button-content>
            <b-avatar variant="info" :src="props.userProfile.picture"></b-avatar>
          </template>
          <div class="text-center">
            <b-avatar class="mt-3 mb-3" :src="props.userProfile.picture" size="5rem"></b-avatar>
            <br>
            <span class="font-weight-bold"> {{ props.userProfile.name }} </span>
            <br>
            <span class="mb-3 email">{{props.userProfile.email}}</span>
            <br>
            <b-dropdown-divider></b-dropdown-divider>
            <b-button variant="primary" class="mt-3 mb-3" @click="props.logout">
              Выйти
            </b-button>
          </div>
        </b-dropdown>
        <b-button class="logout-btn" variant="primary" v-else @click="props.login">
          Войти
        </b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
  name: 'Navigation',
  mounted() {
  }
}
</script>

<style>
.email {
  font-size: 14px;
  color: #5f6368;
}

.dropdown-menu {
    position: absolute;
    margin-top: 30px;
    top: 100%;
    left: 0;
    z-index: 1000;
    display: none;
    float: left;
    min-width: 20rem !important;
    padding: 0.5rem 0;
    margin: 1rem 0 0 !important;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
}
</style>