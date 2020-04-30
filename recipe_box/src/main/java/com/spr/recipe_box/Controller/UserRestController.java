package com.spr.recipe_box.Controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.spr.recipe_box.Constant.Constants;
import com.spr.recipe_box.Config.RestClass;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;

@RestController
@RequestMapping(value = "/user", produces = "application/json")
public class UserRestController extends RestClass {
    public RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/login")
    public String testing(@RequestHeader("Authorization") String auth) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", auth);
        String url = env.equals(Constants.DEV_BOOL) ? Constants.NODE_DEV_ENV + Constants.LOGIN : Constants.NODE_PROD_ENV + Constants.LOGIN;
        HttpEntity requestEntity = new HttpEntity(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, requestEntity, String.class);
        return response.getBody();
    }

    @GetMapping(value = "/{id}/recipes")
    public String getAllRecipes(@PathVariable("id") String id) {
        String urlPath = Constants.USER + id + "/" + Constants.RECIPES;
        String url = env.equals(Constants.DEV_BOOL) ? Constants.NODE_DEV_ENV + urlPath : Constants.NODE_PROD_ENV + urlPath;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response.getBody();
    }

    @GetMapping
    public String getUser(@RequestParam(value="user_name") String name) {
        String url = env.equals(Constants.DEV_BOOL) ? Constants.NODE_DEV_ENV + Constants.USER_NAME_QUERY + name : Constants.NODE_PROD_ENV + Constants.USER_NAME_QUERY + name;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response.getBody();
    }

    @PostMapping
    public String addUser(@RequestBody String userName) throws JsonProcessingException {
        String url = env.equals(Constants.DEV_BOOL) ? Constants.NODE_DEV_ENV + Constants.USER : Constants.NODE_PROD_ENV + Constants.USER;
        HashMap request = new ObjectMapper().readValue(userName, HashMap.class);
        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
        return response.getBody();
    }
}
