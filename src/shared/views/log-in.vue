<template>
  <div v-if="isSignUp">
    <sign-up />
  </div>
  <div v-else>
    <register />
  </div>

  <div>asdaads</div>
</template>

<script>
import SignUp from "../components/sign-up";
import Register from "../components/register";
import { ref } from "vue";

export default {
  name: "log-in",
  components: {
    SignUp,
    Register,
  },
  setup() {
    const isSignUp = ref(true);
    return {
      isSignUp,
    };
  },
};
</script>

<style scoped></style>
