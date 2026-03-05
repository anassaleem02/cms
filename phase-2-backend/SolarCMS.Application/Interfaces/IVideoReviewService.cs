using SolarCMS.Application.DTOs.VideoReviews;

namespace SolarCMS.Application.Interfaces;

public interface IVideoReviewService
{
    Task<IEnumerable<VideoReviewDto>> GetAllAsync(bool activeOnly = true);
    Task<VideoReviewDto?> GetByIdAsync(int id);
    Task<VideoReviewDto> CreateAsync(CreateVideoReviewDto dto);
    Task<VideoReviewDto> UpdateAsync(int id, UpdateVideoReviewDto dto);
    Task DeleteAsync(int id);
    Task ReorderAsync(List<int> orderedIds);
}
