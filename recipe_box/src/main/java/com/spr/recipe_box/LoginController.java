package com.spr.recipe_box;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @GetMapping(value = "/login")
    public boolean login() {
        
        return true;
    }
}
