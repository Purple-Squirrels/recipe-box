import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles/index";
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import DisplayDBRecipeListComponent from './Components/DisplayDBRecipeListComponent';
import CreateRecipe from './Components/CreateRecipe';
import EditRecipeComponent from './Components/EditRecipeComponent';

const useStyles = makeStyles(() => ({
    recipeTitle: {
        textAlign: "center",
    },
    button: {
        float: 'right',
        margin: '1%',
    },
}));

export default () => {
  const match = useRouteMatch();
  const classes = useStyles();

  return (
    <Switch>
      <Route path={[`${match.path}/create/:recipe_id`, `${match.path}/create`]}  component={CreateRecipe} />
      <Route path={`${match.path}/edit/:recipe_id`}>
          <Link to="/recipe/create">
              <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<AddCircleOutlineIcon />}
              >Create New Recipe
              </Button>
          </Link>
          <EditRecipeComponent />
      </Route>
      <Route path={match.path}>
          <Container maxWidth="sm">
              <h1 className={classes.h1}>Your Recipes</h1>
              <Link to="/recipe/create">
                  <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<AddCircleOutlineIcon />}
                  >Create New Recipe
                  </Button>
              </Link>
              <DisplayDBRecipeListComponent />
          </Container>
      </Route>
    </Switch>
  );
};