import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { productsAPI } from '../api/productsAPI'

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

function AddCategory() {
    const classes = useStyles()
    const { handleSubmit, control } = useForm()

    const onSubmit = async data => {
        console.log(data)
        const response = await productsAPI.addCategory({ categoryTitle: data.category })
        console.log(response)
    }

    return (
        <form className={classes.form} noValidate>
            <Controller
                defaultValue=''
                as={
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='category'
                        label='Inter category name'
                        name='category'
                        autoComplete='category'
                        autoFocus
                    />
                }
                name='category'
                control={control}
            />

            <Button
                type='button'
                onClick={handleSubmit(onSubmit)}
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
            >
                Добавить
            </Button>
        </form>
    )
}

export default AddCategory
