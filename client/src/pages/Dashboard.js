import React from 'react'

import Feed from '../components/RecipeFeed'
import Navbar from '../components/Navbar'
import { Main } from 'grommet'

export default function Dashboard(props) {
    return (<>
        <Navbar />
        <Main margin='small'>
            <h1>Dashboard</h1>
            <Feed search='e' />
        </Main>
    </>)
}
