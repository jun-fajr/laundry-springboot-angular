package skycorp.laundry.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import skycorp.laundry.domain.LaundryItem;
import skycorp.laundry.domain.Order;
import skycorp.laundry.domain.OrderItem;


public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {

    OrderItem findFirstByOrder(Order order);

    OrderItem findFirstByLaundryItem(LaundryItem laundryItem);

}
