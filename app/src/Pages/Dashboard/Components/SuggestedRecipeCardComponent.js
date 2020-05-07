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
        width: 700,
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

    const ingredientsDetails = (ingredients) =>{
        let cleanList = "";
        if(ingredients.length > 1){
            for(let i=0; i<ingredients.length; i++){
                cleanList = cleanList + ingredients[i].toString() + ', ';
            }
            cleanList = cleanList.substring(0, cleanList.length - 2);
            
        }
        else{
            cleanList = "N/A";
        }
        return cleanList;
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
                                <b>Description:</b><br/> {props.recipe.description ? props.recipe.description : 'N/A'}<br/><br/>
                                <b>Cook Time:</b> {props.recipe.cook_time ? props.recipe.cook_time : 'N/A'}<br/><br/>
                                <b>Servings:</b> {props.recipe.servings ? props.recipe.servings : 'N/A'}<br/><br/>
                                <b>Ingredients:</b><br/> {ingredientsDetails(props.recipe.ingredients)}<br/><br/>
                                <b>Directions:</b><br/> {props.recipe.directions ? props.recipe.directions : 'N/A'}<br/>
                            </p>
                            
                        </div>
                    </Modal>
            </CardActions>
        </Card>
    );
}