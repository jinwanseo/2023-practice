package com.rainbow;

import com.rainbow.team.repository.DbTeamRepository;
import com.rainbow.team.repository.MemoryTeamRepository;
import com.rainbow.team.repository.TeamRepository;
import com.rainbow.user.repository.DbUserRepository;
import com.rainbow.user.repository.MemoryUserRepository;
import com.rainbow.user.repository.UserRepository;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @PersistenceContext
    private EntityManager entityManager;

    /* Repository */
    @Bean
    public UserRepository userRepository() {
        return new DbUserRepository(entityManager, this.teamRepository());
    }

    @Bean
    public TeamRepository teamRepository() {
        return new DbTeamRepository(entityManager);
    }

    /* Swagger Docs */
    @Bean
    public OpenAPI openAPI() {
        Info info = new Info().title("RPA Portal Express").version("v0.0.1")
            .description("Rpa portal Express API documentation");
        return new OpenAPI().components(new Components()).info(info);
    }

}
