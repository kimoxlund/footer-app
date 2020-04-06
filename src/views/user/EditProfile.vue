<template>
  <div class="ui-content">
    <ui-header title="Profile"
               backLink="settings"
               action="editProfile">
    </ui-header>

    <form class="pt-2" id="editProfile" @submit.prevent="onUpdateProfile">
      <input-field name="name" icon="name">
        <input class="form-control" type="text" id="name" name="name" placeholder="Field Name" v-model.lazy="profile.name">
      </input-field>

      <input-field name="email" icon="email">
        <input class="form-control" type="text" id="email" name="email" placeholder="Email" v-model.lazy="profile.email">
      </input-field>
    </form>

    <button @click="modalDelete = true">Delete Account</button>

    <modal v-if="modalDelete">
      <div slot="body">
        <div class="text-center">
          <p>Are you sure you want to permanently delete your account?</p>
        </div>
      </div>
      <div slot="actions">
        <div class="modal__actions">
          <button class="btn btn--secondary"  @click="modalDelete = false">Cancel</button>
          <button class="btn" @click="">Delete</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>

export default {
  data() {
    return {
      modalDelete: false,
    }
  },

  methods: {
    onUpdateProfile: function () {

        db.collection('locations').doc(this.profile.id).update({
          name: this.location.name,
          email: this.location.location,
          active: this.location.active
        }).then(() => {
          this.$router.push({ name: 'locations'})
        }).catch((error) => {
          this.errors = error
        })

    },

    deleteAccount: function () {
      this.$store.dispatch('deleteAccount', this.location.id)
      this.$router.push('/locations')
    },
  },

  computed: {

    user () {
      return this.$store.getters.user
    }
  },
}
</script>
