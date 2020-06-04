package com.example.petstore.services;

import com.example.petstore.dao.PetDAO;
import com.example.petstore.dto.SearchForm;
import com.example.petstore.models.Pet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class PetService {

    @Autowired
    private PetDAO petDao;

    public List<Pet> findAll() {
        return petDao.findAll();
    }

    public Pet findById(Integer id) {
        return petDao.findById(id).orElse(null);
    }

    public List<Pet> findWithForm(SearchForm searchForm) {
        Pet pet = new Pet();
        pet.setName(!StringUtils.isEmpty(searchForm.getName()) ? searchForm.getName() : null);
        pet.setType(searchForm.getType());
        pet.setRace(searchForm.getRace());

        ExampleMatcher matcher = ExampleMatcher.matching().withIgnoreNullValues().withIgnoreCase();
        Example<Pet> example = Example.of(pet, matcher);
        return petDao.findAll(example);
    }

    public Pet save(Pet pet) {
        return petDao.save(pet);
    }

    public Integer deleteById(Integer id) {
        petDao.deleteById(id);
        return id;
    }
}
