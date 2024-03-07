import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import NavigationBar from './components/organisms/NavigationBar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Overview from './components/pages/Overview';
import MyAccount from './components/pages/MyAccount';
import Settings from './components/pages/Settings';
import Contact from './components/pages/Contact';
import { QueryClient, QueryClientProvider } from 'react-query';
import Calendar from './components/pages/Calendar';

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
      <QueryClientProvider client={queryClient}>
        <NavigationBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/overview' element={<Overview/>}/>
          <Route path='calendar' element={<Calendar/>}/>
          <Route path='/account' element={<MyAccount/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Routes>
      </QueryClientProvider>
  );
}

export default App;
