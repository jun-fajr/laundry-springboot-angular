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
import skycorp.laundry.domain.LaundryItem;
import skycorp.laundry.domain.Order;
import skycorp.laundry.model.OrderItemDTO;
import skycorp.laundry.repos.LaundryItemRepository;
import skycorp.laundry.repos.OrderRepository;
import skycorp.laundry.service.OrderItemService;
import skycorp.laundry.util.CustomCollectors;


@RestController
@RequestMapping(value = "/api/orderItems", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderItemResource {

    private final OrderItemService orderItemService;
    private final OrderRepository orderRepository;
    private final LaundryItemRepository laundryItemRepository;

    public OrderItemResource(final OrderItemService orderItemService,
            final OrderRepository orderRepository,
            final LaundryItemRepository laundryItemRepository) {
        this.orderItemService = orderItemService;
        this.orderRepository = orderRepository;
        this.laundryItemRepository = laundryItemRepository;
    }

    @GetMapping
    public ResponseEntity<List<OrderItemDTO>> getAllOrderItems() {
        return ResponseEntity.ok(orderItemService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderItemDTO> getOrderItem(@PathVariable(name = "id") final Integer id) {
        return ResponseEntity.ok(orderItemService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Integer> createOrderItem(
            @RequestBody @Valid final OrderItemDTO orderItemDTO) {
        final Integer createdId = orderItemService.create(orderItemDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Integer> updateOrderItem(@PathVariable(name = "id") final Integer id,
            @RequestBody @Valid final OrderItemDTO orderItemDTO) {
        orderItemService.update(id, orderItemDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteOrderItem(@PathVariable(name = "id") final Integer id) {
        orderItemService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/orderValues")
    public ResponseEntity<Map<Integer, String>> getOrderValues() {
        return ResponseEntity.ok(orderRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Order::getId, Order::getStatus)));
    }

    @GetMapping("/laundryItemValues")
    public ResponseEntity<Map<Integer, String>> getLaundryItemValues() {
        return ResponseEntity.ok(laundryItemRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(LaundryItem::getId, LaundryItem::getName)));
    }

}
