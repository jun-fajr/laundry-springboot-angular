package skycorp.laundry.service;

import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import skycorp.laundry.domain.Customer;
import skycorp.laundry.domain.Order;
import skycorp.laundry.domain.OrderItem;
import skycorp.laundry.domain.Payment;
import skycorp.laundry.model.OrderDTO;
import skycorp.laundry.repos.CustomerRepository;
import skycorp.laundry.repos.OrderItemRepository;
import skycorp.laundry.repos.OrderRepository;
import skycorp.laundry.repos.OrderServiceRepository;
import skycorp.laundry.repos.PaymentRepository;
import skycorp.laundry.util.NotFoundException;
import skycorp.laundry.util.ReferencedWarning;


@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final OrderItemRepository orderItemRepository;
    private final PaymentRepository paymentRepository;
    private final OrderServiceRepository orderServiceRepository;

    public OrderService(final OrderRepository orderRepository,
            final CustomerRepository customerRepository,
            final OrderItemRepository orderItemRepository,
            final PaymentRepository paymentRepository,
            final OrderServiceRepository orderServiceRepository) {
        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
        this.orderItemRepository = orderItemRepository;
        this.paymentRepository = paymentRepository;
        this.orderServiceRepository = orderServiceRepository;
    }

    public List<OrderDTO> findAll() {
        final List<Order> orders = orderRepository.findAll(Sort.by("id"));
        return orders.stream()
                .map(order -> mapToDTO(order, new OrderDTO()))
                .toList();
    }

    public OrderDTO get(final Integer id) {
        return orderRepository.findById(id)
                .map(order -> mapToDTO(order, new OrderDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Integer create(final OrderDTO orderDTO) {
        final Order order = new Order();
        mapToEntity(orderDTO, order);
        return orderRepository.save(order).getId();
    }

    public void update(final Integer id, final OrderDTO orderDTO) {
        final Order order = orderRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(orderDTO, order);
        orderRepository.save(order);
    }

    public void delete(final Integer id) {
        orderRepository.deleteById(id);
    }

    private OrderDTO mapToDTO(final Order order, final OrderDTO orderDTO) {
        orderDTO.setId(order.getId());
        orderDTO.setTotalAmount(order.getTotalAmount());
        orderDTO.setStatus(order.getStatus());
        orderDTO.setCreatedAt(order.getCreatedAt());
        orderDTO.setUpdatedAt(order.getUpdatedAt());
        orderDTO.setCustomer(order.getCustomer() == null ? null : order.getCustomer().getId());
        return orderDTO;
    }

    private Order mapToEntity(final OrderDTO orderDTO, final Order order) {
        order.setTotalAmount(orderDTO.getTotalAmount());
        order.setStatus(orderDTO.getStatus());
        order.setCreatedAt(orderDTO.getCreatedAt());
        order.setUpdatedAt(orderDTO.getUpdatedAt());
        final Customer customer = orderDTO.getCustomer() == null ? null : customerRepository.findById(orderDTO.getCustomer())
                .orElseThrow(() -> new NotFoundException("customer not found"));
        order.setCustomer(customer);
        return order;
    }

    public ReferencedWarning getReferencedWarning(final Integer id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Order order = orderRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final OrderItem orderOrderItem = orderItemRepository.findFirstByOrder(order);
        if (orderOrderItem != null) {
            referencedWarning.setKey("order.orderItem.order.referenced");
            referencedWarning.addParam(orderOrderItem.getId());
            return referencedWarning;
        }
        final Payment orderPayment = paymentRepository.findFirstByOrder(order);
        if (orderPayment != null) {
            referencedWarning.setKey("order.payment.order.referenced");
            referencedWarning.addParam(orderPayment.getId());
            return referencedWarning;
        }
        final skycorp.laundry.domain.OrderService orderOrderService = orderServiceRepository.findFirstByOrder(order);
        if (orderOrderService != null) {
            referencedWarning.setKey("order.orderService.order.referenced");
            referencedWarning.addParam(orderOrderService.getId());
            return referencedWarning;
        }
        return null;
    }

}
