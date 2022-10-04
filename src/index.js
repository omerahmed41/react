import logo from './logo192.png';
// import './App.css';
import React from 'react';
import { useState, useEffect  } from 'react';
import ReactDOM from 'react-dom/client';
import Car from './Car.js';
import MyForm from './Form.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";

function Timer() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setCount((count) => count + 1);
        }, 1000);
    });

    return <h1>I've rendered {count} times!</h1>;
}
function Football() {
    const shoot = (a, b) => {
        alert(a + b.type);
        /*
        'b' represents the React event that triggered the function,
        in this case the 'click' event
        */
    }

    return (
        <button onClick={(event) => shoot("Goal!", event)}>Take the shot!</button>
    );
}

function App() {
    const cars = [
        {id: 1, brand: 'Ford'},
        {id: 2, brand: 'BMW'},
        {id: 3, brand: 'Audi'}
    ];
    return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="blogs" element={<Blogs />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter> );
            <h1>Who lives in my Garage?</h1>
            {/*<Car brand="red"/>*/}
            {cars.map((car) => <Car carId={car.id} brand={car.brand} />)}
            <Football />
            <MyForm />
            <FavoriteColor />
            <Timer />
        </>
    );
}

function FavoriteColor() {
    const [color, setColor] = useState("red");

    return (
        <>
            <h1>My favorite color is {color}!</h1>
            <button
                type="button"
                onClick={() => setColor("blue")}
            >Blue</button>
            <button
                type="button"
                onClick={() => setColor("red")}
            >Red</button>
            <button
                type="button"
                onClick={() => setColor("pink")}
            >Pink</button>
            <button
                type="button"
                onClick={() => setColor("green")}
            >Green</button>
        </>
    );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

