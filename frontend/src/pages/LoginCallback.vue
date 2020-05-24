<template>
  <div id="login-return">
    <h2>Waiting for login to finish...</h2>
    <span>{{$store.getters.isAuthenticated}}</span>
  </div>
</template>

<script>
  import repositories from "../data/spotify/repositories";
  import config from "../../app.config";

  export default {
    name: "LoginReturn",
    async created() {
      const queryParams = this.$route.query;
      const state = queryParams.state;

      if (queryParams.error || (queryParams.error == null && queryParams.code == null)) {
        //await this.$router.push('/login');
        return
      }

      const authorizationToken = queryParams.code;

      const authData = await repositories.authRepository.requestAccessToken(config.spotifyApi.redirectUrl, authorizationToken);

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

<style scoped>

</style>
