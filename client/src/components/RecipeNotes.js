import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Paragraph, TextArea } from 'grommet'
import { Avatar } from 'grommet-controls'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { apiUrl } from '../config'

export default function RecipeNotes(props) {
    const user = useSelector(state => state.auth)

    const [notes, setNotes] = useState(props.notes)
    const [editing, setEditing] = useState(null);
    const [editBody, setEditBody] = useState('')

    useEffect(() => {
        setNotes(props.notes)
    }, [props.notes])

    const updateNote = e => {
        if (editBody === '' || editing === null) {
            return 
        }

        (async () => {
            const res = await fetch(`${apiUrl}/notes/${editing}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({body: editBody})
            })

            if (res.ok) {
                const data = await res.json()
                setNotes(data.notes)
                setEditBody('')
                setEditing((null))
            }
        })()
    }

    const deleteNote = id => {

        (async () => {
            const res = await fetch(`${apiUrl}/notes/${id}`, {
                method: 'DELETE'
            })

            if (res.ok) {
                const data = await res.json()
                setNotes(data.notes)
            }
        })()
    }

    return (<>
        <Heading level={3}>Notes</Heading>
        <Box margin='xsmall' flex={false} alignSelf='center'>
            <RecipeNoteForm recipeId={props.recipeId} notes={notes} setNotes={setNotes} />
            {notes.map(note => (
                <Card key={note.id} width='large' pad='xsmall' margin='small' background='#fff'>
                    <CardHeader margin='xsmall'>
                        <Avatar
                            image={note.user.image_url}
                            title={`${note.user.first_name} ${note.user.last_name}`}
                        />
                    </CardHeader>


                    <CardBody margin='xsmall' pad='small'>
                        {editing === note.id ?
                            <TextArea
                                fill
                                resize={false}
                                value={editBody}
                                onChange={e => setEditBody(e.target.value)}
                            />
                            : <Paragraph fill>{note.body}</Paragraph>
                        }

                    </CardBody>

                    {
                        user.id === note.user.id ?
                            <CardFooter margin='xsmall'>
                                {
                                    editing === note.id ?
                                        <>
                                            <Button
                                                primary
                                                label='Submit'
                                                onClick={updateNote}
                                            />
                                            <Button 
                                                secondary
                                                label='Cancel'
                                                onClick={() => {
                                                    setEditing(null)
                                                    setEditBody('')
                                                }}
                                            />
                                        </>
                                        : <>
                                            <Button
                                                secondary
                                                label='Edit'
                                                onClick={() => {
                                                    setEditing(note.id)
                                                    setEditBody(note.body)
                                                }}
                                            />
                                            <Button
                                                primary
                                                color='red'
                                                label='Delete'
                                                onClick={() => deleteNote(note.id)}
                                            />
                                        </>
                                }
                            </CardFooter>
                            : null
                    }

                </Card>
            ))}
        </Box>
    </>)
}

function RecipeNoteForm({ recipeId, setNotes, notes }) {
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