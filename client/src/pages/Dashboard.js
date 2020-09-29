import React, { useEffect, useState } from 'react'
import { Heading, Box } from 'grommet'
import { Tag } from 'grommet-controls'

import { apiUrl } from '../config'
import { useHistory } from 'react-router-dom'

export default function Dashboard(props) {
    const [categories, setCategories] = useState([])
    const history = useHistory()

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch(`${apiUrl}/categories`)
            if (res.ok) {
                const data = await res.json()
                setCategories(data.categories)
            }
        }

        fetchCategories()
    }, [])


    return (<>
        <>
            <Heading level={1}>Welcome to Fork</Heading>
            <Heading level={3}>Categories</Heading>

            <Box direction='row' wrap justify='center'>
                {categories.map((category, i) => (
                    <Tag label={category.category} key={i} 
                        margin='xsmall' size='large' round='medium' 
                        pad='xsmall' background='accent-2' 
                        onClick={() => history.push(`/browse?category=${category.category}`)}
                    />
                ))}
            </Box>
        </>
    </>)
}
