import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HealthCard from './pages/healthCard/healthCard';
import { Register, Landing, Error, ProtectedRoute } from './pages';
import { useAppContext } from './context/appContext.js'
import {
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
  AddJob,
  Stats_admin,
} from './pages/dashboard';



function App({ userType }) {
  const {user } = useAppContext()
  
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          
          <Route index element={<Stats_admin />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
          <Route path="/healthcard/:motorId" element={<HealthCard />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
