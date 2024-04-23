package com.rainbow.user.service;

import com.rainbow.common.dto.ResponseDto;
import com.rainbow.user.dto.CreateUserInput;
import com.rainbow.user.dto.DeleteUserInput;
import com.rainbow.user.dto.FilterUserInput;
import com.rainbow.user.entity.User;
import com.rainbow.user.dto.UpdateUserInput;

import java.util.List;

public interface UserService {

    ResponseDto<User> createUser(CreateUserInput createUserInput);

    ResponseDto<User> updateUser(Long userId, UpdateUserInput updateUserInput);

    ResponseDto<List<User>> findUserByFilter(FilterUserInput filterUserInput);

    ResponseDto<User> deleteUser(DeleteUserInput deleteUserInput);

    ResponseDto<User> getProfileById(Long userId);

    ResponseDto<User> getProfileByName(String name);
}
