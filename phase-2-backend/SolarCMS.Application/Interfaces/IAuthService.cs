using SolarCMS.Application.DTOs.Auth;

namespace SolarCMS.Application.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> LoginAsync(LoginDto dto);
    Task<AuthResponseDto> RefreshTokenAsync(string token);
    Task ChangePasswordAsync(int userId, ChangePasswordDto dto);
}
