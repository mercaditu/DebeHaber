<template>
  <div>
    <h4>You're running on empty!</h4>
    <div v-show="isCreated !== true">
      <p class="lead">
        How about
        <router-link :to="{ name: formURL, params: { id: 0}}">creating</router-link>some data
      </p>
    </div>
    <!-- <div style="width:100%;height:0;padding-bottom:75%;position:relative;">
      <iframe
        src="https://giphy.com/embed/12iY9OZoYcUabK"
              src="https://media.giphy.com/media/12iY9OZoYcUabK/giphy.gif"
        width="100%"
        height="100%"
        style="position:absolute"
        frameborder="0"
        class="giphy-embed"
        allowfullscreen
      ></iframe>
    </div>
    <p>
      <a href="https://giphy.com/gifs/results-12iY9OZoYcUabK">via GIPHY</a>
    </p>-->
    <b-img fluid center src="/img/apps/animasi-emptystate.gif"/>
  </div>
</template>
<script>
export default {
  props: ["isCreated"],
  data: () => ({}),
  computed: {
    formURL: function() {
      return this.$route.name.replace("List", "Form");
    }
  }
};
</script>
