import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import JourneyList from './components/journeyList';
import StationList from './components/stationList';
import NavigationBar from './components/navigationBar';


const App = () => {
    return (
        <Container className="App">
            <BrowserRouter>
                <NavigationBar />
                <Routes>
                    <Route path="/journeys/:page" element={<JourneyList />} />
                    <Route path="/stations/:page" element={<StationList />} />
                    <Route path="/" element={<header>Front page</header>} />

                    { /* Redirect to the front page if no URL match was found. */ }
                    <Route path="/*" element={<Navigate to={"/"} />} />
                </Routes>
            </BrowserRouter>
        </Container>
    );
};

export default App;