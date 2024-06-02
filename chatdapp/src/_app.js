import '..styles/globals.css'
import { Component } from 'react'

//internal imports
import { ChatDAppProvider } from '../Context/ChatAppContext';
import { NavBar } from '../Components/index';

const Myapp = ({Component, pageProps}) => (
    <div>
        <ChatDAppProvider>
            <Component {...pageProps} />
        </ChatDAppProvider>
    </div>
);

export default MyApp