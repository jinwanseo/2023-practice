package com.rainbow.bot.repository;

import com.rainbow.bot.dto.AALoginOutput;
import com.rainbow.bot.dto.AARpaScriptListOutput;
import com.rainbow.bot.dto.AATokenValidOutput;
import com.rainbow.bot.entity.RpaScript;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestClientException;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Repository
public class ProxyBotRepository implements BotRepository {

    private final WebClient webclient;
    private final String baseUrl;
    private final String userId;
    private final String userPw;
    private String accessToken;

    public ProxyBotRepository(WebClient webclient, Environment environment) {
        this.webclient = webclient;
        this.baseUrl = environment.getProperty("automationUrl");
        this.userId = environment.getProperty("automationId");
        this.userPw = environment.getProperty("automationPw");
    }

    // 토큰 유효 확인
    @Override
    public Boolean checkToken() {
        String url = this.baseUrl + "/v1/authentication/token";
        if (this.accessToken == null) {
            return false;
        }
        Optional<AATokenValidOutput> tokenInfo = Optional.ofNullable(this.webclient.get()
            .uri(url)
            .header("X-Authorization", this.accessToken)
            .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .retrieve()
            .bodyToMono(new ParameterizedTypeReference<AATokenValidOutput>() {
            }).block());

        if (tokenInfo.isEmpty()) {
            return false;
        }
        return tokenInfo.get().getValid();
    }

    // 로그인
    @Override
    public String login() {
        String url = this.baseUrl + "/v1/authentication";
        Optional<AALoginOutput> response = Optional.ofNullable(this.webclient.post()
            .uri(url)
            .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .body(BodyInserters.fromValue(
                Map.of("username", this.userId, "password", this.userPw)
            ))
            .retrieve()
            .bodyToMono(new ParameterizedTypeReference<AALoginOutput>() {
            }).block());
        if (response.isEmpty()) {
            throw new RestClientException("CR 접속 실패");
        }

        return response.get().getToken();
    }

    @Override
    public List<RpaScript> getRpaScriptList() {
        if (this.accessToken == null) {
            this.accessToken = this.login();
        }

        String url = this.baseUrl + "/v2/repository/workspaces/public/files/list";
        Optional<AARpaScriptListOutput> response = Optional.ofNullable(this.webclient
            .post()
            .uri(url)
            .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .header("X-Authorization", this.accessToken)
            .body(BodyInserters.fromValue(buildPageParameters(0, 1000)))
            .retrieve()
            .bodyToMono(AARpaScriptListOutput.class)
            .block());

        if (response.isEmpty()) {
            throw new RestClientException("CR 통신 오류 입니다");
        }

        return response.get().getList();
    }


    @Override
    public Boolean checkRpaScriptById(Integer rpaScriptId) {
        return this.getRpaScriptList().stream().anyMatch(r -> r.getId().equals(rpaScriptId));
    }


    private Map<String, Object> buildPageParameters(int offset, int length) {
        Map<String, Object> pageParameters = new HashMap<>();
        pageParameters.put("page", Map.of("offset", offset, "length", length));
        return pageParameters;
    }
}
