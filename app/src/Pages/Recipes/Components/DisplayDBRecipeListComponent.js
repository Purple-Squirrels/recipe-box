import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {makeStyles, withStyles} from "@material-ui/core/styles/index";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CustomSnackBar from '../../../Shared/CustomSnackBar/CustomSnackBar';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    head: {
        backgroundColor: theme.palette.primary.main,
        color: "#FFFFFF",
    },
}));

export default () => {
    const [recipes, setRecipes] = useState([]);
    const [load, setLoad] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState(false);
    const [snackBarVariant, setSnackBarVariant] = useState(false);

    const classes = useStyles();

    const fetchRecipes = async () => {
        const response = await fetch('/recipes');
        const body = await response.json();
        return body;
    };

    const deleteRecipe = async (recipe) => {
        const settings = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                user: 'emma'
            }
        };

        try {
            setLoad(false);
            const fetchResponse = await fetch(`/recipes/${recipe.recipe_id}`, settings);
            const data = await fetchResponse.json();
            if (data.nodeStatus === 200) {
                buildSuccessfulDeleteSnackBar(recipe.recipe_name);
            } else {
                buildFailedDeleteSnackBar(recipe.recipe_name);
            }
            setLoad(true);
        } catch(err) {
            return err;
        }
    };

    const buildSuccessfulDeleteSnackBar = (name) => {
        setSnackBarMessage(`Successfully Deleted: ${name}`);
        setOpenSnackBar(true);
        setSnackBarVariant('success');
    };

    const buildFailedDeleteSnackBar = (name) => {
        setSnackBarMessage(`Failed to Delete: ${name}`);
        setOpenSnackBar(true);
        setSnackBarVariant('failed');
    };

    const closeSnackBar = () => {
        setOpenSnackBar(false);
    };

    useEffect(() => {
        fetchRecipes()
        .then(body => {
            setRecipes(body.Items);
            setLoad(true);
        })
        .catch(() => {
            setLoad(true);
        });
    }, [load]);

    if (load) {
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.head}>Recipe Name</TableCell>
                                <TableCell className={classes.head}>Description</TableCell>
                                <TableCell className={classes.head}></TableCell>
                                <TableCell className={classes.head}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recipes.map((recipe, index) =>
                                <TableRow hover key={index}>
                                    <TableCell component="th" scope="row">{recipe.recipe_name}</TableCell>
                                    <TableCell component="th" scope="row">{recipe.description}</TableCell>
                                    <TableCell component="th" scope="row">
                                        <Link to={"/recipe/edit/" + recipe.recipe_id}>
                                            <IconButton>
                                                <EditIcon />
                                            </IconButton>
                                        </Link>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <IconButton onClick={() => {deleteRecipe(recipe)}}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <CustomSnackBar message={snackBarMessage}
                                 variant={snackBarVariant}
                                 closeSnackBar={closeSnackBar}
                                 open={openSnackBar}/>
            </div>
        );
    } else {
        return(
            <div>
                <LinearProgress />
            </div>
        );
    }
}