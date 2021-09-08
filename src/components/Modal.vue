<template>
  <transition name="fade" appear>
    <div class="modal__overlay">
      <div class="modal__box">
        <h2>I'm a Modal!</h2>
        <v-btn @click="close" autofocus>close</v-btn>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  methods: {
    close(event) {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss">
@import "../scss/colors";

@keyframes jump {
  0% {
    transform: translateY(250px) scale(0);
  }
  50% {
    transform: translateY(-10px) scale(1.2);
  }
  100% {
    transform: translateY(0px) scale(1);
  }
}

$transition-duration: 0.7s;

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity $transition-duration ease;

  .modal__box {
    animation: jump $transition-duration ease-in-out;
  }
}

.fade-leave-active {
  opacity: 0;
  transition: opacity $transition-duration ease;

  .modal__box {
    animation: jump $transition-duration ease-in-out reverse;
    animation-fill-mode: backwards;
  }
}

.modal {
  &__box {
    background: #f7f6ef;
    text-align: center;
    padding: 20px;
    border-radius: 6px;
  }

  &__overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: $modal-background-color;
    background-image: $modal-background-image;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
