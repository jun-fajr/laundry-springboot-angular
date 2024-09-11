package skycorp.laundry.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import skycorp.laundry.domain.Order;
import skycorp.laundry.domain.OrderService;
import skycorp.laundry.domain.Service;


public interface OrderServiceRepository extends JpaRepository<OrderService, Integer> {

    OrderService findFirstByOrder(Order order);

    OrderService findFirstByService(Service service);

}
