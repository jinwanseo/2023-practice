package com.rainbow.team.repository;

import static org.junit.jupiter.api.Assertions.assertThrows;

import com.rainbow.team.dto.CreateTeamInput;
import com.rainbow.team.dto.FilterTeamInput;
import com.rainbow.team.dto.UpdateTeamInput;
import com.rainbow.team.entity.Team;
import com.rainbow.team.entity.TeamLevel;
import com.rainbow.team.repository.MemoryTeamRepository;
import com.rainbow.team.repository.TeamRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceException;
import jakarta.persistence.PessimisticLockException;
import java.util.List;
import java.util.Optional;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

/**
 * @ title 단위 테스트 (memory data)
 */
class MemoryTeamRepositoryTest {

    private TeamRepository teamRepository;

    @BeforeEach
    void beforeEach() {
        this.teamRepository = new MemoryTeamRepository();
    }

    @Test
    @DisplayName("부서 생성 : 성공")
    void createTeam() {
        CreateTeamInput createTeamInput = new CreateTeamInput(
            "sample",
            0,
            TeamLevel.ROOT,
            Optional.empty()
        );

        Team team = this.teamRepository.create(createTeamInput);

        Assertions.assertThat(team.getName()).isEqualTo(createTeamInput.getName());
    }

    @Test
    @DisplayName("부서 생성 : 실패 (같은 이름의 부서 생성 시도)")
    void createTeamDuplicatedNameFailed() {
        CreateTeamInput createTeamInput = new CreateTeamInput(
            "sample",
            0,
            TeamLevel.ROOT,
            Optional.empty()
        );
        this.teamRepository.create(createTeamInput);

        assertThrows(
            EntityExistsException.class,
            () -> this.teamRepository.create(createTeamInput),
            "같은 이름의 부서가 있어요."
        );
    }

    @Test
    @DisplayName("부서 생성 : 하위 부서인데 상위 부서 선택 안했을때")
    void createNodeTeamNoSelectParentFailed() {
        CreateTeamInput createTeamInput = new CreateTeamInput(
            "sample",
            0,
            TeamLevel.NODE,     //node 부서
            Optional.empty()    // parent 선택 x
        );

        assertThrows(
            PersistenceException.class,
            () -> this.teamRepository.create(createTeamInput),
            "하위 부서는 상위 부서를 꼭 선택해야해요."
        );
    }

    @Test
    @DisplayName("부서 생성 : 하위 부서인데 상위 부서 선택은 했지만 상위 부서 pk 가 유효하지 않은 경우")
    void createNodeTeamSelectParentFailed() {
        CreateTeamInput createTeamInput = new CreateTeamInput(
            "sample",
            0,
            TeamLevel.NODE,     //node 부서
            Optional.of(1L)    // parent 선택 x
        );

        assertThrows(
            EntityNotFoundException.class,
            () -> this.teamRepository.create(createTeamInput),
            "상위 부서가 없어요. 다시 확인해주세요"
        );
    }

    @Test
    @DisplayName("부서 생성 : 상위 부서 인데 상위 부서를 선택 한 경우")
    void createRootTeamSelectParentFailed() {
        CreateTeamInput createTeamInput = new CreateTeamInput(
            "sample",
            0,
            TeamLevel.ROOT,     //node 부서
            Optional.of(1L)    // parent 선택 x
        );

        assertThrows(
            PersistenceException.class,
            () -> this.teamRepository.create(createTeamInput)
        );

    }


    @Test
    @DisplayName("부서 수정 : 부서 수정 정상")
    void updateTeam() {
        CreateTeamInput createTeamInput = new CreateTeamInput(
            "sample",
            0,
            TeamLevel.ROOT,     //node 부서
            Optional.empty()    // parent 선택 x
        );

        Team team = this.teamRepository.create(createTeamInput);

        UpdateTeamInput updateTeamInput = new UpdateTeamInput();
        updateTeamInput.setName(Optional.of("sample updated"));

        Team update = this.teamRepository.update(team.getId(), updateTeamInput);
        Assertions.assertThat(update.getName()).isEqualTo(updateTeamInput.getName().get());
    }

