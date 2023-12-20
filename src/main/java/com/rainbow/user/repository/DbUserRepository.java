package com.rainbow.user.repository;

import com.rainbow.team.entity.Team;
import com.rainbow.team.repository.TeamRepository;
import com.rainbow.user.entity.User;
import com.rainbow.user.dto.FilterUserInput;
import com.rainbow.user.dto.UpdateUserInput;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public class DbUserRepository implements UserRepository {

    private final EntityManager entityManager;
    private final TeamRepository teamRepository;

    public DbUserRepository(EntityManager entityManager, TeamRepository teamRepository) {
        this.entityManager = entityManager;
        this.teamRepository = teamRepository;
    }

    @Override
    public User create(User user) {
        this.findByName(user.getName()).ifPresent(u -> {
            throw new EntityExistsException("가입된 유저 이름과 동일합니다.");
        });

        this.entityManager.persist(user);
        return user;
    }

    @Override
    public User update(Long id, UpdateUserInput updateUserInput) {
        Optional<User> user = this.findById(id);
        if (user.isEmpty()) {
            throw new EntityNotFoundException("수정할 유저가 없어요");
        }

        updateUserInput.getName().flatMap(this::findByName).ifPresent
            (u -> {
                throw new EntityExistsException("수정할 유저 이름이 이미 있어요");
            });

        User updateUser = user.get();
        if (updateUserInput.getTeamId().isPresent()) {
            Long teamId = updateUserInput.getTeamId().get();
            Optional<Team> team = this.teamRepository.findById(teamId);
            if (team.isEmpty()) {
                throw new EntityNotFoundException("요청하신 팀을 찾을수 없어요");
            }
            updateUser.setTeam(team.get());
        }

        updateUserInput.getEmail().ifPresent(updateUser::setEmail);
        updateUserInput.getRole().ifPresent(updateUser::setRole);
        updateUserInput.getName().ifPresent(updateUser::setName);

        return updateUser;
    }

    @Override
    public User delete(Long id) {
        Optional<User> user = this.findById(id);
        if (user.isEmpty()) {
            throw new EntityNotFoundException("삭제할 유저가 없어요");
        }
        this.entityManager.remove(user.get());
        return user.get();
    }

    @Override
    public Optional<User> findByName(String name) {
        return this.entityManager.createQuery("SELECT u FROM User AS u WHERE name=:name",
            User.class).setParameter("name", name).getResultStream().findAny();
    }

    @Override
    public Optional<User> findById(Long id) {
        return Optional.ofNullable(this.entityManager.find(User.class, id));
    }

    @Override
    public List<User> findUsersByFilter(FilterUserInput filterUserInput) {
        CriteriaBuilder criteriaBuilder = this.entityManager.getCriteriaBuilder();
        CriteriaQuery<User> criteriaQuery = criteriaBuilder.createQuery(User.class);
        Root<User> root = criteriaQuery.from(User.class);

        List<Predicate> predicates = new ArrayList<>();
        String searchKeyword = filterUserInput.getKeyword().orElse("");
        if (!searchKeyword.isEmpty()) {
            String keyword = searchKeyword.toLowerCase();
            predicates.add(
                criteriaBuilder.like(criteriaBuilder.lower(root.get("role")), "%" + keyword));
            predicates.add(
                criteriaBuilder.like(criteriaBuilder.lower(root.get("email")), "%" + keyword));
            predicates.add(
                criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + keyword));

        }
        criteriaQuery.where(predicates.toArray(new Predicate[0]));
        return entityManager.createQuery(criteriaQuery).getResultList();
    }
}
