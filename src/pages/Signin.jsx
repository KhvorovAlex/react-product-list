//libraries
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { loginUser } from '../store/auth'
//components
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

export default function SignIn() {
    const classes = useStyles()

    const dispatch = useDispatch()
    const history = useHistory()

    const { handleSubmit, control } = useForm()

    const onSubmit = async ({ email, password }) => {
        const login = dispatch(loginUser({ email, password }))
        if (login) {
            history.push('/home')
        }
    }

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign in
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
                    <Controller
                        defaultValue=''
                        as={
                            <TextField
                                variant='outlined'
                                margin='normal'
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                name='email'
                                autoComplete='email'
                                autoFocus
                            />
                        }
                        name='email'
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

                    <FormControlLabel
                        control={
                            <Controller
                                defaultValue={false}
                                name='remember'
                                control={control}
                                render={props => (
                                    <Checkbox
                                        value='remember'
                                        color='primary'
                                        onChange={e => props.onChange(e.target.checked)}
                                        checked={props.value}
                                    />
                                )}
                            />
                        }
                        label='Remember me'
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to='/signup' variant='body2'>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}
