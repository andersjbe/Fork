import { Main, Box } from 'grommet'
import React from 'react'

import Navbar from '../components/Navbar'

export default function PageLayout({ page: Page }) {
    return (<Box height='95%'>
        <Navbar />
        <Main width='100'  align='center' flex={false} fill>
            <Page />
        </Main>
        
    </Box>)
}