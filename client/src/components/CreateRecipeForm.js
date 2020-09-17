import { Box, Image, Button, Card, CardBody, CardFooter, CardHeader, FormField, Grid, Heading, Meter, Select, Text, TextArea, TextInput, Paragraph, List } from 'grommet'
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
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreivew] = useState('https://andersjbe-fork.s3-us-west-1.amazonaws.com/unnamed.jpg');

    const formData = {
        title,
        description,
        ingredients: ingredients.filter(ingredient => ingredient).join(' | '),
        instructions: instructions.filter(instruction => instruction).join('\r\n'),
        categoryId: category.id,
        userId,
        file: image
    }

    const [view, setView] = useState(0)
    const nextView = () => {
        console.log(formData)
        setView(view + 1)
    }
    const lastView = () => setView(view - 1)

    const [errors, setErrors] = useState([])

    const validateForm = () => {
        const tmp = [...errors]
        if (title.length === 0 && errors.indexOf('Title must have a value') === -1) {
            tmp.push('Title must have a value')
        }
        if (ingredients.filter(ingredient => ingredient).length === 0 && errors.indexOf('You must enter at least one ingredient') === -1) {
            tmp.push('You must enter at least one ingredient')
        }
        if (instructions.filter(instruction => instruction).length === 0 && errors.indexOf('You must enter at least one instruction') === -1) {
            tmp.push('You must enter at least one instruction')
        }
        setErrors(tmp)
    }

    const submitForm = () => {
        validateForm()
        if (errors.length > 0) {
            return
        }

        const postRecipe = async () => {
            const body = new FormData()
            Object.keys(formData).forEach(key => body.append(key, formData[key]))
            const res = fetch(`${apiUrl}/recipes`, {
                method: 'POST',
                body
            })
            console.log((await res).ok)
            if ((await res).ok) {
                window.location = '/dashboard'
            } else {
                setErrors([...errors, 'Something went wrong, please try again later. We apologize for the inconvenience'])
            }
        }

        postRecipe()
    }

    const formViews = [
        <DetailsView
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            category={category}
            setCategory={setCategory}
        />,
        <IngredientsView
            ingredients={ingredients}
            setIngredients={setIngredients}
        />,
        <InstructionsView
            instructions={instructions}
            setInstructions={setInstructions}
        />,
        <ImageView
            setImage={setImage}
            imagePreview={imagePreview}
            setImagePreivew={setImagePreivew}
        />,
        <SubmissionView
            title={title}
            imagePreview={imagePreview}
            category={category}
            description={description}
            ingredients={ingredients.filter(ing => ing)}
            instructions={instructions.filter(ins => ins)}
        />
    ]

    return (
        <Card
            width='large'
            height='large'
            pad='small'
            background="#fff"
        >
            <CardHeader>
                <Meter
                    max={formViews.length}
                    values={[{ value: view + 1 }]}
                    round
                    size="xlarge"
                />
            </CardHeader>
            <CardBody overflow='auto' style={{ position: 'relative' }}>
                <ul>
                    {errors.map((error, i) => (
                        <li key={i} style={{ color: 'red' }}>{error}</li>)
                    )}
                </ul>

                {formViews[view]}
            </CardBody>
            <CardFooter>
                {view > 0 ? <Button label="< Previous" onClick={lastView} /> : <Box />}
                {view < formViews.length - 1 ? <Button label="Next >" onClick={nextView} /> : null}
                {view === formViews.length - 1 ? <Button label='Submit' onClick={() => submitForm()} primary /> : null}
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

        </>
    )
}

function ImageView(props) {

    const onChange = e => {
        props.setImage(e.target.files.item(0))
        try {
            props.setImagePreivew(URL.createObjectURL(e.target.files.item(0)))
        } catch (e) {
            props.setImagePreivew('https://andersjbe-fork.s3-us-west-1.amazonaws.com/unnamed.jpg')
        }
    }

    return (<>
        <Heading level={3} textAlign='center' alignSelf='center'>
            Recipe Image
        </Heading>

        <input type='file' onChange={onChange} accept='image/*' />

        <Box pad='small' height="small" width="medium" fill={true} >
            <Image
                fit="contain"
                src={props.imagePreview}
                alignSelf='center'
            />
        </Box>



    </>)
}

function SubmissionView(props) {
    return (
        <>
            <Heading level={3} textAlign='center' alignSelf='center'>
                {props.title}
            </Heading>

            <Box height="medium" width="medium" alignSelf='center' round='medium'>
                <Image
                    fit="contain"
                    src={props.imagePreview}
                    alignSelf='center'
                />
            </Box>

            <Paragraph>
                {props.description}
            </Paragraph>

            <List
                alignSelf='center'
                data={props.ingredients.map((ing, i) => ({ ingredient: ing }))}
            />

            <List
                alignSelf='center'
                data={props.instructions.map((ins, i) => ({ order: i + 1, ins: ins }))}
                primaryKey='order'
                secondaryKey='ins'
            />

        </>
    )
}