package com.spr.recipe_box.Service.Services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spr.recipe_box.Constant.Constants;
import com.spr.recipe_box.Constant.Keys;
import com.spr.recipe_box.Helper.HeadersHelper;
import com.spr.recipe_box.Helper.RecipeServiceHelpers.RecipeFindByIdHelper;
import com.spr.recipe_box.Helper.RecipeServiceHelpers.RecipeGet25RandomHelper;
import com.spr.recipe_box.Helper.RecipeServiceHelpers.RecipeServiceHelper;
import com.spr.recipe_box.Model.Recipe;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;


@Service
public class RecipeService {
    HttpHeaders headers = new HeadersHelper().jsonHeader();

    public Recipe findById(String recipe_id){
        
        Recipe myRecipe = new Recipe();
        String url = Constants.BIG_OVEN + Constants.RECIPE + recipe_id + Constants.API_KEY_QUERY + Keys.BIG_OVEN_KEY;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = RecipeServiceHelper.getStringResponseEntity(url, restTemplate, headers);
        ObjectMapper mapper = new ObjectMapper();
        RecipeFindByIdHelper.buildFindByIdList(myRecipe, response, mapper);
        return myRecipe;
    }

    public List<Recipe> get25Random() {
        List<Recipe> recipeList = new ArrayList<>();
        String url = Constants.BIG_OVEN_API_2 + Constants.RECIPES + Constants.TOP25 + Constants.API_KEY_QUERY + Keys.BIG_OVEN_KEY;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = RecipeServiceHelper.getStringResponseEntity(url, restTemplate, headers);
        ObjectMapper mapper = new ObjectMapper();
        RecipeGet25RandomHelper.buildGet25RandomList(recipeList, response, mapper);
        return recipeList;
    }

}
