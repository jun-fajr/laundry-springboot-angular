package skycorp.laundry.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import skycorp.laundry.domain.Service;


public interface ServiceRepository extends JpaRepository<Service, Integer> {
}
