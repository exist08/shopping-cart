import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'jotai';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Order from './pages/Order';

function App() {
  return (
    <Provider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<Order />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
