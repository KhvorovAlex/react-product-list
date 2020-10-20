import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

export default function SignUp() {
    const classes = useStyles()
    const history = useHistory()

    const { handleSubmit, control } = useForm()

    const onSubmit = ({ firstName, lastName, email, password, promo }, e) => {
        e.preventDefault()
        const body = {
            email,
            password,
            firstName,
            lastName,
            promo,
        }
        axios.post('http://localhost:3001/register', body).then(data => {
            if (data.status === 200) {
                history.push('/')
            }
        })
    }

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign up
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                defaultValue=''
                                as={
                                    <TextField
                                        value=''
                                        autoComplete='fname'
                                        name='firstName'
                                        variant='outlined'
                                        required
                                        fullWidth
                                        id='firstName'
                                        label='First Name'
                                        autoFocus
                                    />
                                }
                                name='firstName'
                                control={control}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                defaultValue=''
                                as={
                                    <TextField
                                        value=''
                                        variant='outlined'
                                        required
                                        fullWidth
                                        id='lastName'
                                        label='Last Name'
                                        name='lastName'
                                        autoComplete='lname'
                                    />
                                }
                                name='lastName'
                                control={control}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                defaultValue=''
                                as={
                                    <TextField
                                        value=''
                                        variant='outlined'
                                        required
                                        fullWidth
                                        id='email'
                                        label='Email Address'
                                        name='email'
                                        autoComplete='email'
                                    />
                                }
                                name='email'
                                control={control}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                defaultValue=''
                                as={
                                    <TextField
                                        value=''
                                        variant='outlined'
                                        required
                                        fullWidth
                                        name='password'
                                        label='Password'
                                        type='password'
                                        id='password'
                                        autoComplete='current-password'
                                    />
                                }
                                name='password'
                                control={control}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Controller
                                        defaultValue={false}
                                        name='promo'
                                        control={control}
                                        render={props => (
                                            <Checkbox
                                                value='allowExtraEmails'
                                                onChange={e => props.onChange(e.target.checked)}
                                                checked={props.value}
                                                color='primary'
                                            />
                                        )}
                                    />
                                }
                                label='I want to receive inspiration, marketing promotions and updates via email.'
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Link to='/' variant='body2'>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}
