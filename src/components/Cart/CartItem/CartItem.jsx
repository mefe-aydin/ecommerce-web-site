import React from 'react'
import {Typography, Button, Card, CardActions, CardContent, CardMedia} from "@material-ui/core"

import useStyles from "./styles";

const CartItem = ({item}) => {
    const classes = useStyles();
    return (
        <Card>
            <CardMedia image={item.img.url} alt={item.name} className={classes.img} />
            <CardContent className={classes.cardContent}>
                <Typography variant="h4">{item.name}</Typography>
                <Typography variant="h5">{item.line_total.formatted_with_code}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button type="button" size="small">-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type="button" size="small">+</Button>
                </div>
            </CardActions>
        </Card>
    )
}

export default CartItem
