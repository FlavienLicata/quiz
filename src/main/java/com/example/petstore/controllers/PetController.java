package com.example.petstore.controllers;

import com.example.petstore.dto.SearchForm;
import com.example.petstore.models.Pet;
import com.example.petstore.services.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value="/pets")
public class PetController {

    @Autowired
    public PetService petService;

    @GetMapping
    public Iterable<Pet> allPets() {
        return petService.findAll();
    }

    @GetMapping(value="/{id}")
    public Pet getPet(@PathVariable Integer id) {
        return petService.findById(id);
    }

    @PostMapping(value="/search")
    public List<Pet> findPets(@RequestBody SearchForm searchForm) {
        return petService.findWithForm(searchForm);
    }

    @PostMapping
    public Pet addPet(@RequestBody Pet pet) {
        return petService.save(pet);
    }

    @DeleteMapping (value = "/{id}")
    public Integer deletePet(@PathVariable int id) {
        return petService.deleteById(id);
    }

    @PutMapping
    public Pet updatePet(@RequestBody Pet pet) {
        return petService.save(pet);
    }
}
