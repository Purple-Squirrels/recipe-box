package com.spr.recipe_box.Controller;

import com.spr.recipe_box.Constant.Constants;
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

public class RecipeDBRestController {
    public RestTemplate restTemplate = new RestTemplate();

    @GetMapping(value = "/{id}")
    public String findById(@PathVariable("id") String recipe_id) {
        ResponseEntity<String> response = restTemplate.getForEntity(Constants.NODE_ENV + Constants.RECIPES + recipe_id, String.class);
        return response.getBody();
    }

    @GetMapping
    public String findAll() {
        ResponseEntity<String> response = restTemplate.getForEntity(Constants.NODE_ENV + Constants.RECIPES, String.class);
        return response.getBody();
    }

    @PostMapping
    public String create(@RequestBody HashMap<String, Object> recipe) {
        ResponseEntity<String> response = restTemplate.postForEntity(Constants.NODE_ENV + Constants.RECIPES, recipe, String.class);
        return response.getBody();
    }

    @PutMapping(value = "/{recipe_id}")
    public String update(@PathVariable("recipe_id") String recipe_id, @RequestBody HashMap<String, Object> updatedRecipe) {
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<HashMap<String, Object>> requestEntity = new HttpEntity<>(updatedRecipe, headers);
        ResponseEntity<String> response = restTemplate.exchange(Constants.NODE_ENV + Constants.RECIPES + recipe_id, HttpMethod.PUT, requestEntity, String.class);
        return response.getBody();
    }


    @DeleteMapping(value = "/{id}")
    public String delete(@PathVariable("id") String recipe_id) {
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> requestEntity = new HttpEntity<>(recipe_id, headers);
        ResponseEntity<String> response = restTemplate.exchange(Constants.NODE_ENV + Constants.RECIPES, HttpMethod.DELETE, requestEntity, String.class);
        return response.getBody();
    }
}
