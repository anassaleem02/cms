namespace SolarCMS.Application.DTOs.Hero;

public class HeroDto
{
    public int Id { get; set; }
    public string Headline { get; set; } = string.Empty;
    public string Subheadline { get; set; } = string.Empty;
    public string PrimaryButtonText { get; set; } = string.Empty;
    public string PrimaryButtonUrl { get; set; } = string.Empty;
    public string SecondaryButtonText { get; set; } = string.Empty;
    public string SecondaryButtonUrl { get; set; } = string.Empty;
    public string BackgroundImageUrl { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public List<HeroStatDto> Stats { get; set; } = new();
}

public class HeroStatDto
{
    public int Id { get; set; }
    public string Value { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
}

public class CreateHeroDto
{
    public string Headline { get; set; } = string.Empty;
    public string Subheadline { get; set; } = string.Empty;
    public string PrimaryButtonText { get; set; } = string.Empty;
    public string PrimaryButtonUrl { get; set; } = string.Empty;
    public string SecondaryButtonText { get; set; } = string.Empty;
    public string SecondaryButtonUrl { get; set; } = string.Empty;
    public string BackgroundImageUrl { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public List<CreateHeroStatDto> Stats { get; set; } = new();
}

public class UpdateHeroDto : CreateHeroDto { }

public class CreateHeroStatDto
{
    public string Value { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
}
