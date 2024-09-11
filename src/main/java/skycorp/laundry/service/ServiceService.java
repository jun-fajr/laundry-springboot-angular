package skycorp.laundry.service;

import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import skycorp.laundry.domain.OrderService;
import skycorp.laundry.model.ServiceDTO;
import skycorp.laundry.repos.OrderServiceRepository;
import skycorp.laundry.repos.ServiceRepository;
import skycorp.laundry.util.NotFoundException;
import skycorp.laundry.util.ReferencedWarning;


@Service
public class ServiceService {

    private final ServiceRepository serviceRepository;
    private final OrderServiceRepository orderServiceRepository;

    public ServiceService(final ServiceRepository serviceRepository,
            final OrderServiceRepository orderServiceRepository) {
        this.serviceRepository = serviceRepository;
        this.orderServiceRepository = orderServiceRepository;
    }

    public List<ServiceDTO> findAll() {
        final List<skycorp.laundry.domain.Service> services = serviceRepository.findAll(Sort.by("id"));
        return services.stream()
                .map(service -> mapToDTO(service, new ServiceDTO()))
                .toList();
    }

    public ServiceDTO get(final Integer id) {
        return serviceRepository.findById(id)
                .map(service -> mapToDTO(service, new ServiceDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Integer create(final ServiceDTO serviceDTO) {
        final skycorp.laundry.domain.Service service = new skycorp.laundry.domain.Service();
        mapToEntity(serviceDTO, service);
        return serviceRepository.save(service).getId();
    }

    public void update(final Integer id, final ServiceDTO serviceDTO) {
        final skycorp.laundry.domain.Service service = serviceRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(serviceDTO, service);
        serviceRepository.save(service);
    }

    public void delete(final Integer id) {
        serviceRepository.deleteById(id);
    }

    private ServiceDTO mapToDTO(final skycorp.laundry.domain.Service service,
            final ServiceDTO serviceDTO) {
        serviceDTO.setId(service.getId());
        serviceDTO.setName(service.getName());
        serviceDTO.setDescription(service.getDescription());
        serviceDTO.setPrice(service.getPrice());
        serviceDTO.setCreatedAt(service.getCreatedAt());
        serviceDTO.setUpdatedAt(service.getUpdatedAt());
        return serviceDTO;
    }

    private skycorp.laundry.domain.Service mapToEntity(final ServiceDTO serviceDTO,
            final skycorp.laundry.domain.Service service) {
        service.setName(serviceDTO.getName());
        service.setDescription(serviceDTO.getDescription());
        service.setPrice(serviceDTO.getPrice());
        service.setCreatedAt(serviceDTO.getCreatedAt());
        service.setUpdatedAt(serviceDTO.getUpdatedAt());
        return service;
    }

    public ReferencedWarning getReferencedWarning(final Integer id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final skycorp.laundry.domain.Service service = serviceRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final OrderService serviceOrderService = orderServiceRepository.findFirstByService(service);
        if (serviceOrderService != null) {
            referencedWarning.setKey("service.orderService.service.referenced");
            referencedWarning.addParam(serviceOrderService.getId());
            return referencedWarning;
        }
        return null;
    }

}
