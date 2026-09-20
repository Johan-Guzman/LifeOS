package com.lifeos.shared;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@MappedSuperclass
public abstract class AuditableEntity {
 @Column(nullable=false,updatable=false) private LocalDateTime createdAt;
 @Column(nullable=false) private LocalDateTime updatedAt;
 @PrePersist void onCreate(){ createdAt=LocalDateTime.now(); updatedAt=createdAt; }
 @PreUpdate void onUpdate(){ updatedAt=LocalDateTime.now(); }
 public LocalDateTime getCreatedAt(){return createdAt;} public LocalDateTime getUpdatedAt(){return updatedAt;}
}
