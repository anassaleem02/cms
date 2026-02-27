namespace SolarCMS.Application.DTOs.Testimonials;

public class TestimonialDto
{
    public int Id { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerTitle { get; set; } = string.Empty;
    public string CustomerImageUrl { get; set; } = string.Empty;
    public string Review { get; set; } = string.Empty;
    public int Rating { get; set; }
    public bool IsActive { get; set; }
    public int DisplayOrder { get; set; }
}

public class CreateTestimonialDto
{
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerTitle { get; set; } = string.Empty;
    public string CustomerImageUrl { get; set; } = string.Empty;
    public string Review { get; set; } = string.Empty;
    public int Rating { get; set; } = 5;
    public bool IsActive { get; set; } = true;
    public int DisplayOrder { get; set; }
}

public class UpdateTestimonialDto : CreateTestimonialDto { }
