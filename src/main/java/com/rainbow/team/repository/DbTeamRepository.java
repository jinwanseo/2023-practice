package com.rainbow.team.repository;

import com.rainbow.team.dto.CreateTeamInput;
import com.rainbow.team.dto.FilterTeamInput;
import com.rainbow.team.dto.UpdateTeamInput;
import com.rainbow.team.entity.Team;
import com.rainbow.team.entity.TeamLevel;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceException;
import jakarta.persistence.PessimisticLockException;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public class DbTeamRepository implements TeamRepository {

    private final EntityManager entityManager;


    public DbTeamRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Team create(CreateTeamInput createTeamInput) {
        this.findByName(createTeamInput.getName())
            .ifPresent(
                u -> {
                    throw new EntityExistsException("같은 이름의 부서가 있어요.");
                }
            );

        Team team = new Team();
        team.setOrder(createTeamInput.getOrder());
        team.setName(createTeamInput.getName());
        // NODE 부서 일시
        if (createTeamInput.getLevel() == TeamLevel.NODE) {
            // 상위 부서 Id 검사
            if (createTeamInput.getParentId().isEmpty()) {
                throw new PersistenceException("하위 부서는 상위 부서를 꼭 선택해야해요.");
            }
            Long parentId = createTeamInput.getParentId().get();
            Optional<Team> parent = this.findById(parentId);
            // 상위 부서 없을시
            if (parent.isEmpty()) {
                throw new EntityNotFoundException("상위 부서가 없어요. 다시 확인해주세요");
            }
            // 타입, 상위 부서 설정
            team.setLevel(createTeamInput.getLevel());
            team.setParent(parent.get());
            // 영속성 컨텍스트를 위한 코드 (없어도 Transaction 재시작시 동작하는데 문제 없음)
            parent.get().getChildren().add(team);
        }
        // ROOT 부서 일시
        if (createTeamInput.getLevel() == TeamLevel.ROOT) {
            // 상위 부서 Id 있을시
            if (createTeamInput.getParentId().isPresent()) {
                throw new PersistenceException("상위 부서는 상위 부서 선택을 할수 없어요.");
            }

            team.setLevel(createTeamInput.getLevel());
            team.setParent(null);
        }

        this.entityManager.persist(team);
        return team;
    }

    @Override
    public Team update(Long id, UpdateTeamInput updateTeamInput) {
        Optional<Team> team = this.findById(id);
        if (team.isEmpty()) {
            throw new EntityNotFoundException("수정할 부서를 못찾았어요");
        }
        // 부서 수정
        Team updateTeam = team.get();
        updateTeamInput.getName().ifPresent(updateTeam::setName);
        updateTeamInput.getOrder().ifPresent(updateTeam::setOrder);
        // 부서 타입, 상위 부서 변경
        updateTeamInput.getLevel().ifPresent(level -> {
            // NODE 로 변경시
            if (level == TeamLevel.NODE) {
                // 하위 부서 있을시 에러 반환
                if (!updateTeam.getChildren().isEmpty()) {
                    throw new PersistenceException("하위 부서 변경시, 하위 부서가 있으면 부서 타입 변경이 안되요.");
                }
                // 상위 부서 Id 없을시 에러 반환
                if (updateTeamInput.getParentId().isEmpty()) {
                    throw new PersistenceException("하위 부서는 상위 부서가 필수로 선택이 되어 있어야해요.");
                }
                Long parentId = updateTeamInput.getParentId().get();
                Optional<Team> parentTeam = this.findById(parentId);
                // 상위 부서 없을시 에러 반환
                if (parentTeam.isEmpty()) {
                    throw new EntityNotFoundException("상위 부서를 못찾았어요");
                }

                // 변경 값 적용 (부서 타입, 상위 부서)
                updateTeam.setLevel(level);
                updateTeam.setParent(parentTeam.get());
            }
            // ROOT 로 변경
            if (level == TeamLevel.ROOT) {
                // 상위 부서 설정이 있을시
                if (updateTeamInput.getParentId().isPresent()) {
                    throw new PersistenceException("상위 부서는 상위 부서를 가질수 없어요.");
                }
                updateTeam.setLevel(level);
                updateTeam.setParent(null);
            }
        });

        return updateTeam;
    }

    @Override
    public Optional<Team> findById(Long id) {
        return Optional.ofNullable(this.entityManager.find(Team.class, id));
    }

    @Override
    public Optional<Team> findByName(String name) {
        return this.entityManager.createQuery("SELECT t FROM Team AS t WHERE name=:name",
            Team.class).setParameter("name", name).getResultStream().findAny();

    }

    @Override
    public Team delete(Long id) {
        Optional<Team> team = this.findById(id);
        if (team.isEmpty()) {
            throw new EntityNotFoundException("삭제할 부서를 찾지 못했어요");
        }

        if (team.get().getLevel() == TeamLevel.ROOT && !team.get().getChildren().isEmpty()) {
            throw new PessimisticLockException("하위 부서를 가진 상위 부서는 삭제가 불가해요");
        }
        this.entityManager.remove(team.get());
        return team.get();
    }

    @Override
    public List<Team> findTeamsByFilter(FilterTeamInput filterTeamInput) {
        String keyword = filterTeamInput.getKeyword().orElse("").toLowerCase();

        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Team> criteriaQuery = criteriaBuilder.createQuery(Team.class);

        Root<Team> root = criteriaQuery.from(Team.class);

        Predicate predicate = criteriaBuilder.like(criteriaBuilder.lower(root.get("name")),
            "%" + keyword + "%");

        criteriaQuery.where(predicate);
        return entityManager.createQuery(criteriaQuery).getResultList();
    }
}
