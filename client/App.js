import { hot } from 'react-hot-loader';
import React from 'react';
import MainRouter from './MainRouter';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';

const App = function() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <MainRouter/>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default hot(module)(App);