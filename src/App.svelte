<script lang="ts">
  import { execute, safeExecute } from "./lib/eval";
  import { getLocalStorage, setLocalStorage } from "./lib/localStorage";

  let hidden = getLocalStorage("hidden", false);
  let p1 = getLocalStorage("p1", 1);
  let p2 = getLocalStorage("p2", 1);

  let cost = getLocalStorage("cost", 100);
  let costString = String(cost);
  let parseError: string | null = null;

  const formatter = new Intl.NumberFormat(undefined, {
    currency: "SEK",
    style: "currency",
  });

  $: cost = safeExecute(costString, cost);

  $: setLocalStorage("hidden", hidden);
  $: setLocalStorage("p1", p1);
  $: setLocalStorage("p2", p2);
  $: setLocalStorage("cost", cost);

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
  <div {hidden}>
    <label>
      How much do you make?
      <br />
      <input type="number" bind:value={p1} />
    </label>
  </div>

  <div {hidden}>
    <label>
      How much does your partner make?
      <br />
      <input type="number" bind:value={p2} />
    </label>
  </div>

  <div>
    <label for="cost">
      What is the cost of the thing?
      <br />
      <div class="input-wrapper">
        <input
          id="cost"
          type="text"
          bind:value={costString}
          on:input={() => {
            parseError = null;
          }}
        />
        <button
          type="button"
          on:click={() => {
            try {
              let c = execute(costString);
              if (isFinite(c) && !isNaN(c)) {
                costString = String(Math.round(c));
              } else {
                parseError = "Not a number";
              }
            } catch (e) {
              parseError = e.message.slice(e.message.indexOf(" ") + 1);
            }
          }}>=</button
        >
        <button
          type="button"
          on:click={() => {
            cost = 100;
            costString = String(cost);
          }}>c</button
        >
      </div>
    </label>
    <span class="error">{parseError == null ? " " : parseError}</span>
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

  .input-wrapper {
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 10px;
  }

  .input-wrapper button {
    background-color: hsl(0, 0%, 30%);
    border: none;
    padding: 5px;
    line-height: 1em;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }

  .error {
    color: hsl(0, 100%, 66%);
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
