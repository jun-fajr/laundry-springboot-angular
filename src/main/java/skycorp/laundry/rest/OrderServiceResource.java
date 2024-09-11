package skycorp.laundry.rest;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import skycorp.laundry.domain.Order;
import skycorp.laundry.domain.Service;
import skycorp.laundry.model.OrderServiceDTO;
import skycorp.laundry.repos.OrderRepository;
import skycorp.laundry.repos.ServiceRepository;
import skycorp.laundry.service.OrderServiceService;
import skycorp.laundry.util.CustomCollectors;


@RestController
@RequestMapping(value = "/api/orderServices", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderServiceResource {

    private final OrderServiceService orderServiceService;
    private final OrderRepository orderRepository;
    private final ServiceRepository serviceRepository;

    public OrderServiceResource(final OrderServiceService orderServiceService,
            final OrderRepository orderRepository, final ServiceRepository serviceRepository) {
        this.orderServiceService = orderServiceService;
        this.orderRepository = orderRepository;
        this.serviceRepository = serviceRepository;
    }

    @GetMapping
    public ResponseEntity<List<OrderServiceDTO>> getAllOrderServices() {
        return ResponseEntity.ok(orderServiceService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderServiceDTO> getOrderService(
            @PathVariable(name = "id") final Integer id) {
        return ResponseEntity.ok(orderServiceService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Integer> createOrderService(
            @RequestBody @Valid final OrderServiceDTO orderServiceDTO) {
        final Integer createdId = orderServiceService.create(orderServiceDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Integer> updateOrderService(@PathVariable(name = "id") final Integer id,
            @RequestBody @Valid final OrderServiceDTO orderServiceDTO) {
        orderServiceService.update(id, orderServiceDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteOrderService(@PathVariable(name = "id") final Integer id) {
        orderServiceService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/orderValues")
    public ResponseEntity<Map<Integer, String>> getOrderValues() {
        return ResponseEntity.ok(orderRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Order::getId, Order::getStatus)));
    }

    @GetMapping("/serviceValues")
    public ResponseEntity<Map<Integer, String>> getServiceValues() {
        return ResponseEntity.ok(serviceRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Service::getId, Service::getName)));
    }

}
