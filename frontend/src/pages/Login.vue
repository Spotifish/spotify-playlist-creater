<template>
  <div id="login-page">
    <div id="container">
      <h1>Spoti.fish</h1>
      <img id="logo" src="https://placeholder.pics/svg/300" alt="Spoti.fish Icon">
      <button v-on:click="login">Login with Spotify</button>
    </div>
  </div>
</template>

<script>
  import repositories from "@/data/spotify/repositories";

  export default {
    name: "LoginPage",
    methods: {
      login: async function () {
        await repositories.authRepository.requestAuthorizationToken(
          location.origin + this.$router.resolve({name: "authCallback"}).href,
          "/"
        )
      }
    }
  }
</script>

<style scoped lang="scss">
  #login-page {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $page-margin * 1.5;
    width: 100%;
    height: 100%;

    #container {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      max-height: 750px;
      max-width: 500px;

      button {
        @include ripple-button($color-accent);
        font-size: 2rem;
        height: 3.5rem;
        border-radius: 10px;
        margin-top: 30px;
        width: 99%;
      }

      img {
        width: 100%;
      }

      h1 {
        font-size: 4rem;
        margin-top: 10px;
        margin-bottom: 15px;
      }
    }
  }
</style>
