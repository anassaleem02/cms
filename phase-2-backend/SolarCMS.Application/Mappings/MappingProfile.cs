using AutoMapper;
using SolarCMS.Application.DTOs.Contact;
using SolarCMS.Application.DTOs.Features;
using SolarCMS.Application.DTOs.Hero;
using SolarCMS.Application.DTOs.Media;
using SolarCMS.Application.DTOs.Navigation;
using SolarCMS.Application.DTOs.Products;
using SolarCMS.Application.DTOs.Services;
using SolarCMS.Application.DTOs.Settings;
using SolarCMS.Application.DTOs.Testimonials;
using SolarCMS.Domain.Entities;

namespace SolarCMS.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Product
        CreateMap<Product, ProductDto>();
        CreateMap<ProductImage, ProductImageDto>();
        CreateMap<ProductSpecification, ProductSpecificationDto>();
        CreateMap<CreateProductDto, Product>()
            .ForMember(d => d.Slug, opt => opt.Ignore())
            .ForMember(d => d.Id, opt => opt.Ignore())
            .ForMember(d => d.CreatedAt, opt => opt.Ignore())
            .ForMember(d => d.UpdatedAt, opt => opt.Ignore())
            .ForMember(d => d.Images, opt => opt.Ignore())
            .ForMember(d => d.Specifications, opt => opt.Ignore());
        CreateMap<UpdateProductDto, Product>()
            .ForMember(d => d.Slug, opt => opt.Ignore())
            .ForMember(d => d.Id, opt => opt.Ignore())
            .ForMember(d => d.CreatedAt, opt => opt.Ignore())
            .ForMember(d => d.UpdatedAt, opt => opt.Ignore())
            .ForMember(d => d.Images, opt => opt.Ignore())
            .ForMember(d => d.Specifications, opt => opt.Ignore());
        CreateMap<AddProductImageDto, ProductImage>()
            .ForMember(d => d.Id, opt => opt.Ignore())
            .ForMember(d => d.CreatedAt, opt => opt.Ignore())
            .ForMember(d => d.UpdatedAt, opt => opt.Ignore())
            .ForMember(d => d.Product, opt => opt.Ignore())
            .ForMember(d => d.ProductId, opt => opt.Ignore());
        CreateMap<AddSpecificationDto, ProductSpecification>()
            .ForMember(d => d.Id, opt => opt.Ignore())
            .ForMember(d => d.CreatedAt, opt => opt.Ignore())
            .ForMember(d => d.UpdatedAt, opt => opt.Ignore())
            .ForMember(d => d.Product, opt => opt.Ignore())
            .ForMember(d => d.ProductId, opt => opt.Ignore());

        // Hero
        CreateMap<HeroSection, HeroDto>();
        CreateMap<HeroStat, HeroStatDto>();
        CreateMap<CreateHeroDto, HeroSection>()
            .ForMember(d => d.Id, opt => opt.Ignore())
            .ForMember(d => d.CreatedAt, opt => opt.Ignore())
            .ForMember(d => d.UpdatedAt, opt => opt.Ignore())
            .ForMember(d => d.Stats, opt => opt.Ignore());
        CreateMap<UpdateHeroDto, HeroSection>()
            .ForMember(d => d.Id, opt => opt.Ignore())
            .ForMember(d => d.CreatedAt, opt => opt.Ignore())
            .ForMember(d => d.UpdatedAt, opt => opt.Ignore())
            .ForMember(d => d.Stats, opt => opt.Ignore());

        // Feature
        CreateMap<Feature, FeatureDto>();
        CreateMap<CreateFeatureDto, Feature>()
            .ForMember(d => d.Id, opt => opt.Ignore())
            .ForMember(d => d.CreatedAt, opt => opt.Ignore())
            .ForMember(d => d.UpdatedAt, opt => opt.Ignore());
        CreateMap<UpdateFeatureDto, Feature>()
            .ForMember(d => d.Id, opt => opt.Ignore())
            .ForMember(d => d.CreatedAt, opt => opt.Ignore())
            .ForMember(d => d.UpdatedAt, opt => opt.Ignore());

        // Testimonial
        CreateMap<Testimonial, TestimonialDto>();
        CreateMap<CreateTestimonialDto, Testimonial>()
            .ForMember(d => d.Id, opt => opt.Ignore())
            .ForMember(d => d.CreatedAt, opt => opt.Ignore())
            .ForMember(d => d.UpdatedAt, opt => opt.Ignore());
        CreateMap<UpdateTestimonialDto, Testimonial>()
            .ForMember(d => d.Id, opt => opt.Ignore())
            .ForMember(d => d.CreatedAt, opt => opt.Ignore())
            .ForMember(d => d.UpdatedAt, opt => opt.Ignore());

        // Service
        CreateMap<Domain.Entities.Service, ServiceDto>();
        CreateMap<CreateServiceDto, Domain.Entities.Service>()
            .ForMember(d => d.Id, opt => opt.Ignore())
            .ForMember(d => d.CreatedAt, opt => opt.Ignore())
            .ForMember(d => d.UpdatedAt, opt => opt.Ignore());
        CreateMap<UpdateServiceDto, Domain.Entities.Service>()
            .ForMember(d => d.Id, opt => opt.Ignore())
            .ForMember(d => d.CreatedAt, opt => opt.Ignore())
            .ForMember(d => d.UpdatedAt, opt => opt.Ignore());

        // Contact
        CreateMap<ContactMessage, ContactMessageDto>();
        CreateMap<SubmitContactDto, ContactMessage>()
            .ForMember(d => d.Id, opt => opt.Ignore())
            .ForMember(d => d.CreatedAt, opt => opt.Ignore())
            .ForMember(d => d.UpdatedAt, opt => opt.Ignore())
            .ForMember(d => d.IsRead, opt => opt.Ignore())
            .ForMember(d => d.ReadAt, opt => opt.Ignore());

        // Navigation
        CreateMap<NavigationItem, NavigationItemDto>();
        CreateMap<CreateNavigationItemDto, NavigationItem>()
            .ForMember(d => d.Id, opt => opt.Ignore())
            .ForMember(d => d.CreatedAt, opt => opt.Ignore())
            .ForMember(d => d.UpdatedAt, opt => opt.Ignore());
        CreateMap<UpdateNavigationItemDto, NavigationItem>()
            .ForMember(d => d.Id, opt => opt.Ignore())
            .ForMember(d => d.CreatedAt, opt => opt.Ignore())
            .ForMember(d => d.UpdatedAt, opt => opt.Ignore());

        // Settings
        CreateMap<SiteSettings, SiteSettingsDto>();
        CreateMap<UpdateSiteSettingsDto, SiteSettings>()
            .ForMember(d => d.Id, opt => opt.Ignore())
            .ForMember(d => d.CreatedAt, opt => opt.Ignore())
            .ForMember(d => d.UpdatedAt, opt => opt.Ignore());

        // Media
        CreateMap<MediaFile, MediaFileDto>();
    }
}
