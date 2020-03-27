package com.project.react.service.interfaces;

import com.project.react.model.Model;

public interface AService {
    Model[] getAll();
    Model getById(String id);
    Model save(Model model);
    void deleteById(String id);
    Model update(Model model);
}
