using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SolarCMS.Application.DTOs.Media;
using SolarCMS.Application.Interfaces;

namespace SolarCMS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class MediaController : ControllerBase
{
    private readonly IMediaService _mediaService;
    public MediaController(IMediaService mediaService) { _mediaService = mediaService; }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? contentType, [FromQuery] string? tags)
        => Ok(await _mediaService.GetAllAsync(contentType, tags));

    [HttpPost("upload")]
    public async Task<IActionResult> Upload(IFormFile file, [FromForm] string? tags)
    {
        if (file is null || file.Length == 0)
            return BadRequest("No file provided.");

        var dto = new UploadMediaDto
        {
            FileStream = file.OpenReadStream(),
            FileName = file.FileName,
            ContentType = file.ContentType,
            Tags = tags
        };

        var result = await _mediaService.UploadAsync(dto);
        return Ok(result);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _mediaService.DeleteAsync(id);
        return NoContent();
    }
}
