package skycorp.laundry.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import skycorp.laundry.domain.Customer;


public interface CustomerRepository extends JpaRepository<Customer, Integer> {
}
