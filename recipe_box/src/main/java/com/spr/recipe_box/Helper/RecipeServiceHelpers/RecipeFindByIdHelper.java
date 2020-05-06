package com.spr.recipe_box.Helper.RecipeServiceHelpers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.spr.recipe_box.Model.Recipe;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class RecipeFindByIdHelper {
    public static void buildFindByIdList(Recipe myRecipe, ResponseEntity<String> response, ObjectMapper mapper) {
        try {
            if (!response.hasBody()) {
                System.out.println("Nothing exists in response body");
            } else {
                JsonNode map = mapper.readTree(response.getBody());

//                Recipe myRecipe = new Recipe(
//                        map.path("Title").asText(),
//                        "",
//                        map.path("Description").asText(),
//                        map.path("TotalMinutes").asText(),
//                        "",
//                        map.path("YieldNumber").asText(),
//                        map.path("Instructions").asText());

                myRecipe.setRecipe_name(map.path("Title").asText());
                myRecipe.setRecipe_id(map.path("RecipeID").asText());
                myRecipe.setDescription(map.path("Description").asText());
                myRecipe.setCook_time(map.path("TotalMinutes").asText());
                myRecipe.setServings(map.path("YieldNumber").asText());
                myRecipe.setDirections(map.path("Instructions").asText());

                System.out.println("\n\n\n" + myRecipe + "\n\n\n");

                JsonNode ingredientsNode = map.path("Ingredients");
                if (ingredientsNode.isArray()){
                    List<String> recipeIngredientList = new ArrayList<>();
                    createRecipeIngredientList(myRecipe, ingredientsNode, recipeIngredientList);
                }
               // recipeList.add(myRecipe);
            }
        }
        catch (IOException ioe) {
            ioe.printStackTrace();
        }
    }

    private static void createRecipeIngredientList(Recipe myRecipe, JsonNode ingredientsNode, List<String> recipeIngredientList) {
        for (JsonNode node:ingredientsNode) {
            String name = node.path("Name").asText();
            if (name != null && name.length() > 0) {
                recipeIngredientList.add(name);
            }
        }
        myRecipe.setIngredientList(recipeIngredientList);
    }
}
