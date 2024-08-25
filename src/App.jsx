import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout, ProtectedRouter } from './components';
import { Home, Login, Signup } from './pages';

const App = () => {
 const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route 
            path="/" 
            element={
              <ProtectedRouter isAuthenticated={isAuthenticated}>
                <Home />
              </ProtectedRouter>
            } 
          />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
