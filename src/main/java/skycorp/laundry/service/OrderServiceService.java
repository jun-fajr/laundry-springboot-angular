package skycorp.laundry.service;

import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import skycorp.laundry.domain.Order;
import skycorp.laundry.domain.OrderService;
import skycorp.laundry.model.OrderServiceDTO;
import skycorp.laundry.repos.OrderRepository;
import skycorp.laundry.repos.OrderServiceRepository;
import skycorp.laundry.repos.ServiceRepository;
import skycorp.laundry.util.NotFoundException;


@Service
public class OrderServiceService {

    private final OrderServiceRepository orderServiceRepository;
    private final OrderRepository orderRepository;
    private final ServiceRepository serviceRepository;

    public OrderServiceService(final OrderServiceRepository orderServiceRepository,
            final OrderRepository orderRepository, final ServiceRepository serviceRepository) {
        this.orderServiceRepository = orderServiceRepository;
        this.orderRepository = orderRepository;
        this.serviceRepository = serviceRepository;
    }

    public List<OrderServiceDTO> findAll() {
        final List<OrderService> orderServices = orderServiceRepository.findAll(Sort.by("id"));
        return orderServices.stream()
                .map(orderService -> mapToDTO(orderService, new OrderServiceDTO()))
                .toList();
    }

    public OrderServiceDTO get(final Integer id) {
        return orderServiceRepository.findById(id)
                .map(orderService -> mapToDTO(orderService, new OrderServiceDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Integer create(final OrderServiceDTO orderServiceDTO) {
        final OrderService orderService = new OrderService();
        mapToEntity(orderServiceDTO, orderService);
        return orderServiceRepository.save(orderService).getId();
    }

    public void update(final Integer id, final OrderServiceDTO orderServiceDTO) {
        final OrderService orderService = orderServiceRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(orderServiceDTO, orderService);
        orderServiceRepository.save(orderService);
    }

    public void delete(final Integer id) {
        orderServiceRepository.deleteById(id);
    }

    private OrderServiceDTO mapToDTO(final OrderService orderService,
            final OrderServiceDTO orderServiceDTO) {
        orderServiceDTO.setId(orderService.getId());
        orderServiceDTO.setQuantity(orderService.getQuantity());
        orderServiceDTO.setSubtotal(orderService.getSubtotal());
        orderServiceDTO.setCreatedAt(orderService.getCreatedAt());
        orderServiceDTO.setUpdatedAt(orderService.getUpdatedAt());
        orderServiceDTO.setOrder(orderService.getOrder() == null ? null : orderService.getOrder().getId());
        orderServiceDTO.setService(orderService.getService() == null ? null : orderService.getService().getId());
        return orderServiceDTO;
    }

    private OrderService mapToEntity(final OrderServiceDTO orderServiceDTO,
            final OrderService orderService) {
        orderService.setQuantity(orderServiceDTO.getQuantity());
        orderService.setSubtotal(orderServiceDTO.getSubtotal());
        orderService.setCreatedAt(orderServiceDTO.getCreatedAt());
        orderService.setUpdatedAt(orderServiceDTO.getUpdatedAt());
        final Order order = orderServiceDTO.getOrder() == null ? null : orderRepository.findById(orderServiceDTO.getOrder())
                .orElseThrow(() -> new NotFoundException("order not found"));
        orderService.setOrder(order);
        final skycorp.laundry.domain.Service service = orderServiceDTO.getService() == null ? null : serviceRepository.findById(orderServiceDTO.getService())
                .orElseThrow(() -> new NotFoundException("service not found"));
        orderService.setService(service);
        return orderService;
    }

}
