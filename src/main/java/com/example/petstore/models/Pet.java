package com.example.petstore.models;

import javax.persistence.*;

@Entity
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Enumerated(EnumType.STRING)
    private Types type;

    @Enumerated(EnumType.STRING)
    private Races race;

    @Enumerated(EnumType.STRING)
    private Genres genre;

    private String color;
    private Integer age;
    private Double weight;
    private String description;
    private Double price;

    public Pet() {
    }

    public Pet(Integer id, String name, Types type, Races race, Genres genre, String color, Integer age, Double weight, String description, Double price) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.race = race;
        this.genre = genre;
        this.color = color;
        this.age = age;
        this.weight = weight;
        this.description = description;
        this.price = price;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Types getType() { return type; }

    public void setType(Types type) { this.type = type; }

    public Races getRace() { return race; }

    public void setRace(Races race) { this.race = race; }

    public Genres getGenre() { return genre; }

    public void setGenre(Genres genre) { this.genre = genre; }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() { return price; }

    public void setPrice(Double price) { this.price = price; }

    @Override
    public String toString() {
        return "Pet{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type=" + type +
                ", race=" + race +
                ", genre=" + genre +
                ", color='" + color + '\'' +
                ", age=" + age +
                ", weight=" + weight +
                ", description='" + description + '\'' +
                ", price=" + price +
                '}';
    }
}
