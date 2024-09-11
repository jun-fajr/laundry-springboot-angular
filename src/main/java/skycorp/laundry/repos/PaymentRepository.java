package skycorp.laundry.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import skycorp.laundry.domain.Order;
import skycorp.laundry.domain.Payment;


public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    Payment findFirstByOrder(Order order);

}
