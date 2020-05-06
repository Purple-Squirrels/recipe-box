import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';


import {makeStyles} from "@material-ui/core/styles/index";
import SuggestedRecipeCardComponent from './SuggestedRecipeCardComponent';


const useStyles = makeStyles({
    root: {
        fontFamily: "'Montserrat', sans-serif",
    },
    title: {
        textAlign: 'center',
    },
    loader: {
        width: '80%',
        margin: 'auto',
    },
});
export default () => {
    const classes = useStyles();

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSuggestedRecipes = async() => {
        const response = await fetch('/bigoven/recipes/random_details');
        const body = await response.json();
        return body;
    };

    useEffect(() => {
        fetchSuggestedRecipes()
            .then(body => {
                setRecipes(body.slice(0, 8));
                setLoading(false);
            })

    }, []);

    if (loading) {
        return (
            <Container className={classes.root}>
                <Divider variant="middle" />
                <h1 className={classes.title}>Explore New Recipes</h1>

                <LinearProgress className={classes.loader} />
            </Container>
        );
    } else {
        return (
            <Container className={classes.root}>
                <Divider variant="middle" />
                <h1 className={classes.title}>Explore New Recipes</h1>
                <Grid container spacing={3}>
                    {
                        recipes.map(recipe =>
                            <Grid key={recipe.recipe_id} item xs>
                                <SuggestedRecipeCardComponent recipe={recipe} />
                            </Grid>
                        )
                    }
                </Grid>
            </Container>
        );
    }
}