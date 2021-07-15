<template>
  <div>
    <b-button-group size="sm" class="show-when-hovered">
      
        <b-button :to="{ name: viewURL, params: { id: row.id }}" variant="primary">
        <i class="material-icons md-18">edit</i>
      </b-button>
      <b-button @click="$parent.$parent.$parent.$parent.onDestroy(row)" variant="light">
        <i class="material-icons md-19">delete_outline</i>
      </b-button>
    </b-button-group>
  </div>
</template>
<script>
export default {
  props: ["row"],
  computed: {
    formURL: function() {
      return this.$route.name.replace("List", "Form");
    },
    viewURL: function() {
      return this.$route.name.replace("List", "View");
    }
  },
  data: () => ({})
};
</script>
