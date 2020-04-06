<template>
  <transition name="modal">
    <div class="modal__mask">
      <div class="modal__wrapper">
        <div class="modal__container" :class="modalClass">
          <div class="modal__body">
            <slot name="body">default body</slot>
          </div>
          <slot name="actions"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal",
  data() {
    return {
      showModal: false
    };
  },
  props: {
    modalClass: String
  }
};
</script>

<style lang="scss">
.modal__mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal__wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal__wrapper--large {
  display: block;
  height: calc(100% - 4rem);
  margin-top: 4rem;
  overflow-y: scroll;
}

.modal__container {
  width: 20rem;
  margin: 0 auto;
  background-color: var(--bg-color);
  box-shadow: 10px 30px 50px rgba(0, 0, 0, 0.85);
  transition: all 0.3s ease;
}

.modal__container--large {
  width: 90%;
  margin: 1rem auto;
}

.modal-close {
  position: absolute;
  z-index: 10;
  right: 5%;
  top: 4.5rem;

  .icon {
    width: 2rem;
    height: 2rem;
    color: black;
  }
}

.modal__body {
  padding: 2rem 1.5rem;

  h3 {
    margin-bottom: 1rem;
    font-weight: 600;
  }

  .icon--large {
    margin-bottom: 0;
  }

  p {
    margin-bottom: 0;
  }
}

.modal__actions {
  display: flex;
  border-top: 1px solid var(--border-color);

  > * {
    flex: 1;
    border-right: 1px solid var(--border-color);
  }
}

.modal-enter {
  opacity: 0;
  filter: blur(20px);
}

.modal-leave-active {
  opacity: 0;
  filter: blur(20px);
}

.modal-enter .modal__container,
.modal-leave-active .modal__container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal--install {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial;
  background-color: rgba(0, 0, 0, 0.25);

  .modal__wrapper {
    vertical-align: bottom;
  }
}

.modal--ipad {
  .modal__wrapper {
    vertical-align: top;
  }

  .modal__container--install {
    margin: 2rem 1rem 0 auto;

    &:after {
      top: -0.5rem;
    }
  }
}

.modal__container--install {
  margin: 2rem auto;
  position: relative;
  line-height: 1.5;
  background-color: #ffffff;
  color: var(--bg-color);
  border-radius: 1rem;

  &:after {
    content: "";
    width: 1rem;
    height: 1rem;
    position: absolute;
    bottom: -0.5rem;
    left: calc(50% - 0.5rem);
    transform: rotate(45deg);
    background-color: #ffffff;
  }

  .modal__body {
    padding: 1rem 1rem 0 1rem;
  }

  .modal__actions {
    border-top-color: transparent;

    .btn--link {
      color: #007aff;
      font-weight: bold;
      letter-spacing: 0;
    }
  }
}
</style>
