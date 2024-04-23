package com.rainbow.user.controller;

import com.rainbow.common.dto.ResponseDto;
import com.rainbow.user.dto.CreateUserInput;
import com.rainbow.user.entity.User;
import com.rainbow.user.dto.DeleteUserInput;
import com.rainbow.user.dto.FilterUserInput;
import com.rainbow.user.dto.UpdateUserInput;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "계정 관리")
@RequestMapping("/api/users")
public interface UserController {

    @Operation(
        summary = "유저 등록",
        description = "유저 등록 요청 API"
    )
    @PostMapping("/create")
    ResponseDto<User> createUser(CreateUserInput createUserInput);

    @Operation(
        summary = "유저 수정",
        description = "유저 수정 요청 API"
    )
    @PatchMapping("/update")
    ResponseDto<User> updateUser(Long userId, UpdateUserInput updateUserInput);

    @Operation(
        summary = "유저 리스트 조회",
        description = "유저 리스트 조회 요청 API"
    )
    @GetMapping("/list")
    ResponseDto<List<User>> findUserByFilter(FilterUserInput filterUserInput);


    @Operation(
        summary = "유저 삭제",
        description = "유저 삭제 요청 API"
    )
    @DeleteMapping("/delete")
    ResponseDto<User> deleteUser(DeleteUserInput deleteUserInput);
}
