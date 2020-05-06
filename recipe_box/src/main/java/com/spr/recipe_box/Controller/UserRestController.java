package com.spr.recipe_box.Controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.spr.recipe_box.Constant.Constants;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;

@RestController
@RequestMapping(value = "/user", produces = "application/json")
public class UserRestController {
    public RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/login")
    public String testing(@RequestHeader("Authorization") String auth) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", auth);
        HttpEntity requestEntity = new HttpEntity(headers);
        ResponseEntity<String> response = restTemplate.exchange(Constants.NODE_ENV + Constants.LOGIN, HttpMethod.GET, requestEntity, String.class);
        return response.getBody();
    }

    @GetMapping(value = "/{id}/recipes")
    public String getAllRecipes(@PathVariable("id") String id) {
        String urlPath = Constants.USER + id + "/" + Constants.RECIPES;
        ResponseEntity<String> response = restTemplate.getForEntity(Constants.NODE_ENV + urlPath , String.class);
        return response.getBody();
    }

    @GetMapping
    public String getUser(@RequestParam(value="user_name") String name) {
        ResponseEntity<String> response = restTemplate.getForEntity(Constants.NODE_ENV + Constants.USER_NAME_QUERY + name, String.class);
        return response.getBody();
    }

    @PostMapping
    public String addUser(@RequestBody String userName) throws JsonProcessingException {
        HashMap request = new ObjectMapper().readValue(userName, HashMap.class);
        ResponseEntity<String> response = restTemplate.postForEntity(Constants.NODE_ENV + Constants.USER, request, String.class);
        return response.getBody();
    }
}
