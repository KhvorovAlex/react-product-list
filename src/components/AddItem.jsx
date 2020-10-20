import React from 'react'
import { FormControl, Grid, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}))

const defaultProps = {
    imageUrl:
        'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/30367198-f3bd-44ed-9314-6f717960da07.jpg',
    rating: 7,
}

function AddItem() {
    const classes = useStyles()
    const { handleSubmit, control } = useForm()
    const category = useSelector(state => state.product.category)

    const onSubmit = async (data, e) => {
        e.preventDefault()
        const body = { ...data, ...defaultProps }
        const response = await productsAPI.addProducts(body)
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
                        id='name'
                        label='Item Name'
                        name='name'
                        autoComplete='name'
                        autoFocus
                    />
                }
                name='name'
                control={control}
            />
            <Controller
                defaultValue=''
                as={
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        name='price'
                        label='Price'
                        type='price'
                        id='price'
                        autoComplete='current-price'
                    />
                }
                type='number'
                name='price'
                control={control}
            />

            <Grid container>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Category</InputLabel>
                        <Controller
                            as={
                                <Select>
                                    {category &&
                                        category.map(item => {
                                            if (item.id !== 0) {
                                                return (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.categoryTitle}
                                                    </MenuItem>
                                                )
                                            }
                                        })}
                                </Select>
                            }
                            name='category'
                            control={control}
                        />
                    </FormControl>
                </Grid>
            </Grid>

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

export default AddItem
