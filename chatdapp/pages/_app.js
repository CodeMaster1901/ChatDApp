import '..styles/globals.css'
import { Component } from 'react'

const Myapp = ({Component, pageProps}) => (
    <div>
        <Component {...pageProps} />
    </div>
);

export default MyApp