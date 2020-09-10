import { Box, Image, Stack } from 'grommet'
import React from 'react'

import SplashBar from '../components/splashSidebar'

export default () => (
    <Stack fill guidingChild='last' interactiveChild='first'>
        <SplashBar />
        <Box fill={true} >
            <Image
                fill='vertical' fit='cover' src='https://media3.s-nbcnews.com/j/newscms/2019_41/3044956/191009-cooking-vegetables-al-1422_ae181a762406ae9dce02dd0d5453d1ba.fit-2000w.jpg' />
        </Box>
    </Stack>
)