package com.example.petstore.dto;

import com.example.petstore.models.Races;
import com.example.petstore.models.Types;

public class SearchForm {

    private String name;
    private Types type;
    private Races race;

    public SearchForm() {

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Types getType() {
        return type;
    }

    public void setType(Types type) {
        this.type = type;
    }

    public Races getRace() {
        return race;
    }

    public void setRace(Races race) {
        this.race = race;
    }
}
