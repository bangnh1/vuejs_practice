<template>
  <div class="home-view-container">
    <h1>Adopt a new best friend</h1>
    <p>Animals Count: {{animalsCount}}</p>
    <p>Number of Cats: {{getAllCats.length}}</p>
    <button @click="togglePetForm" class="btn btn-primary">Add New Pet </button>
    <b-form @submit.prevent="handleSubmit" v-if="showPetForm">
      <b-form-group
        id="input-group-1"
        label="Pet's Name:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="formData.name"
          type="text"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Species:" label-for="input-2">
        <b-form-select
          id="input-2"
          :options="['cats', 'dogs']"
          v-model="formData.species"
          placeholder="Enter species"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Pet's Age:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="formData.age"
          type="number"
          placeholder="Enter age"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      showPetForm: false,
      formData: {
        name: '',
        species: null,
        age: 0
      }
    }
  },
  computed: {
    ...mapGetters([
      'animalsCount',
      'getAllCats'
    ])
  },
  methods: {
    ...mapActions([
      'addPet'
    ]),
    togglePetForm  () {
      this.showPetForm = !this.showPetForm
    },
    handleSubmit () {
      const { name, species, age } = this.formData
      const payload = {
        species: species,
        pet: {
          name,
          age
        }
      }
      this.addPet(payload)

      // Clear form after submitted
      this.formData = {
        name: '',
        species: null,
        age: 0
      }
    }
  }
}
</script>
