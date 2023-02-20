package my.project.storage.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "PRODUCTS")
@Getter
@Setter
@ToString
public class Product {

    @Id
    @Column(name = "ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "TYPE")
    private String type;

    @Column(name = "QUANTITY")
    private Long quantity;

    @Column(name = "STATUS")
    private String status;

    @Column(name = "SUPPLIER")
    private Long supplier;

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
