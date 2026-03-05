using SolarCMS.Application.DTOs.Faqs;

namespace SolarCMS.Application.Interfaces;

public interface IFaqService
{
    Task<IEnumerable<FaqDto>> GetAllAsync(bool activeOnly = true);
    Task<FaqDto?> GetByIdAsync(int id);
    Task<FaqDto> CreateAsync(CreateFaqDto dto);
    Task<FaqDto> UpdateAsync(int id, UpdateFaqDto dto);
    Task DeleteAsync(int id);
    Task ReorderAsync(List<int> orderedIds);
}
