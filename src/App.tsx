// App.tsx
import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import store from './redux/store';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';

// import './index.css'; // Uncomment and update the path if index.css exists, or remove this line if not needed.

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-[url('/assets/anime-bg.jpg')] bg-cover bg-fixed text-gray-800">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;

