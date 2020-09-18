import { Main } from 'grommet'
import React from 'react'
import { Switch } from 'react-router-dom'

import Navbar from '../components/Navbar'

export default function PageLayout() {
    return(<>
        <Navbar />
        <Main margin='small'>
            <Switch>
                
            </Switch>
        </Main>
    </>)
}