import Phone from "./components/Phone";
import Route from "./components/Route";

function App() {
  return (
    <div className="App">
      <div className="phone-container">
        <Phone />
      </div>
      <div className="train-ride-container">
        <Route />
      </div>
    </div>
  );
}

export default App;
