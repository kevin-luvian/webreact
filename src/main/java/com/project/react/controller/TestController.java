package com.project.react.controller;

import com.project.react.service.interfaces.AService;

import java.net.URI;
import java.net.URISyntaxException;

import javax.validation.Valid;

import com.project.react.model.Model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/model")
public class TestController {
    @Autowired
    private AService aService;
    private final Logger log = LoggerFactory.getLogger(TestController.class);

    @GetMapping(value = "/all")
    private ResponseEntity<?> retrieveModel() {
        Model[] models = aService.getAll();
        if (models == null) {
            models = new Model[0];
        }
        return new ResponseEntity<>(models, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    private ResponseEntity<Model> retrieveModelById(@PathVariable String id) {
        Model model = aService.getById(id);
        return new ResponseEntity<Model>(model, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    ResponseEntity<Model> updateModel(@PathVariable String id, @Valid @RequestBody Model model) {
        model.setId(id);
        log.info("Request to update model: {}", model);
        Model result = aService.update(model);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteModel(@PathVariable String id) {
        log.info("Request to delete model: {}", id);
        aService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "")
    public ResponseEntity<?> postModel(@Valid @RequestBody Model model) throws URISyntaxException {
        Model result = aService.save(model);
        return ResponseEntity.created(new URI("/api/model/" + result.getId())).body(result);
    }
}