    @Test
    @DisplayName("부서 리스트 출력 : 하위 부서 등록 / 확인 : 성공")
    void findTeamByFilterSuccess() {
        CreateTeamInput createTeamInput = new CreateTeamInput(
            "sample",
            0,
            TeamLevel.ROOT,     //node 부서
            Optional.empty()    // parent 선택 x
        );
        Team rootTeam = this.teamRepository.create(createTeamInput);

        // 부서 목록 생성
        for (int i = 0; i < 10; i++) {
            Team team = this.teamRepository.create(
                new CreateTeamInput(
                    "sample" + i,
                    i,
                    i % 2 == 1 ? TeamLevel.ROOT : TeamLevel.NODE,
                    i % 2 == 1 ? Optional.empty() : Optional.ofNullable(rootTeam.getId())
                )
            );
        }

        // 하위 부서 확인
        Team root = this.teamRepository.findById(rootTeam.getId()).get();
        List<Team> children = root.getChildren();
        Assertions.assertThat(children.size()).isEqualTo(5);
    }

    @Test
    @DisplayName("부서 삭제 (하위 부서 없는 상위 부서, 삭제 성공)")
    void deleteTeamSuccess() {
        CreateTeamInput createTeamInput = new CreateTeamInput(
            "sample",
            0,
            TeamLevel.ROOT,     //node 부서
            Optional.empty()    // parent 선택 x
        );
        Team rootTeam = this.teamRepository.create(createTeamInput);

        Team delete = this.teamRepository.delete(rootTeam.getId());

        Assertions.assertThat(delete.getName()).isEqualTo(rootTeam.getName());
    }

    @Test
    @DisplayName("부서 삭제 (하위 부서 있는 상위 부서, 실패)")
    void deleteRootTeamFailed() {
        // 상위 부서 생성
        CreateTeamInput createTeamInput = new CreateTeamInput(
            "sample",
            0,
            TeamLevel.ROOT,     //node 부서
            Optional.empty()    // parent 선택 x
        );
        Team rootTeam = this.teamRepository.create(createTeamInput);

        // 부서 목록 생성
        for (int i = 0; i < 10; i++) {
            Team team = this.teamRepository.create(
                new CreateTeamInput(
                    "sample" + i,
                    i,
                    i % 2 == 1 ? TeamLevel.ROOT : TeamLevel.NODE,
                    i % 2 == 1 ? Optional.empty() : Optional.ofNullable(rootTeam.getId())
                )
            );
        }

        // 상위 부서 삭제 시도
        assertThrows(
            PessimisticLockException.class,
            () -> this.teamRepository.delete(rootTeam.getId()),
            "하위 부서를 가진 상위 부서는 삭제가 불가해요"
        );
    }

    @Test
    @DisplayName("그냥 하위 부서 삭제 성공")
    void deleteNodeTeamSuccess() {

        CreateTeamInput createRootInput = new CreateTeamInput(
            "sample",
            0,
            TeamLevel.ROOT,     //node 부서
            Optional.empty()    // parent 선택 x
        );
        Team rootTeam = this.teamRepository.create(createRootInput);

        // 상위 부서 생성
        CreateTeamInput createNodeInput = new CreateTeamInput(
            "sample2",
            0,
            TeamLevel.NODE,     //node 부서
            Optional.ofNullable(rootTeam.getId())   // parent 선택 x
        );
        Team nodeTeam = this.teamRepository.create(createNodeInput);

        Team team = this.teamRepository.delete(nodeTeam.getId());
        Assertions.assertThat(team.getName()).isEqualTo("sample2");
    }

    @Test
    @DisplayName("부서 검색 : Id, 성공")
    void getTeamById() {
        CreateTeamInput createRootInput = new CreateTeamInput(
            "sample",
            0,
            TeamLevel.ROOT,     //node 부서
            Optional.empty()    // parent 선택 x
        );
        Team rootTeam = this.teamRepository.create(createRootInput);

        Team team = this.teamRepository.findById(rootTeam.getId()).get();
        Assertions.assertThat(team.getName()).isEqualTo("sample");
    }

    @Test
    @DisplayName("부서 검색 : Id, 실패")
    void getTeamByIdFailed() {
        Optional<Team> team = this.teamRepository.findById(1L);
        Assertions.assertThat(team).isEmpty();
    }

    @Test
    @DisplayName("부서 검색 : 이름, 성공")
    void getTeamByName() {
        CreateTeamInput createRootInput = new CreateTeamInput(
            "sample",
            0,
            TeamLevel.ROOT,     //node 부서
            Optional.empty()    // parent 선택 x
        );
        Team rootTeam = this.teamRepository.create(createRootInput);

        Team team = this.teamRepository.findByName(rootTeam.getName()).get();
        Assertions.assertThat(team.getName()).isEqualTo("sample");
    }

    @Test
    @DisplayName("부서 검색 : 이름, 실패")
    void getTeamByNameFailed() {
        Optional<Team> team = this.teamRepository.findByName("sample");
        Assertions.assertThat(team).isEmpty();
    }
}