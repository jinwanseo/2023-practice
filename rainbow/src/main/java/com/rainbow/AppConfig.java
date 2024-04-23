package com.rainbow;

import org.springframework.web.reactive.function.client.WebClient;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    /* Swagger Docs */
    @Bean
    public OpenAPI openAPI() {
        Info info = new Info().title("RPA Portal Express").version("v0.0.1")
            .description("Rpa portal Express API documentation");
        return new OpenAPI().components(new Components()).info(info);
    }

    /* Web Client */
    @Bean
    public WebClient webClient() {
        return WebClient.create();
    }
}
