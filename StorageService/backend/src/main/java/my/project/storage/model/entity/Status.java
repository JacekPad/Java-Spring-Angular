package my.project.storage.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "STATUS")
@Getter
@Setter
public class Status {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "CODE")
    private String code;

    @Column(name = "VALUE")
    private String value;



}
