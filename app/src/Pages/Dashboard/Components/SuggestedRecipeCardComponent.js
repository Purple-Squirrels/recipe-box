import React, { useState } from 'react';
import {makeStyles} from "@material-ui/core/styles/index";

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 500,
        fontSize: '1.5em',
        minWidth: 275,
        position: 'relative',
        height: '100%',
        '&:hover': {
            boxShadow: '0 0 15px rgba(0,0,0,.3)',
            transition: 'opacity .15s ease-out',
        },
    },
    cardTitle: {
        marginTop: "0",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    actions: {
        minHeight: 70,
    },
    moreButton: {
        position: 'absolute',
        bottom: '5%',
        right: '3%',
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor:'white',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
}));

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      overflow:'scroll',
      transform: `translate(-${top}%, -${left}%)`,
    };
}
  
export default (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [modalStyle] = useState(getModalStyle);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <div>
                    {props.recipe.recipe_name}
                </div>
            </CardContent>
            <CardActions className={classes.actions}>
                    <Fab className={classes.moreButton} color="primary" aria-label="add" onClick={handleOpen}>
                        <ArrowForwardIosIcon />
                    </Fab>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                         <div style={modalStyle} className={classes.paper}>
                            <h2 id="simple-modal-title">{props.recipe.recipe_name}</h2>
                            <p id="simple-modal-description">
                                ID: {props.recipe.recipe_id}
                                Description: {props.recipe.description}<br/>
                                Cook Time: {props.recipe.cook_time}<br/>
                                Servings: {props.recipe.servings}<br/>
                                Ingredients: {props.recipe.ingredients}<br/>
                                Directions: {props.recipe.directions}<br/>
                            </p>
                        </div>
                    </Modal>
            </CardActions>
        </Card>
    );
}