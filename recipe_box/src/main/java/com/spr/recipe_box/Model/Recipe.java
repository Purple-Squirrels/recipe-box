package com.spr.recipe_box.Model;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Recipe {
    private String recipe_name;
    private String recipe_id;
    private String description;
    private String cook_time;
    private String prep_time;
    private String servings;
    List <String> ingredients = new ArrayList<>();
    private String directions;

    public Recipe(){
    }

    public Recipe(String recipe_name,
                  String recipe_id,
                  String description,
                  String cook_time,
                  String prep_time,
                  String servings,
                  String directions) {
        this.recipe_name = recipe_name;
        this.recipe_id = recipe_id;
        this.cook_time = cook_time;
        this.prep_time = prep_time;
        this.servings = servings;
        this.description = description;
        this.directions = directions;
    }

    public String getRecipe_id() {
        return recipe_id;
    }

    public String getRecipe_name() {
        return recipe_name;
    }

    public String getCook_time() {
        return cook_time;
    }

    public String getPrep_time() {
        return prep_time;
    }

    public String getServings() {
        return servings;
    }

    public String getDescription() {
        return description;
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public String getDirections() {
        return directions;
    }

    public void setRecipe_name(String recipe_name) { this.recipe_name = recipe_name; }

    public void setRecipe_id(String recipe_id) { this.recipe_id = recipe_id; }

    public void setDescription(String description) { this.description = description; }

    public void setCook_time(String cook_time) { this.cook_time = cook_time; }

    public void setPrep_time(String prep_time) { this.prep_time = prep_time; }

    public void setServings(String servings) { this.servings = servings; }

    public void setDirections(String directions) { this.directions = directions; }

    public void setIngredientList(List<String> ingredientList) {
        this.ingredients = ingredientList;
    }


    @Override
    public String toString(){
        String recipeInfo = "Recipe: " + recipe_name + "\n" +
                "Description: " + description + "\n" +
                "Directions: " + directions;
        String ingredientList = ingredients.toString();
        return recipeInfo + "\n" + ingredientList;
    }
}
