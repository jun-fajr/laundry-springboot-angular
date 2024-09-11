package skycorp.laundry.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import skycorp.laundry.domain.LaundryItem;


public interface LaundryItemRepository extends JpaRepository<LaundryItem, Integer> {
}
