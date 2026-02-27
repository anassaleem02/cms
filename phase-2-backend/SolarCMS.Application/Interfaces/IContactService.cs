using SolarCMS.Application.DTOs.Contact;

namespace SolarCMS.Application.Interfaces;

public interface IContactService
{
    Task<IEnumerable<ContactMessageDto>> GetAllAsync();
    Task<IEnumerable<ContactMessageDto>> GetUnreadAsync();
    Task<ContactMessageDto?> GetByIdAsync(int id);
    Task SubmitAsync(SubmitContactDto dto);
    Task MarkAsReadAsync(int id);
    Task DeleteAsync(int id);
    Task<int> GetUnreadCountAsync();
}
