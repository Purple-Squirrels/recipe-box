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

    @GetMapping(value = "/login")
    public String login(@RequestHeader("Authorization") String auth) {
        System.out.println(auth);
        String url = env.equals(Constants.DEV_BOOL) ? Constants.NODE_DEV_ENV + Constants.LOGIN : Constants.NODE_PROD_ENV + Constants.LOGIN;
        HttpHeaders headers = new HttpHeaders();
        headers.setBasicAuth(auth);
        HttpEntity requestEntity = new HttpEntity(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, requestEntity, String.class);
        System.out.println(response);
        return response.getBody();
    }

    @PostMapping
    public String addUser(@RequestBody String userName) throws JsonProcessingException {
        String url = env.equals(Constants.DEV_BOOL) ? Constants.NODE_DEV_ENV + Constants.USER : Constants.NODE_PROD_ENV + Constants.USER;
        HashMap request = new ObjectMapper().readValue(userName, HashMap.class);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
        return response.getBody();
    }
}
