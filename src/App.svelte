<script lang="ts">
  import { getLocalStorage, setLocalStorage } from './lib/localStorage'

  let hidden = getLocalStorage("hidden", false);
  let p1 = getLocalStorage("p1", 1);
  let p2 = getLocalStorage("p2", 1);
  let cost = 100;

  const formatter = new Intl.NumberFormat(undefined, {
    currency: 'SEK',
    style: 'currency',
  });

  $: setLocalStorage("hidden", hidden);
  $: setLocalStorage("p1", p1);
  $: setLocalStorage("p2", p2);

  $: youPay = formatter.format((p1 / (p1 + p2)) * cost);
  $: partnerPay = formatter.format((p2 / (p1 + p2)) * cost);
</script>

<div class="App">
  <div class="settings">
    <label>
      <input type="checkbox" bind:checked={hidden} />
      {" "}Hide sensitive data
    </label>
  </div>
  <div hidden={hidden}>
    <label>
      How much do you make?
      <br />
      <input type="number" bind:value={p1} />
    </label>
  </div>

  <div hidden={hidden}>
    <label>
      How much does your partner make?
      <br />
      <input type="number" bind:value={p2} />
    </label>
  </div>

  <div>
    <label>
      What is the cost of the thing?
      <br />
      <input type="number" bind:value={cost} />
    </label>
  </div>

  <div>
    <div>You will pay: {youPay}</div>
    <div>Your partner will pay: {partnerPay}</div>
  </div>
</div>

<style>
.App {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.settings {
  position: fixed;
  top: 10px;
  right: 10px;
}

.settings label {
  display: flex;
  padding: 20px;
  background-color: hsl(0, 0%, 30%);
}

</style>
