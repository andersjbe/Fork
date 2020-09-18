import { Main } from 'grommet'
import React from 'react'

import Navbar from '../components/Navbar'

export default function PageLayout({ page: Page }) {
    return (<>
        <Navbar />
        <Main margin='small' align='center'>
            <Page />
        </Main>
    </>)
}