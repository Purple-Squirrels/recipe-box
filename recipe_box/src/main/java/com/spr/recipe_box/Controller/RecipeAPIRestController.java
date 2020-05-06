package com.spr.recipe_box.Controller;

import com.spr.recipe_box.Model.Recipe;
import com.spr.recipe_box.Service.Services.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/bigoven/recipes", produces = "application/json")
public class RecipeAPIRestController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping("/{recipe_id}")
    public Recipe getRecipeById(@PathVariable String recipe_id) {
        return recipeService.findById(recipe_id);
    }

    @GetMapping("/random")
    public List<Recipe> getSuggestedRecipes() {
        return recipeService.get25Random();
    }

    @GetMapping("/random_details")
    public List<Recipe> getSuggestedRecipeDetails()
    {
        List<Recipe> recipeList = recipeService.get25Random();
        List<Recipe> recipeDetails = new ArrayList<>();
        int count = 0;
       // System.out.print("\n\n\n\n");
        while(count < 8){
            //System.out.println("RECIPE_ID: "+ recipeList.get(count).getRecipe_id());
            recipeDetails.add(recipeService.findById(recipeList.get(count).getRecipe_id()));
            //System.out.println("Recipe Details at count "+ count + ": " + recipeDetails.get(count));
            count++;
        }
        return recipeDetails;
    }

}