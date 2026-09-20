package com.lifeos.tasks; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface TaskRepository extends JpaRepository<Task,Long>{ List<Task> findAllByUserIdOrderByCreatedAtDesc(Long userId); Optional<Task> findByIdAndUserId(Long id,Long userId); List<Task> findAllByUserIdAndStatusNot(Long userId,TaskStatus status); }
