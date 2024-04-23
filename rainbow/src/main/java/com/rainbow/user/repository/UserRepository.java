package com.rainbow.user.repository;

import com.rainbow.user.entity.User;
import com.rainbow.user.dto.FilterUserInput;
import com.rainbow.user.dto.UpdateUserInput;

import java.util.List;
import java.util.Optional;

public interface UserRepository {

    User create(User user);

    User update(Long id, UpdateUserInput updateUserInput);

    User delete(Long id);

    Optional<User> findByName(String name);

    Optional<User> findById(Long id);
    
    List<User> findUsersByFilter(FilterUserInput filterUserInput);
}
