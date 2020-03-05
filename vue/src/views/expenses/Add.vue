<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-8">
        <h1 class="title is-4 has-text-centered">Add New Expense</h1>
        <form @submit.prevent="onAddSubmit">
          <my-select
            label="Category"
            :options="options"
            v-model="category"
            required
          ></my-select>
          <my-field
            label="Sum"
            type="number"
            required
            v-model="cost"
          ></my-field>
          <my-field-button text="Add"></my-field-button>
        </form>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-10">
        <h1 class="title is-4 has-text-centered">Last 5 Expenses</h1>
        <table class="table is-fullwidth is-striped">
          <thead>
            <th>Category</th>
            <th>Expense ($)</th>
            <th></th>
          </thead>
          <tbody>
            <tr v-for="e in last5Expenses" :key="e.id">
              <td>{{ categories[e.category] }}</td>
              <td>{{ e.cost }} $</td>
              <td><a @click="onDelete(e.id)">Delete</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import MyField from '../../components/MyField'
import MyFieldButton from '../../components/MyFieldButton'
import { mapActions, mapGetters } from 'vuex'
import MySelect from '../../components/MySelect'
import NProgress from 'nprogress'
import LoadDataMixin from '../../mixins/LoadDataMixin'

export default {
  name: 'Add',
  mixins: [LoadDataMixin],
  components: { MySelect, MyFieldButton, MyField },
  data() {
    return {
      category: 'grocery',
      cost: null
    }
  },
  computed: {
    options: function() {
      return Object.keys(this.categories).map(key => ({
        value: key,
        text: this.categories[key]
      }))
    },
    ...mapGetters('expenses', ['categories', 'last5Expenses'])
  },
  methods: {
    onAddSubmit() {
      NProgress.start()
      this.addExpense({
        cost: this.cost,
        category: this.category
      }).finally(() => NProgress.done())
    },
    onDelete(id) {
      NProgress.start()
      this.deleteExpense(id).finally(() => NProgress.done())
    },
    ...mapActions('expenses', ['addExpense', 'deleteExpense'])
  }
}
</script>

<style scoped></style>
