package my.project.storage.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import my.project.storage.utils.validators.StringValid;

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
    @StringValid
    String name;

    @Column(name = "STREET")
    @StringValid
    String address;

    @Column(name = "PHONE_NUMBER")
    String phoneNumber;

    @Column(name = "ZIP_CODE")
    @StringValid
    String zipCode;

    @Column(name = "COUNTRY")
    @StringValid
    String country;


}
