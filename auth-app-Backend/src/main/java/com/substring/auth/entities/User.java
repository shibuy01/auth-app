package com.substring.auth.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="my_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id")
    private UUID id;
    @Column(name="user_email")
    private String email;
    @Column(name="user_name")
    private String name;
    @Column(name="user_password")
    private String password;
    @Column(name="user_image")
    private String image;
    @Column(name="user_enabled")
    private boolean enabled=true;
    @Column(name="user_createdAt")
    @CreationTimestamp
    private LocalDateTime createdAt;
    @Column(name="user_updatedAt")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    private Provider  provider = Provider.LOCAL;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Role> roles =  new HashSet<>();

}
