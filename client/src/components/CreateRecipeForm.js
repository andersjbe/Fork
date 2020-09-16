import { Box, Button, Card, CardBody, CardFooter, CardHeader, FormField, Grid, Heading, Meter, Select, Text, TextArea, TextInput } from 'grommet'
import React, { useEffect, useState } from 'react'
import { AddCircle, SubtractCircle } from 'grommet-icons'

import { apiUrl } from '../config'
import { SESSION_ID } from '../store/users'
import { IconButton } from 'grommet-controls'

export default function CreatePetitionForm(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState(['', '', '', '', ''])
    const [instructions, setInstructions] = useState(['', '', ''])
    const [category, setCategory] = useState({ category: 'Asian', id: 1 })
    const userId = (localStorage.getItem(SESSION_ID))

    const formData = {
        title,
        description,
        ingredients: ingredients.filter(ingredient => ingredient).join(' | '),
        instructions: instructions.filter(instruction => instruction).join('\r\n'),
        categoryId: category.id,
        userId
    }

    const [view, setView] = useState(0)
    const nextView = () => {
        console.log(formData)
        setView(view + 1)
    }
    const lastView = () => setView(view - 1)

    const errors = []

    const submitForm = () => {
        const postRecipe = async () => {
            const body = JSON.stringify(formData)
            const res = fetch(`${apiUrl}/recipes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body
            })

            if (res.ok) {
                window.location = '/dashboard'
            } else {
                errors.push('Something went wrong, please try again later. We apologize for the inconvenience')
            }
        }
    }

    const formViews = [
        <DetailsView
            nextView={nextView}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            category={category}
            setCategory={setCategory}
        />,
        <IngredientsView
            nextView={nextView}
            lastView={lastView}
            ingredients={ingredients}
            setIngredients={setIngredients}
        />,
        <InstructionsView
            nextView={nextView}
            lastView={lastView}
            instructions={instructions}
            setInstructions={setInstructions}
        />,
        <SubmissionView />
    ]

    return (
        <Card
            width='large'
            height='large'
            pad='small'
            background="#fff"
        >
            <CardHeader>
                {errors.map((error, i) => (
                    <Text key={i} color='red'>{error}</Text>)
                )}
            </CardHeader>
            <CardBody overflow='auto' style={{ position: 'relative' }}>
                {formViews[view]}

            </CardBody>
            <CardFooter>
                <Meter
                    max={formViews.length}
                    values={[{ value: view + 1 }]}
                    alignSelf='center'
                    round
                    size="large"
                />
            </CardFooter>
        </Card>
    )
}

function DetailsView(props) {
    const [categories, setCategories] = useState([])

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

    return (
        <>
            <FormField label="Title">
                <TextInput
                    value={props.title}
                    onChange={e => props.setTitle(e.target.value)}
                />
            </FormField>

            <FormField label="Description">
                <TextArea
                    value={props.description}
                    onChange={e => props.setDescription(e.target.value)}
                    resize='vertical'
                />
            </FormField>

            <FormField label='Category'>
                <Select
                    options={categories}
                    valueKey='id'
                    labelKey='category'
                    value={props.category}
                    onChange={({ value }) => props.setCategory(value)}
                />
            </FormField>

            <div
                style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around' }}
            >
                {
                    props.title ?
                        <Button label="Next >" onClick={props.nextView} /> :
                        null
                }
            </div>
        </>
    )
}

function IngredientsView(props) {
    const addIngredient = () => props.setIngredients([...props.ingredients, ''])
    const removeIngredient = i => {
        const temp = [...props.ingredients]
        temp.splice(i, 1)
        props.setIngredients([...temp])
    }
    const updateIngredient = (value, i) => {
        const temp = [...props.ingredients]
        temp[i] = value
        props.setIngredients([...temp])
    }

    return (
        <>
            <Heading level={3} textAlign='center' alignSelf='center'>Ingredients</Heading>

            {props.ingredients.map((ingredient, i) => {
                return (
                    <Grid
                        columns={['5%', '90%', '5%']}
                        row={['100%']}
                        key={i}
                        margin='xsmall'
                    >
                        <Text alignSelf='center'>{1 + i}.</Text>
                        <TextInput
                            style={{ display: 'inline-block' }}
                            value={ingredient}
                            size='medium'
                            onChange={e => updateIngredient(e.target.value, i)}
                        />
                        <IconButton
                            icon={<SubtractCircle color="red" />}
                            alignSelf='end'
                            style={{ display: 'inline-block' }}
                            fill={false}
                            onClick={() => removeIngredient(i)}
                        />
                    </Grid>
                )
            })}

            <IconButton
                icon={<AddCircle color="brand" />}
                alignSelf='center'
                fill={false}
                onClick={addIngredient}
            />

            <div
                style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around' }}
            >
                <Button label="< Previous" onClick={props.lastView} />
                {
                    props.ingredients.filter(item => item).length > 0 ?
                        <Button label="Next >" onClick={props.nextView} /> :
                        null
                }
            </div>
        </>
    )
}

function InstructionsView(props) {


    const addInstruction = () => props.setInstructions([...props.instructions, ''])
    const removeInstruction = i => {
        const temp = [...props.instructions]
        temp.splice(i, 1)
        props.setInstructions([...temp])
    }
    const updateInstruction = (value, i) => {
        const temp = [...props.instructions]
        temp[i] = value
        props.setInstructions([...temp])
    }

    return (
        <>
            <Heading level={3} textAlign='center' alignSelf='center'>
                Instructions
            </Heading>
            {props.instructions.map((instruction, i) => {
                return (
                    <Grid
                        columns={['5%', '90%', '5%']}
                        row={['100%']}
                        margin='xsmall'
                        key={i}
                    >
                        <Text alignSelf='center'>{1 + i}.</Text>
                        <TextArea
                            style={{ display: 'inline-block' }}
                            resize='vertical'
                            value={instruction}
                            size='medium'
                            onChange={e => updateInstruction(e.target.value, i)}
                        />
                        <IconButton
                            icon={<SubtractCircle color="red" />}
                            alignSelf='center'
                            style={{ display: 'inline-block' }}
                            fill={false}
                            onClick={() => removeInstruction(i)}
                        />

                    </Grid>
                )
            })}

            <IconButton
                icon={<AddCircle color="brand" />}
                alignSelf='center'
                fill={false}
                onClick={addInstruction}
            />

            <div
                style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around' }}
            >
                <Button label="< Previous" onClick={props.lastView} />
                {
                    props.instructions.filter(item => item).length > 0 ?
                        <Button label="Next >" onClick={props.nextView} /> :
                        null
                }
            </div>
        </>
    )
}

function SubmissionView(props) {

}