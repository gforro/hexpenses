<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-8">
        <h1 class="title is-4 has-text-centered">Add New Expense</h1>
        <form @submit.prevent="onSubmit">
          <my-select
            label="Category"
            :options="categoryOptions"
            v-model="category"
            required
          ></my-select>
          <my-field
            label="Sum"
            type="number"
            step="0.01"
            required
            v-model.number="cost"
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
            <tr v-for="e in expenses.last5.value" :key="e.id">
              <td>{{ categories.all.value[e.category] }}</td>
              <td>{{ e.cost }} $</td>
              <td><a @click="expenses.remove(e.id)">Delete</a></td>
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
import MySelect from '../../components/MySelect'
import { computed, reactive, toRefs } from '@vue/composition-api'
import useCategories from '../../composition/useCategories'
import useExpenses from '../../composition/useExpenses'
import useNProgress from '../../composition/useNProgress'
import useLoadData from '../../composition/useLoadData'

export default {
  name: 'Add',
  components: { MySelect, MyFieldButton, MyField },
  setup(_, { root: { $store } }) {
    useLoadData($store)

    const categories = useCategories($store)
    const expenses = useExpenses($store)
    const data = reactive({
      category: 'grocery',
      cost: null,
      categoryOptions: computed(() =>
        Object.keys(categories.all.value).map(key => ({
          value: key,
          text: categories.all.value[key]
        }))
      )
    })
    const onSubmit = () => {
      expenses.add(data.category, data.cost)
    }

    useNProgress(() => categories.loading.value || expenses.loading.value)
    return {
      ...toRefs(data),
      categories,
      expenses,
      onSubmit
    }
  }
}
</script>
