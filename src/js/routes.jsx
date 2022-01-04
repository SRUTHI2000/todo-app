import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate,Outlet } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import TodoWrapper from './components/todo-wrapper/todoWrapper.jsx';

const RoutesforApp = () => {

    function PrivateOutlet() {
        const auth = localStorage.getItem("isAuthenticated");
        return auth ? <Outlet /> : <Navigate to="/login" />;
      }

return (
    <Router>
        <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={<Signup />} />
            <Route exact path="/todoapp" element={<PrivateOutlet />}>
                <Route path="" element={<TodoWrapper />}/>
            </Route>
        </Routes>
    </Router>
);
};

export default RoutesforApp;