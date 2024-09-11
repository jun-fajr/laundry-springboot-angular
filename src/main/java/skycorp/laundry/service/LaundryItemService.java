package skycorp.laundry.service;

import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import skycorp.laundry.domain.LaundryItem;
import skycorp.laundry.domain.OrderItem;
import skycorp.laundry.model.LaundryItemDTO;
import skycorp.laundry.repos.LaundryItemRepository;
import skycorp.laundry.repos.OrderItemRepository;
import skycorp.laundry.util.NotFoundException;
import skycorp.laundry.util.ReferencedWarning;


@Service
public class LaundryItemService {

    private final LaundryItemRepository laundryItemRepository;
    private final OrderItemRepository orderItemRepository;

    public LaundryItemService(final LaundryItemRepository laundryItemRepository,
            final OrderItemRepository orderItemRepository) {
        this.laundryItemRepository = laundryItemRepository;
        this.orderItemRepository = orderItemRepository;
    }

    public List<LaundryItemDTO> findAll() {
        final List<LaundryItem> laundryItems = laundryItemRepository.findAll(Sort.by("id"));
        return laundryItems.stream()
                .map(laundryItem -> mapToDTO(laundryItem, new LaundryItemDTO()))
                .toList();
    }

    public LaundryItemDTO get(final Integer id) {
        return laundryItemRepository.findById(id)
                .map(laundryItem -> mapToDTO(laundryItem, new LaundryItemDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Integer create(final LaundryItemDTO laundryItemDTO) {
        final LaundryItem laundryItem = new LaundryItem();
        mapToEntity(laundryItemDTO, laundryItem);
        return laundryItemRepository.save(laundryItem).getId();
    }

    public void update(final Integer id, final LaundryItemDTO laundryItemDTO) {
        final LaundryItem laundryItem = laundryItemRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(laundryItemDTO, laundryItem);
        laundryItemRepository.save(laundryItem);
    }

    public void delete(final Integer id) {
        laundryItemRepository.deleteById(id);
    }

    private LaundryItemDTO mapToDTO(final LaundryItem laundryItem,
            final LaundryItemDTO laundryItemDTO) {
        laundryItemDTO.setId(laundryItem.getId());
        laundryItemDTO.setName(laundryItem.getName());
        laundryItemDTO.setDescription(laundryItem.getDescription());
        laundryItemDTO.setPrice(laundryItem.getPrice());
        laundryItemDTO.setCreatedAt(laundryItem.getCreatedAt());
        laundryItemDTO.setUpdatedAt(laundryItem.getUpdatedAt());
        return laundryItemDTO;
    }

    private LaundryItem mapToEntity(final LaundryItemDTO laundryItemDTO,
            final LaundryItem laundryItem) {
        laundryItem.setName(laundryItemDTO.getName());
        laundryItem.setDescription(laundryItemDTO.getDescription());
        laundryItem.setPrice(laundryItemDTO.getPrice());
        laundryItem.setCreatedAt(laundryItemDTO.getCreatedAt());
        laundryItem.setUpdatedAt(laundryItemDTO.getUpdatedAt());
        return laundryItem;
    }

    public ReferencedWarning getReferencedWarning(final Integer id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final LaundryItem laundryItem = laundryItemRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final OrderItem laundryItemOrderItem = orderItemRepository.findFirstByLaundryItem(laundryItem);
        if (laundryItemOrderItem != null) {
            referencedWarning.setKey("laundryItem.orderItem.laundryItem.referenced");
            referencedWarning.addParam(laundryItemOrderItem.getId());
            return referencedWarning;
        }
        return null;
    }

}
