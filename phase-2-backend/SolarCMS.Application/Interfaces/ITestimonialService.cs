using SolarCMS.Application.DTOs.Testimonials;

namespace SolarCMS.Application.Interfaces;

public interface ITestimonialService
{
    Task<IEnumerable<TestimonialDto>> GetAllAsync(bool activeOnly = true);
    Task<TestimonialDto?> GetByIdAsync(int id);
    Task<TestimonialDto> CreateAsync(CreateTestimonialDto dto);
    Task<TestimonialDto> UpdateAsync(int id, UpdateTestimonialDto dto);
    Task DeleteAsync(int id);
    Task ReorderAsync(List<int> orderedIds);
}
