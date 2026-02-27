using System.Net;
using System.Text.Json;
using SolarCMS.Domain.Exceptions;

namespace SolarCMS.API.Middleware;

public class ErrorHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ErrorHandlingMiddleware> _logger;

    public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception");
            await HandleExceptionAsync(context, ex);
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";

        var (statusCode, message, errors) = exception switch
        {
            NotFoundException nfe => (HttpStatusCode.NotFound, nfe.Message, (IDictionary<string, string[]>?)null),
            UnauthorizedException uae => (HttpStatusCode.Unauthorized, uae.Message, null),
            Domain.Exceptions.ValidationException ve => (HttpStatusCode.BadRequest, ve.Message, ve.Errors),
            _ => (HttpStatusCode.InternalServerError, "An unexpected error occurred.", null)
        };

        context.Response.StatusCode = (int)statusCode;

        var response = errors is null
            ? new { status = (int)statusCode, message }
            : (object)new { status = (int)statusCode, message, errors };

        await context.Response.WriteAsync(JsonSerializer.Serialize(response,
            new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }));
    }
}
