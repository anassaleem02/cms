using FluentValidation;
using SolarCMS.Application.DTOs.Contact;

namespace SolarCMS.Application.Validators.Contact;

public class SubmitContactValidator : AbstractValidator<SubmitContactDto>
{
    public SubmitContactValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required.")
            .MaximumLength(100).WithMessage("Name must not exceed 100 characters.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Invalid email format.");

        RuleFor(x => x.Phone)
            .NotEmpty().WithMessage("Phone is required.")
            .MaximumLength(20).WithMessage("Phone must not exceed 20 characters.");

        RuleFor(x => x.Message)
            .NotEmpty().WithMessage("Message is required.")
            .MinimumLength(10).WithMessage("Message must be at least 10 characters.")
            .MaximumLength(2000).WithMessage("Message must not exceed 2000 characters.");
    }
}
