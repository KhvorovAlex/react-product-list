import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    hide: {
        opacity: 0.5,
    },
})

export default function ProductItem({ item, addedCount, alreadyPurchased, addItemToCart }) {
    const classes = useStyles()

    const handleOnClick = () => {
        const obj = {
            id: item.id,
            name: item.name,
            imageUrl: item.imageUrl,
            price: item.price,
        }
        addItemToCart(obj)
    }

    const handleClickAlredyPurchased = () => {
        alreadyPurchased(item.id)
    }

    return (
        <Card className={classes.root}>
            <CardActionArea
                className={item.alreadyPurchased && item.alreadyPurchased ? classes.hide : ''}
            >
                <CardMedia
                    className={classes.media}
                    image={item.imageUrl}
                    title='Contemplative Reptile'
                />
                <CardContent>
                    <Typography gutterBottom variant='h6' component='h2'>
                        {item.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Grid container justify='space-between'>
                    <Grid item>
                        <Button
                            onClick={handleOnClick}
                            variant='contained'
                            size='small'
                            color='primary'
                            disabled={item.alreadyPurchased && item.alreadyPurchased}
                        >
                            Добавить
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={handleClickAlredyPurchased}
                            variant='contained'
                            size='small'
                            color='secondary'
                        >
                            Куплено
                        </Button>
                    </Grid>
                    <Grid item>
                        <Typography
                            style={{ color: 'green' }}
                            gutterBottom
                            variant='h6'
                            component='h2'
                        >
                            {addedCount}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            style={{ color: 'gray' }}
                            gutterBottom
                            variant='h6'
                            component='h2'
                        >
                            {item.price} руб.
                        </Typography>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}
