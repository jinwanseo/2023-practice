package com.rainbow.common.entity;

import com.rainbow.user.entity.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class CoreCreatedByUpdatedByEntity extends CoreEntity {

    @ManyToOne
    @JoinColumn(name = "created_by_id")
    private User createdBy;

    @ManyToOne
    @JoinColumn(name = "updated_by_id")
    private User updatedBy;
}
