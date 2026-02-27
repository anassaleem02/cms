using SolarCMS.Application.DTOs.Media;

namespace SolarCMS.Application.Interfaces;

public interface IMediaService
{
    Task<IEnumerable<MediaFileDto>> GetAllAsync(string? contentType = null, string? tags = null);
    Task<MediaFileDto> UploadAsync(UploadMediaDto dto);
    Task DeleteAsync(int id);
}
