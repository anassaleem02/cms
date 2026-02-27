using SolarCMS.Application.DTOs.Navigation;

namespace SolarCMS.Application.Interfaces;

public interface INavigationService
{
    Task<IEnumerable<NavigationItemDto>> GetAllAsync(bool activeOnly = true);
    Task<NavigationItemDto?> GetByIdAsync(int id);
    Task<NavigationItemDto> CreateAsync(CreateNavigationItemDto dto);
    Task<NavigationItemDto> UpdateAsync(int id, UpdateNavigationItemDto dto);
    Task DeleteAsync(int id);
    Task ReorderAsync(List<int> orderedIds);
}
