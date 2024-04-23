package com.rainbow.user.controller;

import com.rainbow.common.dto.ResponseDto;
import com.rainbow.user.dto.CreateUserInput;
import com.rainbow.user.dto.DeleteUserInput;
import com.rainbow.user.dto.FilterUserInput;
import com.rainbow.user.entity.User;
import com.rainbow.user.dto.UpdateUserInput;
import com.rainbow.user.service.UserService;
import org.springframework.stereotype.Controller;

import java.util.List;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Swagger 문서 및 Request 경로는 interface 에 정리하였슴다
 */
@Controller
public class UserControllerImpl implements UserController {

    private final UserService userService;

    public UserControllerImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public ResponseDto<User> createUser(@RequestBody CreateUserInput createUserInput) {
        return this.userService.createUser(createUserInput);
    }

    @Override
    public ResponseDto<User> updateUser(@RequestParam(name = "userId") Long userId,
        @RequestBody UpdateUserInput updateUserInput) {
        return this.userService.updateUser(userId, updateUserInput);
    }

    @Override
    public ResponseDto<List<User>> findUserByFilter(@RequestBody FilterUserInput filterUserInput) {
        return this.userService.findUserByFilter(filterUserInput);
    }

    @Override
    public ResponseDto<User> deleteUser(@RequestBody DeleteUserInput deleteUserInput) {
        return this.userService.deleteUser(deleteUserInput);
    }
}
