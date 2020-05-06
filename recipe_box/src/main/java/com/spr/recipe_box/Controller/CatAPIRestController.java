package com.spr.recipe_box.Controller;

import com.spr.recipe_box.Service.Interface.ICat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;

@RequestMapping("/cat")
@RestController
public class CatAPIRestController {

    @Autowired
    private ICat cat;

    @GetMapping("/picture")
    public HttpEntity<byte[]> getRandomCatPicture() throws IOException {
        return cat.RandomCatPicture();
    }

    @GetMapping("/gif")
    public HttpEntity<byte[]> getRandomCatGif() throws IOException {
        return cat.RandomCatGif();
    }

}

