package skycorp.laundry.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.OffsetDateTime;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CustomerDTO {

    private Integer id;

    @NotNull
    @Size(max = 100)
    private String name;

    @Size(max = 100)
    private String email;

    @NotNull
    @Size(max = 20)
    private String phone;

    @Size(max = 255)
    private String address;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

}
