package my.project.storage.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import my.project.storage.utils.validators.StringValid;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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

    @Column(name = "SUPPLIER_CODE")
    @StringValid
    String supplierCode;

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

    @Column(name = "CREATED")
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="MM-dd-yyyy HH:mm:ss")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime created;

    @Column(name = "MODIFIED")
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="MM-dd-yyyy HH:mm:ss")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime modified;
    @PrePersist
    private void setCreatedDate() {
        created = LocalDateTime.parse(LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
    }

    @PreUpdate
    private void updateModifiedDate() {
        modified = LocalDateTime.parse(LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
    }
}
