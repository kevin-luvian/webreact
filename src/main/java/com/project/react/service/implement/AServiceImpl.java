package com.project.react.service.implement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.project.react.model.Model;
import com.project.react.repository.ModelDb;
import com.project.react.service.interfaces.AService;

@Service
public class AServiceImpl implements AService {

    @Autowired
    private ModelDb modelDb;

    @Override
    public Model[] getAll() {
        List<Model> models = modelDb.findAll();
        Model[] modelsArray = new Model[models.size()];
        return models.toArray(modelsArray);
    }

    @Override
    public Model getById(String id) {
        Optional<Model> model = modelDb.findById(id);
        if(model.isPresent()) return model.get();
        return null;
    }

    @Override
    public Model save(Model model) {
        return modelDb.save(model);
    }

    @Override
    public void deleteById(String id) {
        modelDb.delete(getById(id));
    }

    @Override
    public Model update(Model model) {
        return save(model);
    }
}