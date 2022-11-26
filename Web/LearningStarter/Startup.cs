using System;
using System.Linq;
using System.Threading.Tasks;
using LearningStarter.Data;
using LearningStarter.Entities;
using LearningStarter.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace LearningStarter
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddControllers();

            services.AddHsts(options =>
            {
                options.MaxAge = TimeSpan.MaxValue;
                options.Preload = true;
                options.IncludeSubDomains = true;
            });

            services.AddDbContext<DataContext>(options =>
            {
                // options.UseInMemoryDatabase("FooBar");
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });

            //TODO
            services.AddMvc();

            services
                .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options =>
                {
                    options.Events.OnRedirectToLogin = context =>
                    {
                        context.Response.StatusCode = 401;
                        return Task.CompletedTask;
                    };
                });

            services.AddAuthorization();

            // Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Learning Starter Server",
                    Version = "v1",
                    Description = "Description for the API goes here.",
                });

                c.CustomOperationIds(apiDesc => apiDesc.TryGetMethodInfo(out var methodInfo) ? methodInfo.Name : null);
                c.MapType(typeof(IFormFile), () => new OpenApiSchema { Type = "file", Format = "binary" });
            });

            services.AddSpaStaticFiles(config =>
            {
                config.RootPath = "learning-starter-web/build";
            });

            services.AddHttpContextAccessor();

            // configure DI for application services
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DataContext dataContext)
        {
            dataContext.Database.EnsureDeleted();
            dataContext.Database.EnsureCreated();

            app.UseHsts();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            // global cors policy
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger(options =>
            {
                options.SerializeAsV2 = true;
            }); ;

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Learning Starter Server API V1");
            });

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(x => x.MapControllers());

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "learning-starter-web";
                if (env.IsDevelopment())
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:3001");
                }
            });

            SeedUsers(dataContext);
            SeedIngredients(dataContext);
            SeedOrders(dataContext);
            SeedOrderItems(dataContext);
            SeedMenuItems(dataContext);
        }

        private void SeedIngredients(DataContext dataContext)
        {
            if (!dataContext.Ingredients.Any())
            {
                var seededIngredient = new Ingredients
                {
                    Name = "Salt",
                    Stock = 1,
                };

                dataContext.Ingredients.Add(seededIngredient);
                dataContext.SaveChanges();
            }
        }

        private void SeedOrders(DataContext datacontext)
        {
            if (!datacontext.Orders.Any())
            {
                var seedOrder1 = new Orders
                {
                    Customer = 1,
                    Total = 27.45f,
                    TipAmount = 5.21f,
                    Status = 1,
                    Type = 1,
                    CustomerComments = "pls do not spit in food"
                };

                var seedOrder2 = new Orders
                {
                    Customer = 2,
                    Total = 67.45f,
                    TipAmount = 12.78f,
                    Status = 1,
                    Type = 2,
                    CustomerComments = "none"
                };

                var seedOrder3 = new Orders
                {
                    Customer = 2,
                    Total = 27.45f,
                    TipAmount = 5.21f,
                    Status = 1,
                    Type = 2,
                    CustomerComments = "extra sauce pls"
                };

                var seedOrder4 = new Orders
                {
                    Customer = 3,
                    Total = 14.69f,
                    TipAmount = 2.01f,
                    Status = 1,
                    Type = 2,
                    CustomerComments = "no mayo"
                };
                datacontext.Orders.Add(seedOrder1);
                datacontext.Orders.Add(seedOrder2);
                datacontext.Orders.Add(seedOrder3);
                datacontext.Orders.Add(seedOrder4);
                datacontext.SaveChanges();
            }
        }

        public void SeedOrderItems(DataContext dataContext)
        {
            if(!dataContext.OrderItems.Any())
            {
                var seededItems = new OrderItems
                {
                    OrderId = 1,
                    Item = 1,
                    ItemAmount = 1,
                };
                var seededItems2 = new OrderItems
                {
                    OrderId = 1,
                    Item = 1,
                    ItemAmount = 3,
                };
                var seededItems3 = new OrderItems
                {
                    OrderId = 2,
                    Item = 2,
                    ItemAmount = 5,
                };
                var seededItems4 = new OrderItems
                {
                    OrderId = 2,
                    Item = 3,
                    ItemAmount = 3,
                };
                var seededItems5 = new OrderItems
                {
                    OrderId = 2,
                    Item = 1,
                    ItemAmount = 1,
                };
                var seededItems6 = new OrderItems
                {
                    OrderId = 3,
                    Item = 1,
                    ItemAmount = 1,
                };
                var seededItems7 = new OrderItems
                {
                    OrderId = 3,
                    Item = 2,
                    ItemAmount = 1,
                };

                dataContext.OrderItems.Add(seededItems);
                dataContext.OrderItems.Add(seededItems2);
                dataContext.OrderItems.Add(seededItems3);
                dataContext.OrderItems.Add(seededItems4);
                dataContext.OrderItems.Add(seededItems5);
                dataContext.OrderItems.Add(seededItems6);
                dataContext.OrderItems.Add(seededItems7);
                dataContext.SaveChanges();
            }
        }
        public void SeedUsers(DataContext dataContext)
        {
            var numUsers = dataContext.Users.Count();

            if (numUsers == 0)
            {
                var seededUser = new User
                {
                    FirstName = "Seeded",
                    LastName = "User",
                    Username = "admin",
                    Password = "password",
                    PhoneNumber = "9859565656",
                    Address = "1212 University Avnue, Hammond, Louisiana",
                    ZipCode = 70402,
                    RewardPoints = 999,


                };
                var seededUser2 = new User
                {
                    FirstName = "Johh",
                    LastName = "Smith",
                    Username = "jsmith123",
                    Password = "password7",
                    Address = "1204 8th st",
                };
                var seededUser3 = new User
                {
                    FirstName = "Cole",
                    LastName = "Robertson",
                    Username = "crob99",
                    Password = "five5",
                };

                dataContext.Users.Add(seededUser);
                dataContext.Users.Add(seededUser2);
                dataContext.Users.Add(seededUser3);
                dataContext.SaveChanges();
            }
        }

        public void SeedMenuItems(DataContext dataContext)
        {
            if (!dataContext.MenuItems.Any())
            {
                var seededMenuItem1 = new MenuItems
                {
                    Name = "Curry Chicken",
                    Price = 5.99f,
                    Description = "chicken stewed in an onion- and tomato-based sauce, flavoured with ginger, garlic, tomato puree, chilli peppers and a variety of spices, often including turmeric, cumin, coriander, cinnamon, and cardamom.",
                };
                var seededMenuItem2 = new MenuItems
                {
                    Name = "Chicken Soup",
                    Price = 12.99f,
                    Description = " a soup made from chicken, simmered in water, usually with various other ingredients.",
                };
                var seededMenuItem3 = new MenuItems
                {
                    Name = "Chicken Biryani",
                    Price = 19.99f,
                    Description = " delicious savory rice dish that is loaded with spicy marinated chicken, caramelized onions, and flavorful saffron rice. ",
                };
                var seededMenuItem4 = new MenuItems
                {
                    Name = "Noodle Bowl",
                    Price = 8.99f,
                    Description = "Soaked rice noodles are stir-fried with zucchini, green onions, garlic, and sesame oil-spiked eggs ",
                };
                var seededMenuItem5 = new MenuItems
                {
                    Name = "Mango Lassi",
                    Price = 4.99f,
                    Description = "delicious creamy drink with mango, yogurt, milk, a little sugar, and a sprinkling of cardamom.",
                };
                var seededMenuItem6= new MenuItems
                {
                    Name = "Tandoori Chicken",
                    Price = 4.99f,
                    Description = "chicken marinated in yogurt and spices and roasted in a tandoor, a cylindrical clay oven.",
                };




                dataContext.MenuItems.Add(seededMenuItem1);
                dataContext.MenuItems.Add(seededMenuItem4);
                dataContext.MenuItems.Add(seededMenuItem3);
                dataContext.MenuItems.Add(seededMenuItem2);
                dataContext.MenuItems.Add(seededMenuItem5);
                dataContext.MenuItems.Add(seededMenuItem6);

                dataContext.SaveChanges();
            }
        }

        public void SeedRoles(DataContext dataContext)
        {
            if (!dataContext.Roles.Any())
            {
                var seededRole1 = new Roles
                {
                    RoleName = "Admin-User",
                };

                var seededRole2 = new Roles
                {
                    RoleName = "User"
                };
            }
        }
    }

}