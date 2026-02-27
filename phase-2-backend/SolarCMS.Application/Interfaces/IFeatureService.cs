using SolarCMS.Application.DTOs.Features;

namespace SolarCMS.Application.Interfaces;

public interface IFeatureService
{
    Task<IEnumerable<FeatureDto>> GetAllAsync(bool activeOnly = true);
    Task<FeatureDto?> GetByIdAsync(int id);
    Task<FeatureDto> CreateAsync(CreateFeatureDto dto);
    Task<FeatureDto> UpdateAsync(int id, UpdateFeatureDto dto);
    Task DeleteAsync(int id);
    Task ReorderAsync(List<int> orderedIds);
}
