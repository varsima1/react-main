import './App.css';
import Router from './Router';
import ScrollToTopButton from './Components/ScrollToTopButton';

function App() {
  return (
    <div className="App">
      {/* Header */}
      <Router/>
      {/* Footer */}
      <ScrollToTopButton />
    </div>
  );
}

export default App;
