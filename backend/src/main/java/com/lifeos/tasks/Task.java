package com.lifeos.tasks;
import com.lifeos.shared.AuditableEntity; import com.lifeos.users.User; import jakarta.persistence.*; import java.time.*;
@Entity @Table(name="tasks") public class Task extends AuditableEntity {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false,length=200) private String title; @Column(columnDefinition="text") private String description;
 @Enumerated(EnumType.STRING) @Column(nullable=false) private TaskStatus status=TaskStatus.TODO;
 @Enumerated(EnumType.STRING) @Column(nullable=false) private TaskPriority priority=TaskPriority.MEDIUM;
 private Integer estimatedMinutes; private LocalDate dueDate; private LocalDateTime completedAt;
 @ManyToOne(fetch=FetchType.LAZY,optional=false) @JoinColumn(name="user_id",nullable=false) private User user;
 public Long getId(){return id;} public String getTitle(){return title;} public void setTitle(String v){title=v;} public String getDescription(){return description;} public void setDescription(String v){description=v;} public TaskStatus getStatus(){return status;} public void setStatus(TaskStatus v){status=v;} public TaskPriority getPriority(){return priority;} public void setPriority(TaskPriority v){priority=v;} public Integer getEstimatedMinutes(){return estimatedMinutes;} public void setEstimatedMinutes(Integer v){estimatedMinutes=v;} public LocalDate getDueDate(){return dueDate;} public void setDueDate(LocalDate v){dueDate=v;} public LocalDateTime getCompletedAt(){return completedAt;} public void setCompletedAt(LocalDateTime v){completedAt=v;} public User getUser(){return user;} public void setUser(User v){user=v;}
}
