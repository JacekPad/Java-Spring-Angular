package my.project.storage.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "SUPPLIER")
@Getter
@Setter
public class Supplier {
//TODO some other stuff
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    Long id;

    @Column(name = "NAME")
    String name;

    @Column(name = "ADDRESS")
    String address;

    @Column(name = "PHONE_NUMBER")
    String phoneNumber;




}
