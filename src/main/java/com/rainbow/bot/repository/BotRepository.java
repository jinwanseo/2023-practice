package com.rainbow.bot.repository;

import com.rainbow.bot.entity.RpaScript;
import java.util.List;

public interface BotRepository {

    Boolean checkToken();

    String login();

    List<RpaScript> getRpaScriptList();

    Boolean checkRpaScriptById(Integer rpaScriptId);
    
}
