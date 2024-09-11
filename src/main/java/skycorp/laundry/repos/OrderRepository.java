package skycorp.laundry.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import skycorp.laundry.domain.Customer;
import skycorp.laundry.domain.Order;


public interface OrderRepository extends JpaRepository<Order, Integer> {

    Order findFirstByCustomer(Customer customer);

}
