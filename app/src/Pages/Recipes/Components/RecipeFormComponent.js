import React, { useEffect, useState, Fragment } from 'react';
import {Redirect, useRouteMatch} from "react-router-dom";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import globalFormStyles from '../../../GlobalFormStyles';
import { getSessionCookie } from '../../../Sessions';


export default (props) => {
    const formClasses = globalFormStyles();
    const match = useRouteMatch();
    const [session, setSession] = useState(getSessionCookie());
    useEffect(
      () => {
        setSession(getSessionCookie());
      },
      [session.userName]
    );

    const[recipe_id, setRecipeID] = useState('');
    const [recipe_name, setRecipeName] = useState('');
    const [description, setDescription] = useState('');
    const [cook_time, setCookTime] = useState('');
    const [prep_time, setPrepTime] = useState('');
    const [servings, setServings] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [directions, setDirections] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [cancellationFire, setCancellationFire] = useState(false);

    useEffect(() => {
        if (props.recipeDetails && props.recipeDetails.recipe_name) {
            handleRecipeNameConversion(props.recipeDetails.recipe_name);
            setRecipeName(props.recipeDetails.recipe_name);
            setDescription(props.recipeDetails.description || '');
            setCookTime(props.recipeDetails.cook_time);
            setPrepTime(props.recipeDetails.prep_time || '');
            setServings(props.recipeDetails.servings);
            setIngredients(props.recipeDetails.ingredients || ['']);
            setDirections(props.recipeDetails.directions);
            setDisabled(match.path === "/recipe/edit");
        }
    }, [props, match]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const confirmationString = `Recipe name: ${recipe_name}\nRecipe ID: ${recipe_id}\nRecipe Description: ${description}\nCook Time: ${cook_time}\nPrep Time:${prep_time}\nServings: ${servings}\nIngredients: ${ingredients}\nDirections: ${directions}`;
        if (window.confirm(confirmationString)) {
            saveRecipe();
        }
    };

    const cancelForm = (e) => {
        e.preventDefault();
        setCancellationFire(true);
    };

    const handleRecipeName = (e) => {
        setRecipeName(e.target.value);
        handleRecipeNameConversion(e.target.value);
    };

    const handleRecipeNameConversion = (recipe_name) => {
        setRecipeID(recipe_name.toLowerCase().split(' ').join('_'));
    };

    const handleAddIngredients = () => {
        const values = [...ingredients];
        values.push('');
        setIngredients(values);
    };

    const handleRemoveIngredients = () => {
        const values = [...ingredients];
        if (values.length > 1) {
            values.pop();
            setIngredients(values);
        }
    };

    const handleIngredientChange = (index,event) => {
        const values = [...ingredients];
        values[index] = event.target.value;
        setIngredients(values);
    };

    const saveRecipe = async() => {
        const data = {
            recipe_id: recipe_id,
            recipe_name: recipe_name,
            description: description,
            cook_time: cook_time,
            prep_time: prep_time,
            servings: servings,
            ingredients: ingredients,
            directions: directions,
            userName: session.authToken,
        };
        props.allDetails(data);
    };

    if (cancellationFire) {
        return <Redirect push to="/recipe" />
    }

    return (
        <form className={formClasses.form} onSubmit={handleSubmit}>
            <Card className={formClasses.root}>
                <CardContent>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        disabled={disabled}
                        fullWidth
                        value={recipe_name}
                        label="Recipe Name"
                        onChange={e => handleRecipeName(e)}/>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows="4"
                        fullWidth
                        value={description}
                        label="Recipe Description"
                        onChange={e => setDescription(e.target.value)}/>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={cook_time}
                        label="Cook Time"
                        onChange={e => setCookTime(e.target.value)}/>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={prep_time}
                        label="Prep Time"
                        onChange={e => setPrepTime(e.target.value)}/>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={servings}
                        label="Servings"
                        onChange={e => setServings(e.target.value)}/>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        multiline
                        required
                        rows="10"
                        fullWidth
                        value={directions}
                        label="Directions"
                        onChange={e => setDirections(e.target.value)}/>
                    <h3>Ingredients</h3>
                    {ingredients.map((ingredient,index) => (
                        <Fragment key={`${index}`}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                value={ingredient}
                                label="Ingredient"
                                onChange={event => handleIngredientChange(index, event)}/>
                        </Fragment>
                    ))}
                    <div className="form-group col-sm-2">
                        <IconButton onClick={() => handleRemoveIngredients()}>
                            <RemoveCircleIcon />
                        </IconButton>
                        <IconButton onClick={() => handleAddIngredients()}>
                            <AddCircleIcon />
                        </IconButton>
                    </div>
                </CardContent>
            </Card>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={formClasses.submit}>
                Save Recipe
            </Button>
            <Button
                type="button"
                fullWidth
                className={formClasses.submit}
                variant="contained"
                color="secondary"
                onClick={cancelForm}>
                Cancel
            </Button>
        </form>
    );
}
