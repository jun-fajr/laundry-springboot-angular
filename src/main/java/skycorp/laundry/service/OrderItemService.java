package skycorp.laundry.service;

import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import skycorp.laundry.domain.LaundryItem;
import skycorp.laundry.domain.Order;
import skycorp.laundry.domain.OrderItem;
import skycorp.laundry.model.OrderItemDTO;
import skycorp.laundry.repos.LaundryItemRepository;
import skycorp.laundry.repos.OrderItemRepository;
import skycorp.laundry.repos.OrderRepository;
import skycorp.laundry.util.NotFoundException;


@Service
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;
    private final OrderRepository orderRepository;
    private final LaundryItemRepository laundryItemRepository;

    public OrderItemService(final OrderItemRepository orderItemRepository,
            final OrderRepository orderRepository,
            final LaundryItemRepository laundryItemRepository) {
        this.orderItemRepository = orderItemRepository;
        this.orderRepository = orderRepository;
        this.laundryItemRepository = laundryItemRepository;
    }

    public List<OrderItemDTO> findAll() {
        final List<OrderItem> orderItems = orderItemRepository.findAll(Sort.by("id"));
        return orderItems.stream()
                .map(orderItem -> mapToDTO(orderItem, new OrderItemDTO()))
                .toList();
    }

    public OrderItemDTO get(final Integer id) {
        return orderItemRepository.findById(id)
                .map(orderItem -> mapToDTO(orderItem, new OrderItemDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Integer create(final OrderItemDTO orderItemDTO) {
        final OrderItem orderItem = new OrderItem();
        mapToEntity(orderItemDTO, orderItem);
        return orderItemRepository.save(orderItem).getId();
    }

    public void update(final Integer id, final OrderItemDTO orderItemDTO) {
        final OrderItem orderItem = orderItemRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(orderItemDTO, orderItem);
        orderItemRepository.save(orderItem);
    }

    public void delete(final Integer id) {
        orderItemRepository.deleteById(id);
    }

    private OrderItemDTO mapToDTO(final OrderItem orderItem, final OrderItemDTO orderItemDTO) {
        orderItemDTO.setId(orderItem.getId());
        orderItemDTO.setQuantity(orderItem.getQuantity());
        orderItemDTO.setSubtotal(orderItem.getSubtotal());
        orderItemDTO.setCreatedAt(orderItem.getCreatedAt());
        orderItemDTO.setUpdatedAt(orderItem.getUpdatedAt());
        orderItemDTO.setOrder(orderItem.getOrder() == null ? null : orderItem.getOrder().getId());
        orderItemDTO.setLaundryItem(orderItem.getLaundryItem() == null ? null : orderItem.getLaundryItem().getId());
        return orderItemDTO;
    }

    private OrderItem mapToEntity(final OrderItemDTO orderItemDTO, final OrderItem orderItem) {
        orderItem.setQuantity(orderItemDTO.getQuantity());
        orderItem.setSubtotal(orderItemDTO.getSubtotal());
        orderItem.setCreatedAt(orderItemDTO.getCreatedAt());
        orderItem.setUpdatedAt(orderItemDTO.getUpdatedAt());
        final Order order = orderItemDTO.getOrder() == null ? null : orderRepository.findById(orderItemDTO.getOrder())
                .orElseThrow(() -> new NotFoundException("order not found"));
        orderItem.setOrder(order);
        final LaundryItem laundryItem = orderItemDTO.getLaundryItem() == null ? null : laundryItemRepository.findById(orderItemDTO.getLaundryItem())
                .orElseThrow(() -> new NotFoundException("laundryItem not found"));
        orderItem.setLaundryItem(laundryItem);
        return orderItem;
    }

}
