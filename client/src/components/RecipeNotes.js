import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Paragraph, TextArea } from 'grommet'
import { Avatar } from 'grommet-controls'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { apiUrl } from '../config'

export default function RecipeNotes(props) {
    const [notes, setNotes] = useState(props.notes)

    useEffect(() => {
        setNotes(props.notes)
    }, [props.notes])

    return (<>
        <Heading level={3}>Notes</Heading>
        <Box margin='xsmall' flex={false} alignSelf='center'>
            <RecipeNoteForm recipeId={props.recipeId} notes={notes} setNotes={setNotes} />
            {notes.map(note => (
                <Card width='large' pad='xsmall' margin='small' background='#fff'>
                    <CardHeader margin='xsmall'>
                        <Avatar
                            image={note.user.image_url}
                            title={`${note.user.first_name} ${note.user.last_name}`}
                        />
                    </CardHeader>

                    <CardBody margin='xsmall' pad='small'>
                        <Paragraph fill>{note.body}</Paragraph>
                    </CardBody>

                </Card>
            ))}
        </Box>
    </>)
}

function RecipeNoteForm({ recipeId, setNotes, notes }) {
    console.log(notes)
    const user = useSelector(state => state.auth)
    const [noteBody, setNoteBody] = useState('')

    const submitNote = () => {
        if (!noteBody) {
            return
        }

        const postNote = async () => {
            const body = JSON.stringify({
                userId: user.id,
                body: noteBody
            })

            const res = await fetch(`${apiUrl}/recipes/${recipeId}/notes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body
            })

            if (res.ok) {
                setNoteBody('')
                const { note } = await res.json()
                setNotes([note, ...notes])
            } else {
                console.log(res)
            }
        }

        postNote()
    }

    return (
        <Card width='large' height='medium' pad='xsmall' margin='small' background='#fff'>
            <CardHeader margin='xsmall'>
                <Avatar
                    image={user.image_url}
                    title={`${user.first_name} ${user.last_name}`}
                />
            </CardHeader>

            <CardBody margin='xsmall'>
                <TextArea
                    fill
                    resize={false}
                    value={noteBody}
                    onChange={e => setNoteBody(e.target.value)}
                />
            </CardBody>

            <CardFooter margin='xsmall'>
                <Button label='Submit' primary onClick={submitNote} />
            </CardFooter>
        </Card>
    )
}