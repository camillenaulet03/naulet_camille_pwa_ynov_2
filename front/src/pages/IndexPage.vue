<template>
  <div class="password">
    <div>
      <h4>Generate password</h4>
    </div>
    <div>
      <label for="length">Length of the password</label>
      <q-input type="number" outlined class="q-mb-md" hide-bottom-space v-model="length"></q-input>
    </div>
    <div>
      <label for="length">Options</label>
      <q-select filled v-model="multiple" multiple :options="options" label="Multiple" value=""/>
    </div>
    <div class="generate">
      <q-btn color="primary" label="Generate password" @click="generatePassword" />
    </div>
    <div v-if="result != ''">
      <q-input outlined class="q-mb-md" hide-bottom-space v-model="result" disable></q-input>
      <p>Password strength {{getIndicatorWidth() + '%'}}</p>
      <div class="np-password-strength-indicator-container">
        <div
          class="np-password-strength-indicator"
          :style="{
            backgroundColor: getIndicatorBackgroundColor(),
            width: getIndicatorWidth() + '%',
          }"
        ></div>
      </div>
      <q-btn color="white" text-color="black" label="Copy to clipboard" @click="copy" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {getGeneratePassword} from "src/services/password";

const length = ref(10)
const multiple = ref(['Include uppercase letters', 'Include lowercase letters'])
const options = ref([
  'Include uppercase letters', 'Include lowercase letters', 'Include numbers', 'Include symbols'
])
const result = ref('');
const score = ref('');

async function generatePassword () {
  const { data } = await getGeneratePassword(length.value, multiple.value)
  result.value = data.password
  score.value = data.score
}

function copy () {
  navigator.clipboard.writeText(result.value)
}

function getIndicatorBackgroundColor () {
  let color
  switch (score.value) {
    case 0:
    case 1:
      color = "red"
      break
    case 2:
      color = "orange"
      break
    case 3:
      color = "yellow"
      break
    default:
      color = "green"
  }
  return color
}

function getIndicatorWidth () {
  return parseInt((this.score / 4) * 100).toString()
}

</script>
<style lang="scss" scoped>
.password {
  width: 90%;
  margin-left: 5%;

  .generate {
    margin-top: 2em;
    margin-bottom: 2em;
  }

  .np-password-strength-indicator-container {
    height: 20px;
    background: #eee;
    border-radius: 6px;
    margin-bottom: 2em;
  }

  .np-password-strength-indicator {
    height: 20px;
    background: #eee;
    border-radius: 6px;
    transition: all 0.3s;
  }

  .np-password-hint {
    margin-top: 10px;
  }
}
</style>
