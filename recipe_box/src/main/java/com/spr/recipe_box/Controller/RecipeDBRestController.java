package com.spr.recipe_box.Controller;

import com.spr.recipe_box.Constant.Constants;
import com.spr.recipe_box.Config.RestClass;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpHeaders;

import java.util.HashMap;

@RestController
@CrossOrigin
@RequestMapping(value = "/recipes", produces = "application/json")

public class RecipeDBRestController extends RestClass {
    public RestTemplate restTemplate = new RestTemplate();

    @GetMapping(value = "/{id}")
    public String findById(@PathVariable("id") String recipe_id) {
        String url = env.equals(Constants.DEV_BOOL) ? Constants.NODE_DEV_ENV + Constants.RECIPES + recipe_id : Constants.NODE_PROD_ENV + Constants.RECIPES + recipe_id;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response.getBody();
    }

    @GetMapping
    public String findAll() {
        String url = env.equals(Constants.DEV_BOOL) ? Constants.NODE_DEV_ENV + Constants.RECIPES : Constants.NODE_PROD_ENV + Constants.RECIPES;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response.getBody();
    }

    @PostMapping
    public String create(@RequestBody HashMap<String, Object> recipe) {
        String url = env.equals(Constants.DEV_BOOL) ? Constants.NODE_DEV_ENV + Constants.RECIPES : Constants.NODE_PROD_ENV + Constants.RECIPES;
        ResponseEntity<String> response = restTemplate.postForEntity(url, recipe, String.class);
        return response.getBody();
    }

    @PutMapping(value = "/{recipe_id}")
    public String update(@PathVariable("recipe_id") String recipe_id, @RequestBody HashMap<String, Object> updatedRecipe) {
        String url = env.equals(Constants.DEV_BOOL) ? Constants.NODE_DEV_ENV + Constants.RECIPES + recipe_id : Constants.NODE_PROD_ENV + Constants.RECIPES + recipe_id;
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<HashMap<String, Object>> requestEntity = new HttpEntity<>(updatedRecipe, headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, String.class);
        return response.getBody();
    }


    @DeleteMapping(value = "/{id}")
    public String delete(@PathVariable("id") String recipe_id) {
        String url = env.equals(Constants.DEV_BOOL) ? Constants.NODE_DEV_ENV + Constants.RECIPES + recipe_id : Constants.NODE_PROD_ENV + Constants.RECIPES + recipe_id;

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> requestEntity = new HttpEntity<>(recipe_id, headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.DELETE, requestEntity, String.class);
        return response.getBody();
    }
}
