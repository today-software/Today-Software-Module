import React from 'react';
import { Routes ,Route } from 'react-router-dom';
import FourOhFour from './containers/404/404';
import Home from './containers/Home/home';

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            {/* Finally, catch all unmatched routes */}
            <Route path="*" element={<FourOhFour />}/>
        </Routes>    );
}