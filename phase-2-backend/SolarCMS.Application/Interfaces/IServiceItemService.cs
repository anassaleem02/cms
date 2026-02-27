using SolarCMS.Application.DTOs.Services;

namespace SolarCMS.Application.Interfaces;

public interface IServiceItemService
{
    Task<IEnumerable<ServiceDto>> GetAllAsync(bool activeOnly = true);
    Task<ServiceDto?> GetByIdAsync(int id);
    Task<ServiceDto> CreateAsync(CreateServiceDto dto);
    Task<ServiceDto> UpdateAsync(int id, UpdateServiceDto dto);
    Task DeleteAsync(int id);
    Task ReorderAsync(List<int> orderedIds);
}
