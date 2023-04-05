import { useState } from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Chat from './components/Chat';
import Admin from "./components/Admin";
import NotFound from './pages/NotFound';

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chat/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
