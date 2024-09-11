package skycorp.laundry.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import skycorp.laundry.domain.Employee;


public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}
