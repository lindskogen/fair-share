import { useState } from "react";
import "./App.css";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

const formatter = new Intl.NumberFormat(undefined, {
  currency: "SEK",
  style: "currency",
});

function App() {
  const [hidden, setHidden] = useLocalStorageState("hidden", false);
  const [p1, setP1] = useLocalStorageState("p1", 1);
  const [p2, setP2] = useLocalStorageState("p2", 1);
  const [cost, setCost] = useState(100);

  return (
    <div className="App">
      <div className="settings">
        <label>
          <input
            type="checkbox"
            checked={hidden}
            onChange={() => setHidden((h) => !h)}
          />
          {" Hide sensitive data"}
        </label>
      </div>
      <div hidden={hidden}>
        <label>
          How much do you make?
          <br />
          <input
            type={"number"}
            value={p1}
            onChange={(e) => setP1(e.currentTarget.valueAsNumber)}
          />
        </label>
      </div>

      <div hidden={hidden}>
        <label>
          How much does your partner make?
          <br />
          <input
            type={"number"}
            value={p2}
            onChange={(e) => setP2(e.currentTarget.valueAsNumber)}
          />
        </label>
      </div>

      <div>
        <label>
          What is the cost of the thing?
          <br />
          <input
            type={"number"}
            value={cost}
            onChange={(e) => setCost(e.currentTarget.valueAsNumber)}
          />
        </label>
      </div>

      <div>
        <div>You will pay: {formatter.format((p1 / (p1 + p2)) * cost)}</div>
        <div>
          Your partner will pay: {formatter.format((p2 / (p1 + p2)) * cost)}
        </div>
      </div>
    </div>
  );
}

export default App;
