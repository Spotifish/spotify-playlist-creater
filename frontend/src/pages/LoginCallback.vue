<template>
  <div id="login-return">
    <template v-if="!$store.getters.isAuthenticated && isSuccess">
      <Spinner></Spinner>
      <h2>Authenticating...</h2>
    </template>
    <template v-else-if="!isSuccess">
      <h2>Authentication failed!</h2>
      <router-link to="/">
        <button v-on:click="$router.push('/')">Return to home</button>
      </router-link>
    </template>
  </div>
</template>

<script>
  import Spinner from "../components/Spinner";
  import repositories from "../data/spotify/repositories";

  export default {
    name: "LoginReturn",
    data: function () {
      return {
        isSuccess: true
      }
    },
    components: {
      Spinner
    },
    async created() {
      if (this.$store.getters.isAuthenticated) {
        await this.$router.push('/');
      }

      const queryParams = this.$route.query;
      const state = queryParams.state;

      if (queryParams.error || (queryParams.error == null && queryParams.code == null)) {
        this.isSuccess = false;
        return;
      }

      const authorizationToken = queryParams.code;
      const authData = await repositories.authRepository.requestAccessToken(
        location.origin + this.$router.resolve({name: "authCallback"}).href,
        authorizationToken);

      this.$store.commit('setSpotifyAccessToken', {
        accessToken: authData.accessToken,
        expirationDate: authData.expirationDate
      })

      if (state != null) {
        await this.$router.push(state);
      } else {
        await this.$router.push('/');
      }
    }
  }
</script>

<style scoped lang="scss">
  #login-return {
    overflow: hidden;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h2 {
      padding-top: 1rem;
      padding-bottom: 1rem;
    }
  }
</style>
