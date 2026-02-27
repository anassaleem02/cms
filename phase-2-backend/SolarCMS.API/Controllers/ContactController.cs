using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SolarCMS.Application.DTOs.Contact;
using SolarCMS.Application.Interfaces;

namespace SolarCMS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IContactService _contactService;
    public ContactController(IContactService contactService) { _contactService = contactService; }

    /// <summary>Submit a contact message (Public)</summary>
    [HttpPost]
    public async Task<IActionResult> Submit([FromBody] SubmitContactDto dto)
    {
        await _contactService.SubmitAsync(dto);
        return Ok(new { message = "Your message has been received. We will contact you shortly." });
    }

    /// <summary>Get all contact messages (Admin)</summary>
    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAll()
        => Ok(await _contactService.GetAllAsync());

    /// <summary>Get unread messages (Admin)</summary>
    [HttpGet("unread")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetUnread()
        => Ok(await _contactService.GetUnreadAsync());

    /// <summary>Get unread count (Admin)</summary>
    [HttpGet("unread/count")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetUnreadCount()
        => Ok(new { count = await _contactService.GetUnreadCountAsync() });

    /// <summary>Get message by ID (Admin)</summary>
    [HttpGet("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetById(int id)
    {
        var m = await _contactService.GetByIdAsync(id);
        return m is null ? NotFound() : Ok(m);
    }

    /// <summary>Mark message as read (Admin)</summary>
    [HttpPut("{id:int}/read")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> MarkAsRead(int id)
    {
        await _contactService.MarkAsReadAsync(id);
        return NoContent();
    }

    /// <summary>Delete message (Admin)</summary>
    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        await _contactService.DeleteAsync(id);
        return NoContent();
    }
}
